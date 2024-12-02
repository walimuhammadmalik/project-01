import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  AppointmentStatus,
  AppointmentType,
} from 'src/constant/appointment.constant';

@Schema({ timestamps: true })
export default class Appointment {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  dateTime: Date;

  @Prop({ enum: AppointmentType, default: AppointmentType.LESSON })
  appointmentType: AppointmentType;

  @Prop({ enum: AppointmentStatus, default: AppointmentStatus.PENDING })
  appointmentStatus: AppointmentStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  schoolId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
