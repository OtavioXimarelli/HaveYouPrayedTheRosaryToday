import { IsString, IsOptional, IsBoolean, IsEnum, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export type IntentionTag = 
  | 'Família'
  | 'Paz'
  | 'Saúde'
  | 'Trabalho'
  | 'Estudos'
  | 'Vocação'
  | 'Conversão'
  | 'Igreja'
  | 'Fiéis Defuntos'
  | 'Pessoal';

export class CreatePrayerRequestDto {
  @ApiProperty({ description: 'Título da intenção de oração' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ApiProperty({ description: 'Descrição detalhada da intenção' })
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @ApiPropertyOptional({
    enum: ['Família', 'Paz', 'Saúde', 'Trabalho', 'Estudos', 'Vocação', 'Conversão', 'Igreja', 'Fiéis Defuntos', 'Pessoal'],
    description: 'Categoria da intenção',
  })
  @IsOptional()
  @IsEnum(['Família', 'Paz', 'Saúde', 'Trabalho', 'Estudos', 'Vocação', 'Conversão', 'Igreja', 'Fiéis Defuntos', 'Pessoal'])
  category?: IntentionTag;
}

export class UpdatePrayerRequestDto {
  @ApiPropertyOptional({ description: 'Título da intenção de oração' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @ApiPropertyOptional({ description: 'Descrição detalhada da intenção' })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    enum: ['Família', 'Paz', 'Saúde', 'Trabalho', 'Estudos', 'Vocação', 'Conversão', 'Igreja', 'Fiéis Defuntos', 'Pessoal'],
  })
  @IsOptional()
  @IsEnum(['Família', 'Paz', 'Saúde', 'Trabalho', 'Estudos', 'Vocação', 'Conversão', 'Igreja', 'Fiéis Defuntos', 'Pessoal'])
  category?: IntentionTag;

  @ApiPropertyOptional({ description: 'Se a intenção ainda está ativa' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class MarkAnsweredDto {
  @ApiPropertyOptional({ description: 'Testemunho da graça alcançada' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  testimonial?: string;
}

export class PrayerRequestResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  userName: string;

  @ApiPropertyOptional()
  userAvatar?: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional()
  category?: IntentionTag;

  @ApiProperty()
  prayingForCount: number;

  @ApiProperty()
  isUserPraying: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isAnswered: boolean;

  @ApiPropertyOptional()
  answeredAt?: Date;

  @ApiPropertyOptional()
  testimonial?: string;

  @ApiProperty()
  createdAt: Date;
}
