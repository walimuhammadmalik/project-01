import { Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import User from 'src/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
}
