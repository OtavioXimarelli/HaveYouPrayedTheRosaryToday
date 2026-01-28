import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(createUserDto.password, saltRounds);

    const createdUser = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash,
    });

    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find({ isActive: true }).select('-passwordHash').exec();
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).select('-passwordHash').exec();
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email, isActive: true }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-passwordHash')
      .exec();
    
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async updateStreak(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (user.lastCheckIn) {
      const lastCheckInDate = new Date(user.lastCheckIn);
      const lastCheckInDay = new Date(
        lastCheckInDate.getFullYear(),
        lastCheckInDate.getMonth(),
        lastCheckInDate.getDate(),
      );

      const diffDays = Math.floor(
        (today.getTime() - lastCheckInDay.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 0) {
        // Already checked in today, don't update streak
        return user;
      } else if (diffDays === 1) {
        // Consecutive day
        user.currentStreak += 1;
      } else {
        // Streak broken
        user.currentStreak = 1;
      }
    } else {
      // First check-in
      user.currentStreak = 1;
    }

    // Update longest streak if needed
    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }

    user.totalCheckIns += 1;
    user.lastCheckIn = now;

    return user.save();
  }

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async getStats(userId: string) {
    const user = await this.findById(userId);
    return {
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalCheckIns: user.totalCheckIns,
      lastCheckIn: user.lastCheckIn,
      favoriteMysteries: user.favoriteMysteries,
    };
  }

  async updateStats(userId: string, mystery: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Update streak
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (user.lastCheckIn) {
      const lastCheckInDate = new Date(user.lastCheckIn);
      const lastCheckInDay = new Date(
        lastCheckInDate.getFullYear(),
        lastCheckInDate.getMonth(),
        lastCheckInDate.getDate(),
      );

      const diffDays = Math.floor(
        (today.getTime() - lastCheckInDay.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 0) {
        // Already checked in today, just update favorite mysteries
      } else if (diffDays === 1) {
        // Consecutive day
        user.currentStreak += 1;
        user.totalCheckIns += 1;
      } else {
        // Streak broken
        user.currentStreak = 1;
        user.totalCheckIns += 1;
      }
    } else {
      // First check-in
      user.currentStreak = 1;
      user.totalCheckIns += 1;
    }

    // Update longest streak if needed
    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }

    user.lastCheckIn = now;

    // Update favorite mysteries count
    const mysteryIndex = user.favoriteMysteries.findIndex(
      (m) => m.mystery === mystery,
    );

    if (mysteryIndex >= 0) {
      user.favoriteMysteries[mysteryIndex].count += 1;
    } else {
      user.favoriteMysteries.push({ mystery, count: 1 });
    }

    return user.save();
  }
}
