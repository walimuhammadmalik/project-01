import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { mongooseFeatures } from 'src/config/mongoose-features.config';
import { SchoolController } from 'src/controllers/school.controller';
import { SchoolService } from 'src/services/school.service';

@Module({
  imports: [mongooseFeatures, AuthModule],
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class SchoolModule {}
