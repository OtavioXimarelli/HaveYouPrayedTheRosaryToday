import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserContentProgressDocument = UserContentProgress & Document;

@Schema({ timestamps: true })
export class UserContentProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  // Add your fields here
}

export const UserContentProgressSchema = SchemaFactory.createForClass(UserContentProgress);
