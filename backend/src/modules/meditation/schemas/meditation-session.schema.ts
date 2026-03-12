import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MeditationSessionDocument = MeditationSession & Document;

@Schema({ timestamps: true })
export class MeditationSession {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  // Add your fields here
}

export const MeditationSessionSchema = SchemaFactory.createForClass(MeditationSession);
