import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { mongooseFeatures } from 'src/config/mongoose-features.config';
import { UserModule } from 'src/modules/user.module';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [mongooseFeatures, UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
