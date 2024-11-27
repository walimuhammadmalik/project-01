import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Status } from 'src/constant/school.constant';

@Schema({ timestamps: true })
export default class School {
  @Prop()
  schoolName: string;

  @Prop()
  description: string;

  @Prop()
  contact: string;

  @Prop()
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  adminId: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: Status, default: Status.PENDING })
  status: Status;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
