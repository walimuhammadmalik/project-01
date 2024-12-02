import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema } from 'src/entities/appointment.entity';
import { EnrollmentSchema } from 'src/entities/enrollment.entity';
import { ExamSchema } from 'src/entities/exam.entity';
import { SchoolSchema } from 'src/entities/school.entity';
import { UserSchema } from 'src/entities/user.entity';
export const mongooseFeatures = MongooseModule.forFeature([
  { name: 'User', schema: UserSchema },
  { name: 'School', schema: SchoolSchema },
  { name: 'Appointment', schema: AppointmentSchema },
  { name: 'Enrollment', schema: EnrollmentSchema },
  { name: 'Exam', schema: ExamSchema },
]);
