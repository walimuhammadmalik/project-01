import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EnrollmentStatus } from 'src/constant/enrollment.constant';

@Schema({ timestamps: true })
export default class Enrollment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  schoolId: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: EnrollmentStatus, default: EnrollmentStatus.PENDING })
  enrollmentStatus: EnrollmentStatus;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
