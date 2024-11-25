import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from './guard/auth.guard';
import User from 'src/entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { resetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async userSignUp(@Body() userSignUp: UserSignUpDto, @Res() res) {
    try {
      const query = { email: userSignUp.email, isDeleted: false };
      const userExist = await this.userModel.findOne(query);
      if (userExist) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'User already exists',
          data: {},
        });
      }

      const passwordStrength = await this.authService.checkPasswordStrength(
        userSignUp.password,
      );
      if (!passwordStrength) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message:
            'Password should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
          data: {},
        });
      }

      const user = await this.userModel.create(userSignUp);
      const token = await this.authService.signToken(user._id);
      return res.status(HttpStatus.OK).send({
        message: 'User signed up successfully',
        data: { token: token },
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  async userLogin(@Body() userLogin: UserLoginDto, @Res() res) {
    try {
      const query = { email: userLogin.email, isDeleted: false };
      const user = await this.userModel.findOne(query);
      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'User not found',
          data: {},
        });
      }
      const isPasswordMatched = await bcrypt.compare(
        userLogin.password,
        user.password,
      );

      if (!isPasswordMatched) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'incorrect credential',
          data: {},
        });
      }
      const token = await this.authService.signToken(user._id);
      return res.status(HttpStatus.OK).send({
        message: 'User Found and Logged in successfully',
        data: { token: token },
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('/forgot')
  async forgotPassword(@Body() body, @Res() res) {
    try {
      const query = { email: body.email, isDeleted: false };
      const user = await this.userModel.findOne(query);
      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'User not found',
          data: {},
        });
      }
      const token = await this.authService.signToken(user._id);
      console.log(token);
      const otp = await this.authService.generateOTP();
      console.log(otp);
      await this.userModel.updateOne(query, { otp: otp });
      return res.status(HttpStatus.OK).send({
        message: 'User Found and OTP sent to email',
        data: {},
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('/reset')
  @UseGuards(AuthGuard)
  async resetPassword(@Body() body: resetPasswordDto, @Req() req, @Res() res) {
    try {
      const user = await this.userModel.findById(req.user._id);
      if (user.otp !== Number(body.otp)) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'Invalid OTP',
          data: { token: 'Unauthorised' },
        });
      }

      if (body.password !== body.confirmPassword) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'Password and Confirm Password should be same',
          data: {},
        });
      }
      const passwordStrength = await this.authService.checkPasswordStrength(
        body.password,
      );
      if (!passwordStrength) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message:
            'Password should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
          data: {},
        });
      }

      user.password = body.password;
      user.otp = null;
      await user.save();
      return res.status(HttpStatus.OK).send({
        message: 'Password reset successfully',
        data: {},
      });
    } catch (error) {
      throw error;
    }
  }

  @Post('update-password')
  @UseGuards(AuthGuard)
  async updatePassword(
    @Body() body: UpdatePasswordDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      const user = await this.userModel.findById(req.user._id);
      const isPasswordMatched = await bcrypt.compare(
        body.currentPassword,
        user.password,
      );

      if (!isPasswordMatched) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'Current password is incorrect',
          data: {},
        });
      }

      if (body.newPassword !== body.confirmPassword) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'New Password and Confirm Password should be same',
          data: {},
        });
      }
      const passwordStrength = await this.authService.checkPasswordStrength(
        body.newPassword,
      );
      if (!passwordStrength) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message:
            'Password should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
          data: {},
        });
      }

      user.password = body.newPassword;
      await user.save();
      return res.status(HttpStatus.OK).send({
        message: 'Password updated successfully',
        data: {},
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('/verify')
  @UseGuards(AuthGuard)
  async verifyToken(@Req() req) {
    return {
      message: 'Token verified',
      data: req.user,
    };
  }
}
