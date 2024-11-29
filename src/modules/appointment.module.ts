import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { mongooseFeatures } from 'src/config/mongoose-features.config';
import { AppointmentController } from 'src/controllers/appointment.controller';
import { AppointmentService } from 'src/services/appointment.service';
import { SchoolModule } from './school.module';

@Module({
  imports: [mongooseFeatures, AuthModule, SchoolModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
