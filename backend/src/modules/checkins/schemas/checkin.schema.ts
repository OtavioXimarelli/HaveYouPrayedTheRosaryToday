import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CheckInDocument = CheckIn & Document;

export type MysteryType = 'Mistérios Gozosos' | 'Mistérios Dolorosos' | 'Mistérios Gloriosos' | 'Mistérios Luminosos';

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

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  userName: string;

  @Prop()
  userAvatar?: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
export class CheckIn {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  userName: string;

  @Prop()
  userAvatar?: string;

  @Prop({ 
    type: String, 
    enum: ['Mistérios Gozosos', 'Mistérios Dolorosos', 'Mistérios Gloriosos', 'Mistérios Luminosos'],
    required: true 
  })
  mystery: MysteryType;

  @Prop()
  reflection?: string;

  @Prop({ type: [String] })
  intentions: IntentionTag[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  amens: Types.ObjectId[];

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];

  @Prop({ default: false })
  isPublic: boolean;

  @Prop()
  prayerDuration?: number; // in minutes

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const CheckInSchema = SchemaFactory.createForClass(CheckIn);

// Index for efficient querying
CheckInSchema.index({ userId: 1, createdAt: -1 });
CheckInSchema.index({ isPublic: 1, createdAt: -1 });
CheckInSchema.index({ createdAt: -1 });
