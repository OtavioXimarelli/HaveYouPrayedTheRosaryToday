import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CheckIn extends Document {
  // TODO: Define the properties of your CheckIn schema here.
  // For example, link to the User who made the check-in:
  // @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  // userId: Types.ObjectId;
  
  // TODO: Add fields like mystery type, date, intentions array, etc.
}

export const CheckInSchema = SchemaFactory.createForClass(CheckIn);
