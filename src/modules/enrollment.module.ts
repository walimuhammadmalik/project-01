import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { mongooseFeatures } from 'src/config/mongoose-features.config';
import { SchoolModule } from './school.module';
import { EnrollmentController } from 'src/controllers/Enrollment.controller';
import { EnrollmentService } from 'src/services/enrollment.service';

@Module({
  imports: [mongooseFeatures, AuthModule, SchoolModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
