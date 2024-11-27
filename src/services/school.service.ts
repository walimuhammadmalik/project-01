import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import School from 'src/entities/school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel('School') private readonly schoolModel: Model<School>,
  ) {}

  async registerSchool(school, req, res) {
    if (req.user.role !== 'ADMIN') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Unauthorized access', data: {} });
    }
    const createdSchool = await this.schoolModel.create(school, {
      admidId: req.user._id,
    });
    return res
      .status(HttpStatus.CREATED)
      .send({ message: 'School created', data: createdSchool });
  }

  async updateSchool(id, school, req, res) {
    if (req.user.role !== 'ADMIN') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Unauthorized access', data: {} });
    }

    const schoolExist = await this.schoolModel.findOne({
      _id: id,
      adminId: req.user._id,
    });

    if (!schoolExist) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'School not found', data: {} });
    }

    const updatedschol = await this.schoolModel.findByIdAndUpdate(id, school, {
      new: true,
    });

    return res
      .status(HttpStatus.OK)
      .send({ message: 'School updated', data: updatedschol });
  }

  async getSchool(req, res) {
    const school = await this.schoolModel.find({ adminId: req.user._id });
    if (!school) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'School not found', data: {} });
    }
    return res
      .status(HttpStatus.OK)
      .send({ message: 'School found', data: school });
  }

  async setActiveSchool(id, req, res) {
    if (req.user.role !== 'ADMIN') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Unauthorized access', data: {} });
    }

    const schoolExist = await this.schoolModel.findOne({
      _id: id,
      adminId: req.user._id,
    });

    if (!schoolExist) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'School not found', data: {} });
    }

    const updatedschol = await this.schoolModel.findByIdAndUpdate(
      id,
      { isActive: true },
      {
        new: true,
      },
    );

    return res
      .status(HttpStatus.OK)
      .send({ message: 'School activated', data: updatedschol });
  }

  async setDeactiveSchool(id, req, res) {
    if (req.user.role !== 'ADMIN') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Unauthorized access', data: {} });
    }

    const schoolExist = await this.schoolModel.findOne({
      _id: id,
      adminId: req.user._id,
    });

    if (!schoolExist) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'School not found', data: {} });
    }

    const updatedschol = await this.schoolModel.findByIdAndUpdate(
      id,
      { isActive: false },
      {
        new: true,
      },
    );

    return res
      .status(HttpStatus.OK)
      .send({ message: 'School deactivated', data: updatedschol });
  }

  async approveSchool(id, req, res) {
    if (req.user.role !== 'SUPER_ADMIN') {
      return res
        .status(HttpStatus.FORBIDDEN)
        .send({ message: 'Unauthorized access', data: {} });
    }

    const schoolExist = await this.schoolModel.findById(id);
    if (!schoolExist) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'School not found', data: {} });
    }

    const approvedSchool = await this.schoolModel.findByIdAndUpdate(
      id,
      { status: 'APPROVED' },
      { new: true },
    );

    return res
      .status(HttpStatus.OK)
      .send({ message: 'School approved', data: approvedSchool });
  }

  async rejectSchool(id, req, res) {
    if (req.user.role !== 'SUPER_ADMIN') {
      return res
        .status(HttpStatus.FORBIDDEN)
        .send({ message: 'Unauthorized access', data: {} });
    }

    const schoolExist = await this.schoolModel.findById(id);
    if (!schoolExist) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'School not found', data: {} });
    }

    const rejectedSchool = await this.schoolModel.findByIdAndUpdate(
      id,
      { status: 'REJECTED' },
      { new: true },
    );

    return res
      .status(HttpStatus.OK)
      .send({ message: 'School rejected', data: rejectedSchool });
  }

  async setSchoolLocation(id, location, req, res) {
    if (req.user.role !== 'ADMIN') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Unauthorized access', data: {} });
    }

    const schoolExist = await this.schoolModel.findOne({
      _id: id,
      adminId: req.user._id,
    });

    if (!schoolExist) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'School not found', data: {} });
    }

    const updatedSchool = await this.schoolModel.findByIdAndUpdate(
      id,
      { latitude: location.latitude, longitude: location.longitude },
      { new: true },
    );

    return res
      .status(HttpStatus.OK)
      .send({ message: 'School location updated', data: updatedSchool });
  }
}
