import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrayersController } from './prayers.controller';
import { PrayersService } from './prayers.service';
import { PrayerRequest, PrayerRequestSchema } from './schemas/prayer-request.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PrayerRequest.name, schema: PrayerRequestSchema }]),
    UsersModule,
  ],
  controllers: [PrayersController],
  providers: [PrayersService],
  exports: [PrayersService],
})
export class PrayersModule {}
