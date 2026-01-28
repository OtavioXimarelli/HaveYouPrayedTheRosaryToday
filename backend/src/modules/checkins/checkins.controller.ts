import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { CheckInsService } from './checkins.service';
import { CreateCheckInDto, AddCommentDto } from './dto/checkin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthRequest extends ExpressRequest {
  user?: { userId: string; email: string };
}

@ApiTags('Check-ins')
@Controller('checkins')
export class CheckInsController {
  constructor(private readonly checkInsService: CheckInsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo check-in de oração' })
  async create(@Request() req: AuthRequest, @Body() createCheckInDto: CreateCheckInDto) {
    return this.checkInsService.create(req.user!.userId, createCheckInDto);
  }

  @Get('feed')
  @ApiOperation({ summary: 'Obter feed público de check-ins' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getFeed(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;
    
    return this.checkInsService.findPublicFeed(pageNum, limitNum);
  }

  @Get('today')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verificar se usuário já fez check-in hoje' })
  async getTodayCheckIn(@Request() req: AuthRequest) {
    const checkIn = await this.checkInsService.getTodayCheckIn(req.user!.userId);
    return {
      hasCheckedIn: !!checkIn,
      checkIn,
    };
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter meus check-ins' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getMyCheckIns(
    @Request() req: AuthRequest,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;
    
    return this.checkInsService.findUserCheckIns(req.user!.userId, pageNum, limitNum);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter estatísticas de check-ins do usuário' })
  async getStats(@Request() req: AuthRequest) {
    return this.checkInsService.getCheckInStats(req.user!.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter check-in específico' })
  async findOne(@Param('id') id: string) {
    return this.checkInsService.findById(id);
  }

  @Post(':id/amen')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dar/remover Amém em um check-in' })
  async toggleAmen(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.checkInsService.toggleAmen(id, req.user!.userId);
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adicionar comentário em um check-in' })
  async addComment(
    @Param('id') id: string,
    @Request() req: AuthRequest,
    @Body() addCommentDto: AddCommentDto,
  ) {
    return this.checkInsService.addComment(id, req.user!.userId, addCommentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir um check-in' })
  async delete(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.checkInsService.delete(id, req.user!.userId);
    return { message: 'Check-in excluído com sucesso' };
  }
}
