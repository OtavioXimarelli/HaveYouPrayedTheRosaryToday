import { IsString, IsOptional, IsArray, IsBoolean, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MysteryType, IntentionTag } from '../schemas/checkin.schema';

export class CreateCheckInDto {
  @ApiProperty({
    enum: ['Mistérios Gozosos', 'Mistérios Dolorosos', 'Mistérios Gloriosos', 'Mistérios Luminosos'],
    description: 'O mistério rezado',
  })
  @IsEnum(['Mistérios Gozosos', 'Mistérios Dolorosos', 'Mistérios Gloriosos', 'Mistérios Luminosos'])
  mystery: MysteryType;

  @ApiPropertyOptional({ description: 'Reflexão pessoal sobre a oração' })
  @IsOptional()
  @IsString()
  reflection?: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'Tags de intenções',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  intentions?: IntentionTag[];

  @ApiPropertyOptional({ description: 'Se o check-in é público no feed da comunidade' })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional({ description: 'Duração da oração em minutos' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(180)
  prayerDuration?: number;
}

export class AddCommentDto {
  @ApiProperty({ description: 'Texto do comentário' })
  @IsString()
  text: string;
}

export class CheckInResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  userName: string;

  @ApiPropertyOptional()
  userAvatar?: string;

  @ApiProperty()
  mystery: MysteryType;

  @ApiPropertyOptional()
  reflection?: string;

  @ApiProperty({ type: [String] })
  intentions: IntentionTag[];

  @ApiProperty()
  amens: string[];

  @ApiProperty()
  amenCount: number;

  @ApiProperty()
  comments: CommentResponseDto[];

  @ApiProperty()
  isPublic: boolean;

  @ApiPropertyOptional()
  prayerDuration?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  hasUserAmen: boolean;
}

export class CommentResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  userName: string;

  @ApiPropertyOptional()
  userAvatar?: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  createdAt: Date;
}

export class FeedQueryDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @IsNumber()
  limit?: number = 20;
}
