import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MeditationService } from './meditation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('meditation')
@UseGuards(JwtAuthGuard)
export class MeditationController {
  constructor(private readonly meditationService: MeditationService) {}

  // Define meditation endpoints here
}
