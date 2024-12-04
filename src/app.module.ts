import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseFeatures } from './config/mongoose-features.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user.module';
import { SchoolModule } from './modules/school.module';
import { AppointmentModule } from './modules/appointment.module';
import { EnrollmentModule } from './modules/enrollment.module';
import { ExamModule } from './modules/exam.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    mongooseFeatures,
    UserModule,
    AuthModule,
    SchoolModule,
    AppointmentModule,
    EnrollmentModule,
    ExamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
