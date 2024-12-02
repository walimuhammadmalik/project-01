import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { mongooseFeatures } from 'src/config/mongoose-features.config';
import { ExamController } from 'src/controllers/exam.controller';
import { ExamService } from 'src/services/exam.service';

@Module({
  imports: [mongooseFeatures, AuthModule],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}
