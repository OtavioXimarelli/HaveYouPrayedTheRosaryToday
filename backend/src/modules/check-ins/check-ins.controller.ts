import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { CheckInsService } from './check-ins.service';
import { CreateCheckInDto } from './dto/create-check-in.dto';

@Controller('check-ins')
// TODO: Apply authentication guards (e.g., @UseGuards(JwtAuthGuard)) to protect these routes
export class CheckInsController {
  constructor(private readonly checkInsService: CheckInsService) {}

  @Post()
  async create(@Body() createCheckInDto: CreateCheckInDto) {
    // TODO: Extract the user ID from the request (e.g., using a custom @CurrentUser decorator)
    // TODO: Pass the DTO and the user ID to the service
    return this.checkInsService.create(createCheckInDto);
  }

  @Get('/my-history')
  async getMyCheckIns() {
    // TODO: Extract the logged-in user id
    // TODO: Call the service to return history
    return this.checkInsService.findAllForUser('temporary-user-id');
  }
  
  @Get('/today')
  async checkToday() {
    // TODO: Extract user info
    // TODO: Return today's checkin status
    return this.checkInsService.findTodayCheckIn('temporary-user-id');
  }
}
