import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import User from 'src/entities/user.entity';
import { promisify } from 'util';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  signToken(id: any) {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  async verifyToken(token: string) {
    try {
      const decoded = await promisify(jwt.verify.bind(jwt))(
        token,
        process.env.JWT_SECRET_KEY,
      );

      const user = await this.userModel.findById(decoded.id);
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } catch (error) {
      return null;
    }
  }

  async generateOTP() {
    return crypto.randomInt(10000, 99999);
  }

  checkPasswordStrength(password: string) {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
}
