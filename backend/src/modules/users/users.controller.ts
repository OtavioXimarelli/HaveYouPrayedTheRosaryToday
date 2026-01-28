import { Controller, Get, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto, UserResponseDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter perfil do usuário atual' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.userId);
  }

  @Get('me/stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter estatísticas do usuário atual' })
  async getStats(@Request() req) {
    return this.usersService.getStats(req.user.userId);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar perfil do usuário atual' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.userId, updateUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter perfil de um usuário por ID' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
