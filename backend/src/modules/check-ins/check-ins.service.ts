import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckIn } from './schemas/check-in.schema';
import { CreateCheckInDto } from './dto/create-check-in.dto';

@Injectable()
export class CheckInsService {
  constructor(
    @InjectModel(CheckIn.name) private readonly checkInModel: Model<CheckIn>,
  ) {
    // TODO: Inject other services if needed (e.g., UsersService)
  }

  async create(createCheckInDto: CreateCheckInDto): Promise<CheckIn | null> {
    // TODO: Receive the DTO, add user context if necessary, and save to MongoDB
    return null;
  }

  async findAllForUser(userId: string): Promise<CheckIn[]> {
    // TODO: Query MongoDB to find all check-ins belonging to the user
    return [];
  }

  async findTodayCheckIn(userId: string): Promise<CheckIn | null> {
    // TODO: Check if the user already prayed the rosary today
    return null;
  }
}
