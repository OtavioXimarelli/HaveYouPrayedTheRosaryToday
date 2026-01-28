import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PrayerRequest, PrayerRequestDocument } from './schemas/prayer-request.schema';
import { CreatePrayerRequestDto, UpdatePrayerRequestDto, MarkAnsweredDto, PrayerRequestResponseDto } from './dto/prayer-request.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PrayersService {
  constructor(
    @InjectModel(PrayerRequest.name) private prayerRequestModel: Model<PrayerRequestDocument>,
    private usersService: UsersService,
  ) {}

  async create(userId: string, createDto: CreatePrayerRequestDto): Promise<PrayerRequestDocument> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const prayerRequest = new this.prayerRequestModel({
      ...createDto,
      userId: new Types.ObjectId(userId),
      userName: user.name,
      userAvatar: user.avatar,
    });

    return prayerRequest.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 20,
    category?: string,
    currentUserId?: string,
  ): Promise<{
    prayerRequests: PrayerRequestResponseDto[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const filter: any = { isActive: true };

    if (category) {
      filter.category = category;
    }

    const [prayerRequests, total] = await Promise.all([
      this.prayerRequestModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.prayerRequestModel.countDocuments(filter),
    ]);

    const prayerRequestsWithUserPraying = prayerRequests.map((pr) => ({
      ...pr,
      _id: pr._id.toString(),
      userId: pr.userId.toString(),
      prayingForCount: pr.prayingFor?.length || 0,
      isUserPraying: currentUserId
        ? pr.prayingFor?.some((p) => p.toString() === currentUserId) || false
        : false,
      prayingFor: undefined, // Don't expose the full list
    }));

    return {
      prayerRequests: prayerRequestsWithUserPraying as PrayerRequestResponseDto[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findUserPrayerRequests(
    userId: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<{
    prayerRequests: PrayerRequestDocument[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [prayerRequests, total] = await Promise.all([
      this.prayerRequestModel
        .find({ userId: new Types.ObjectId(userId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.prayerRequestModel.countDocuments({ userId: new Types.ObjectId(userId) }),
    ]);

    return {
      prayerRequests,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<PrayerRequestDocument> {
    const prayerRequest = await this.prayerRequestModel.findById(id).exec();
    if (!prayerRequest) {
      throw new NotFoundException('Intenção de oração não encontrada');
    }
    return prayerRequest;
  }

  async update(id: string, userId: string, updateDto: UpdatePrayerRequestDto): Promise<PrayerRequestDocument> {
    const prayerRequest = await this.findById(id);

    if (prayerRequest.userId.toString() !== userId) {
      throw new ForbiddenException('Você não pode editar esta intenção');
    }

    Object.assign(prayerRequest, updateDto);
    return prayerRequest.save();
  }

  async togglePrayingFor(id: string, userId: string): Promise<{ isPraying: boolean; prayingForCount: number }> {
    const prayerRequest = await this.findById(id);
    const userObjectId = new Types.ObjectId(userId);

    const isPraying = prayerRequest.prayingFor.some((p) => p.toString() === userId);

    if (isPraying) {
      prayerRequest.prayingFor = prayerRequest.prayingFor.filter((p) => p.toString() !== userId);
    } else {
      prayerRequest.prayingFor.push(userObjectId);
    }

    await prayerRequest.save();

    return {
      isPraying: !isPraying,
      prayingForCount: prayerRequest.prayingFor.length,
    };
  }

  async markAsAnswered(id: string, userId: string, markAnsweredDto: MarkAnsweredDto): Promise<PrayerRequestDocument> {
    const prayerRequest = await this.findById(id);

    if (prayerRequest.userId.toString() !== userId) {
      throw new ForbiddenException('Você não pode marcar esta intenção como atendida');
    }

    prayerRequest.isAnswered = true;
    prayerRequest.answeredAt = new Date();
    prayerRequest.testimonial = markAnsweredDto.testimonial;

    return prayerRequest.save();
  }

  async delete(id: string, userId: string): Promise<void> {
    const prayerRequest = await this.findById(id);

    if (prayerRequest.userId.toString() !== userId) {
      throw new ForbiddenException('Você não pode excluir esta intenção');
    }

    await this.prayerRequestModel.findByIdAndDelete(id).exec();
  }

  async getTestimonials(page: number = 1, limit: number = 10): Promise<{
    testimonials: PrayerRequestDocument[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [testimonials, total] = await Promise.all([
      this.prayerRequestModel
        .find({ isAnswered: true, testimonial: { $exists: true, $ne: '' } })
        .sort({ answeredAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.prayerRequestModel.countDocuments({ isAnswered: true, testimonial: { $exists: true, $ne: '' } }),
    ]);

    return {
      testimonials,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
