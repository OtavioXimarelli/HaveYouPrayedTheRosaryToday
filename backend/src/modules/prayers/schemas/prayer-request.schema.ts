import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IntentionTag } from '../checkins/schemas/checkin.schema';

export type PrayerRequestDocument = PrayerRequest & Document;

@Schema({ timestamps: true })
export class PrayerRequest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  userName: string;

  @Prop()
  userAvatar?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String, enum: ['Família', 'Paz', 'Saúde', 'Trabalho', 'Estudos', 'Vocação', 'Conversão', 'Igreja', 'Fiéis Defuntos', 'Pessoal'] })
  category?: IntentionTag;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  prayingFor: Types.ObjectId[]; // Users who are praying for this intention

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isAnswered: boolean;

  @Prop()
  answeredAt?: Date;

  @Prop()
  testimonial?: string; // When prayer is answered, user can share testimony

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const PrayerRequestSchema = SchemaFactory.createForClass(PrayerRequest);

PrayerRequestSchema.index({ userId: 1, createdAt: -1 });
PrayerRequestSchema.index({ isActive: 1, createdAt: -1 });
PrayerRequestSchema.index({ category: 1 });
