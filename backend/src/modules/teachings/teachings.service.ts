import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserContentProgress, UserContentProgressDocument } from './schemas/user-content-progress.schema';

@Injectable()
export class TeachingsService {
  constructor(
    @InjectModel(UserContentProgress.name) 
    private progressModel: Model<UserContentProgressDocument>,
  ) {}

  // Implement your progress tracking logic here
}
