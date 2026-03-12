import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeditationController } from './meditation.controller';
import { MeditationService } from './meditation.service';
import { MeditationSession, MeditationSessionSchema } from './schemas/meditation-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MeditationSession.name, schema: MeditationSessionSchema },
    ]),
  ],
  controllers: [MeditationController],
  providers: [MeditationService],
  exports: [MeditationService],
})
export class MeditationModule {}
