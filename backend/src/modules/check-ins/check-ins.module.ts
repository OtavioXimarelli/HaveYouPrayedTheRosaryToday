import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckInsController } from './check-ins.controller';
import { CheckInsService } from './check-ins.service';
import { CheckIn, CheckInSchema } from './schemas/check-in.schema';

@Module({
  imports: [
    // TODO: Register the schema with MongooseModule for dependency injection
    MongooseModule.forFeature([{ name: CheckIn.name, schema: CheckInSchema }]),
    
    // TODO: Import other modules if their services are needed here (e.g., UsersModule)
  ],
  controllers: [CheckInsController],
  providers: [CheckInsService],
  exports: [CheckInsService], // TODO: Export CheckInsService if other modules need to read check-ins
})
export class CheckInsModule {}
