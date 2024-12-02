import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ExamStatus, ExamType } from 'src/constant/exam.constant';

@Schema({ timestamps: true })
export default class Exam {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' })
  appointmentId: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: ExamStatus, default: ExamStatus.NOT_STARTED })
  examStatus: ExamStatus;

  @Prop({ enum: ExamType })
  examType: ExamType;

  @Prop()
  isDeleted: boolean;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
