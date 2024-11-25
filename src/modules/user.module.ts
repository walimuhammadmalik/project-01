import { Module } from '@nestjs/common';
import { mongooseFeatures } from 'src/config/mongoose-features.config';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [mongooseFeatures],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
