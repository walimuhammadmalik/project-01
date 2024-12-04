import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SchoolStatus, PermitType } from 'src/constant/school.constant';

@Schema({ timestamps: true })
export default class School {
  @Prop()
  profilePicture: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  city: string;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop({ type: [String], enum: PermitType })
  permitTypes: PermitType[];

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: SchoolStatus, default: SchoolStatus.PENDING })
  schoolStatus: SchoolStatus;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
