import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { TeachingsService } from './teachings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('teachings')
@UseGuards(JwtAuthGuard)
export class TeachingsController {
  constructor(private readonly teachingsService: TeachingsService) {}

  // Define your endpoints here
}
