import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import User from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async updateName(name, req, res) {
    try {
      const user = await this.userModel.findByIdAndUpdate(req.user._id, name, {
        new: true,
      });

      const { password, ...data } = user.toObject();
      return res.status(HttpStatus.OK).send({
        message: 'Name updated successfully',
        data: { data },
      });
    } catch (error) {
      throw error;
    }
  }

  async setUserType(body, req, res) {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        req.user._id,
        { role: body.role },
        { new: true },
      );
      const { password, ...data } = user.toObject();
      return res.status(HttpStatus.OK).send({
        message: 'User type updated successfully',
        data: { data },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(params: any, req: any, res: any) {
    if (req.user.role !== 'SUPER_ADMIN') {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: 'You are not authorized to perform this action',
        data: {},
      });
    }
    try {
      const query = params.role
        ? {
            role: {
              $in: Array.isArray(params.role) ? params.role : [params.role],
            },
          }
        : {};
      const users = await this.userModel.find(query);
      const usersWithoutPassword = users.map((user) => {
        const { password, ...data } = user.toObject();
        return data;
      });
      return res.status(HttpStatus.OK).send({
        message: 'Users retrieved successfully',
        count: usersWithoutPassword.length,
        data: usersWithoutPassword,
      });
    } catch (error) {
      throw error;
    }
  }
}
