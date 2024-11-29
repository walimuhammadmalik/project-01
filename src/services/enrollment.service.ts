import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Enrollment from 'src/entities/enrollment.entity';
import School from 'src/entities/school.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel('Enrollment')
    private readonly enrollmentModel: Model<Enrollment>,
    @InjectModel('School') private readonly schoolModel: Model<School>,
  ) {}

  async createEnrollment(body, req, res) {
    try {
      const enrollment = await this.enrollmentModel.create({
        userId: req.user._id,
        schoolId: body.schoolId,
      });

      return res.status(HttpStatus.CREATED).send({
        message: 'Enrollment created successfully',
        data: enrollment,
      });
    } catch (error) {
      throw error;
    }
  }
}
