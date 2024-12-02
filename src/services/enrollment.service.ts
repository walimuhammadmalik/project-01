import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { count } from 'console';
import { Model } from 'mongoose';
import { EnrollmentStatus } from 'src/constant/enrollment.constant';
import { Role } from 'src/constant/user.constant';
import Enrollment from 'src/entities/enrollment.entity';
import School from 'src/entities/school.entity';
import User from 'src/entities/user.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel('Enrollment')
    private readonly enrollmentModel: Model<Enrollment>,
    @InjectModel('School') private readonly schoolModel: Model<School>,
    @InjectModel('User') private readonly userModel: Model<User>,
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

  async getPendingEnrollments(req, res) {
    try {
      if (req.user.role !== Role.SCHOOL_ADMIN) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          message: 'Unauthorized access',
        });
      }
      const schoolExists = await this.schoolModel.findOne({
        userId: req.user._id,
      });
      if (!schoolExists) {
        return res.status(HttpStatus.NOT_FOUND).send({
          message: 'School not found',
        });
      }
      const enrollments = await this.enrollmentModel.find({
        schoolId: schoolExists._id,
        enrollmentStatus: EnrollmentStatus.PENDING,
      });
      return res.status(HttpStatus.OK).send({
        message: 'Pending enrollments fetched successfully',
        data: {
          count: enrollments.length,
          enrollments: enrollments,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateEnrollmentStatus(body, req, res) {
    try {
      if (req.user.role !== Role.SCHOOL_ADMIN) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          message: 'Unauthorized access',
        });
      }
      const school = await this.schoolModel.findOne({ userId: req.user._id });
      if (!school) {
        return res.status(HttpStatus.NOT_FOUND).send({
          message: 'School not found',
        });
      }
      const enrollment = await this.enrollmentModel.findOneAndUpdate(
        { userId: body.userId },
        { enrollmentStatus: body.enrollmentStatus },
        { new: true },
      );
      if (!enrollment) {
        return res.status(HttpStatus.NOT_FOUND).send({
          message: 'Enrollment not found',
        });
      }
      return res.status(HttpStatus.OK).send({
        message: 'Enrollment status updated successfully',
        data: { enrollment },
      });
    } catch (error) {
      throw error;
    }
  }

  async getEnrollments(req, res) {
    try {
      if (req.user.role !== Role.SCHOOL_ADMIN) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          message: 'Unauthorized access',
        });
      }
      const school = await this.schoolModel.findOne({ userId: req.user._id });
      if (!school) {
        return res.status(HttpStatus.NOT_FOUND).send({
          message: 'School not found',
        });
      }
      const enrollments = await this.enrollmentModel
        .find({
          schoolId: school._id,
        })
        .select('userId enrollmentStatus -_id');
      return res.status(HttpStatus.OK).send({
        message: 'Enrollments fetched successfully',
        data: { count: enrollments.length, enrollments: enrollments },
      });
    } catch (error) {
      throw error;
    }
  }
}
