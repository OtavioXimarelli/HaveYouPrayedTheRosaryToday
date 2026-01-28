import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { PrayersService } from './prayers.service';
import { CreatePrayerRequestDto, UpdatePrayerRequestDto, MarkAnsweredDto } from './dto/prayer-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthRequest extends ExpressRequest {
  user?: { userId: string; email: string };
}

@ApiTags('Intenções de Oração')
@Controller('prayers')
export class PrayersController {
  constructor(private readonly prayersService: PrayersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar nova intenção de oração' })
  async create(@Request() req: AuthRequest, @Body() createDto: CreatePrayerRequestDto) {
    return this.prayersService.create(req.user!.userId, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar intenções de oração ativas' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, type: String })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;

    return this.prayersService.findAll(pageNum, limitNum, category);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar minhas intenções de oração' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getMyPrayerRequests(
    @Request() req: AuthRequest,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;

    return this.prayersService.findUserPrayerRequests(req.user!.userId, pageNum, limitNum);
  }

  @Get('testimonials')
  @ApiOperation({ summary: 'Listar testemunhos de graças alcançadas' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTestimonials(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;

    return this.prayersService.getTestimonials(pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter intenção de oração específica' })
  async findOne(@Param('id') id: string) {
    return this.prayersService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar intenção de oração' })
  async update(
    @Param('id') id: string,
    @Request() req: AuthRequest,
    @Body() updateDto: UpdatePrayerRequestDto,
  ) {
    return this.prayersService.update(id, req.user!.userId, updateDto);
  }

  @Post(':id/pray')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar que está rezando por esta intenção' })
  async togglePrayingFor(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.prayersService.togglePrayingFor(id, req.user!.userId);
  }

  @Post(':id/answered')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar intenção como atendida' })
  async markAsAnswered(
    @Param('id') id: string,
    @Request() req: AuthRequest,
    @Body() markAnsweredDto: MarkAnsweredDto,
  ) {
    return this.prayersService.markAsAnswered(id, req.user!.userId, markAnsweredDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir intenção de oração' })
  async delete(@Param('id') id: string, @Request() req: AuthRequest) {
    await this.prayersService.delete(id, req.user!.userId);
    return { message: 'Intenção excluída com sucesso' };
  }
}
