import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

export class FavoriteMystery {
  @Prop({ required: true })
  mystery: string;

  @Prop({ default: 1 })
  count: number;
}

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ description: 'ID único do usuário' })
  _id: Types.ObjectId;

  @ApiProperty({ description: 'Nome do usuário' })
  @Prop({ required: true, trim: true })
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @ApiProperty({ description: 'URL do avatar', required: false })
  @Prop()
  avatar?: string;

  @ApiProperty({ description: 'Biografia do usuário', required: false })
  @Prop({ maxlength: 300 })
  bio?: string;

  @ApiProperty({ description: 'Sequência atual de dias rezando' })
  @Prop({ default: 0 })
  currentStreak: number;

  @ApiProperty({ description: 'Maior sequência alcançada' })
  @Prop({ default: 0 })
  longestStreak: number;

  @ApiProperty({ description: 'Total de check-ins' })
  @Prop({ default: 0 })
  totalCheckIns: number;

  @ApiProperty({ description: 'Último check-in', required: false })
  @Prop()
  lastCheckIn?: Date;

  @ApiProperty({ description: 'Mistérios favoritos com contagem' })
  @Prop({ type: [{ mystery: String, count: Number }], default: [] })
  favoriteMysteries: FavoriteMystery[];

  @ApiProperty({ description: 'Conta ativa' })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Index for faster queries
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });

// Virtual for id
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret.passwordHash;
    return ret;
  },
});
