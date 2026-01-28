import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Email do usuário', example: 'maria@exemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'Maria Santos' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: 'Email do usuário', example: 'maria@exemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'Token de acesso JWT' })
  accessToken: string;

  @ApiProperty({ description: 'Dados do usuário' })
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    currentStreak: number;
    longestStreak: number;
    totalCheckIns: number;
  };
}
