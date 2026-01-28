import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckInsController } from './checkins.controller';
import { CheckInsService } from './checkins.service';
import { CheckIn, CheckInSchema } from './schemas/checkin.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CheckIn.name, schema: CheckInSchema }]),
    UsersModule,
  ],
  controllers: [CheckInsController],
  providers: [CheckInsService],
  exports: [CheckInsService],
})
export class CheckInsModule {}
