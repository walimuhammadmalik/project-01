import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import School from 'src/entities/school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel('School') private readonly schoolModel: Model<School>,
  ) {}

  async createSchool(school, req, res) {
    if (req.user.role !== 'admin') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Unauthorized access', data: {} });
    }
    const createdSchool = await this.schoolModel.create(school);
    return res
      .status(HttpStatus.CREATED)
      .send({ message: 'School created', data: createdSchool });
  }

  async updateSchool(school, req, res) {
    const updatedschol = await this.schoolModel.findOneAndUpdate(
      { adminId: req.user._id },
      school,
      { new: true },
    );
    if (!updatedschol) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'School not found', data: {} });
    }
    return res
      .status(HttpStatus.OK)
      .send({ message: 'School updated', data: updatedschol });
  }
}
