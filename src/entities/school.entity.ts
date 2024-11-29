import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SchoolStatus } from 'src/constant/school.constant';

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
  schoolAdminId: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: SchoolStatus, default: SchoolStatus.PENDING })
  status: SchoolStatus;

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
