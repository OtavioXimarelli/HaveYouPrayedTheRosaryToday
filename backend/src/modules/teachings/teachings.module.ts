import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachingsController } from './teachings.controller';
import { TeachingsService } from './teachings.service';
import { UserContentProgress, UserContentProgressSchema } from './schemas/user-content-progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserContentProgress.name, schema: UserContentProgressSchema },
    ]),
  ],
  controllers: [TeachingsController],
  providers: [TeachingsService],
  exports: [TeachingsService],
})
export class TeachingsModule {}
