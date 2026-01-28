import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CheckIn, CheckInDocument } from './schemas/checkin.schema';
import { CreateCheckInDto, AddCommentDto, CheckInResponseDto } from './dto/checkin.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CheckInsService {
  constructor(
    @InjectModel(CheckIn.name) private checkInModel: Model<CheckInDocument>,
    private usersService: UsersService,
  ) {}

  async create(userId: string, createCheckInDto: CreateCheckInDto): Promise<CheckInDocument> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const checkIn = new this.checkInModel({
      ...createCheckInDto,
      userId: new Types.ObjectId(userId),
      userName: user.name,
      userAvatar: user.avatar,
      intentions: createCheckInDto.intentions || [],
      isPublic: createCheckInDto.isPublic ?? true,
    });

    const savedCheckIn = await checkIn.save();

    // Update user stats
    await this.usersService.updateStats(userId, createCheckInDto.mystery);

    return savedCheckIn;
  }

  async findPublicFeed(page: number = 1, limit: number = 20, currentUserId?: string): Promise<{
    checkIns: CheckInResponseDto[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [checkIns, total] = await Promise.all([
      this.checkInModel
        .find({ isPublic: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.checkInModel.countDocuments({ isPublic: true }),
    ]);

    const checkInsWithUserAmen = checkIns.map((checkIn) => ({
      ...checkIn,
      _id: checkIn._id.toString(),
      userId: checkIn.userId.toString(),
      amenCount: checkIn.amens?.length || 0,
      amens: checkIn.amens?.map((a) => a.toString()) || [],
      hasUserAmen: currentUserId 
        ? checkIn.amens?.some((a) => a.toString() === currentUserId) || false
        : false,
      comments: checkIn.comments?.map((c) => ({
        ...c,
        userId: c.userId.toString(),
      })) || [],
    }));

    return {
      checkIns: checkInsWithUserAmen as CheckInResponseDto[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findUserCheckIns(userId: string, page: number = 1, limit: number = 20): Promise<{
    checkIns: CheckInDocument[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [checkIns, total] = await Promise.all([
      this.checkInModel
        .find({ userId: new Types.ObjectId(userId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.checkInModel.countDocuments({ userId: new Types.ObjectId(userId) }),
    ]);

    return {
      checkIns,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<CheckInDocument> {
    const checkIn = await this.checkInModel.findById(id).exec();
    if (!checkIn) {
      throw new NotFoundException('Check-in não encontrado');
    }
    return checkIn;
  }

  async toggleAmen(checkInId: string, userId: string): Promise<{ hasAmen: boolean; amenCount: number }> {
    const checkIn = await this.findById(checkInId);
    const userObjectId = new Types.ObjectId(userId);
    
    const hasAmen = checkIn.amens.some((a) => a.toString() === userId);

    if (hasAmen) {
      // Remove amen
      checkIn.amens = checkIn.amens.filter((a) => a.toString() !== userId);
    } else {
      // Add amen
      checkIn.amens.push(userObjectId);
    }

    await checkIn.save();

    return {
      hasAmen: !hasAmen,
      amenCount: checkIn.amens.length,
    };
  }

  async addComment(checkInId: string, userId: string, addCommentDto: AddCommentDto): Promise<CheckInDocument> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const checkIn = await this.findById(checkInId);

    checkIn.comments.push({
      userId: new Types.ObjectId(userId),
      userName: user.name,
      userAvatar: user.avatar,
      text: addCommentDto.text,
      createdAt: new Date(),
    });

    return checkIn.save();
  }

  async delete(checkInId: string, userId: string): Promise<void> {
    const checkIn = await this.findById(checkInId);

    if (checkIn.userId.toString() !== userId) {
      throw new ForbiddenException('Você não pode excluir este check-in');
    }

    await this.checkInModel.findByIdAndDelete(checkInId).exec();
  }

  async getTodayCheckIn(userId: string): Promise<CheckInDocument | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.checkInModel
      .findOne({
        userId: new Types.ObjectId(userId),
        createdAt: { $gte: today, $lt: tomorrow },
      })
      .exec();
  }

  async getCheckInStats(userId: string): Promise<{
    totalCheckIns: number;
    thisMonthCheckIns: number;
    mysteryDistribution: Record<string, number>;
  }> {
    const userObjectId = new Types.ObjectId(userId);

    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const [totalCheckIns, thisMonthCheckIns, mysteryAggregation] = await Promise.all([
      this.checkInModel.countDocuments({ userId: userObjectId }),
      this.checkInModel.countDocuments({
        userId: userObjectId,
        createdAt: { $gte: firstDayOfMonth },
      }),
      this.checkInModel.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: '$mystery', count: { $sum: 1 } } },
      ]),
    ]);

    const mysteryDistribution: Record<string, number> = {};
    mysteryAggregation.forEach((item) => {
      mysteryDistribution[item._id] = item.count;
    });

    return {
      totalCheckIns,
      thisMonthCheckIns,
      mysteryDistribution,
    };
  }
}
