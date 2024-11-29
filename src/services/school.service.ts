import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/constant/user.constant';
import { SchoolStatus } from 'src/constant/school.constant';
import School from 'src/entities/school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel('School') private readonly schoolModel: Model<School>,
  ) {}

  async getAllSchools(params, res) {
    try {
      let { search, page, limit } = params;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      const skip = (page - 1) * limit;
      search = search || '';
      const query = {
        isDeleted: false,
        status: SchoolStatus.APPROVED,
        isActive: true,
        $or: [
          { schoolName: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } },
        ],
      };
      const schools = await this.schoolModel
        .find(query)
        .select('schoolName description contact address')
        .skip(skip)
        .limit(limit);

      return res.status(HttpStatus.OK).send({
        message: 'Schools found',
        data: {
          currentPage: page,
          totalPage: Math.ceil(schools.length / limit),
          countSchool: schools.length,
          school: schools,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async registerSchool(school, params, req, res) {
    try {
      if (req.user.role !== Role.SCHOOL_ADMIN) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Unauthorized access', data: {} });
      }
      const schoolExist = await this.schoolModel.findOne({
        userId: req.user._id,
      });
      if (schoolExist) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'School already exist', data: {} });
      }
      if (!params.permitType || !Array.isArray(params.permitType)) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Permit type is required', data: {} });
      }
      const createdSchool = await this.schoolModel.create({
        ...school,
        userId: req.user._id,
      });
      createdSchool.permitTypes = params.permitType;
      await createdSchool.save();
      return res
        .status(HttpStatus.CREATED)
        .send({ message: 'School created', data: createdSchool });
    } catch (error) {
      throw error;
    }
  }

  async updateSchool(school, req, res) {
    try {
      if (req.user.role !== Role.SCHOOL_ADMIN) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Unauthorized access', data: {} });
      }

      const schoolExist = await this.schoolModel.findOne({
        userId: req.user._id,
      });

      if (!schoolExist) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'School not found', data: {} });
      }

      const updatedschol = await this.schoolModel.findByIdAndUpdate(
        schoolExist._id,
        school,
        {
          new: true,
        },
      );

      return res
        .status(HttpStatus.OK)
        .send({ message: 'School updated', data: updatedschol });
    } catch (error) {
      throw error;
    }
  }

  async getSchool(req, res) {
    try {
      if (req.user.role !== Role.SCHOOL_ADMIN) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Unauthorized access', data: {} });
      }

      const school = await this.schoolModel.find({
        userId: req.user._id,
        isDeleted: false,
      });
      if (school.length === 0) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'School not found', data: {} });
      }
      return res
        .status(HttpStatus.OK)
        .send({ message: 'School found', data: school });
    } catch (error) {
      throw error;
    }
  }

  async setActiveSchool(req, res) {
    try {
      if (req.user.role !== Role.SCHOOL_ADMIN) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Unauthorized access', data: {} });
      }

      const schoolExist = await this.schoolModel.findOne({
        userId: req.user._id,
      });

      if (!schoolExist) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'School not found', data: {} });
      }

      const updatedschol = await this.schoolModel.findByIdAndUpdate(
        schoolExist._id,
        { isActive: true },
        {
          new: true,
        },
      );

      return res
        .status(HttpStatus.OK)
        .send({ message: 'School activated', data: updatedschol });
    } catch (error) {
      throw error;
    }
  }

  async setDeactiveSchool(req, res) {
    try {
      if (req.user.role !== Role.SCHOOL_ADMIN) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Unauthorized access', data: {} });
      }

      const schoolExist = await this.schoolModel.findOne({
        userId: req.user._id,
      });

      if (!schoolExist) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'School not found', data: {} });
      }

      const updatedschol = await this.schoolModel.findByIdAndUpdate(
        schoolExist._id,
        { isActive: false },
        {
          new: true,
        },
      );

      return res
        .status(HttpStatus.OK)
        .send({ message: 'School deactivated', data: updatedschol });
    } catch (error) {
      throw error;
    }
  }

  async pendingSchools(req, res) {
    try {
      if (req.user.role !== Role.SUPER_ADMIN) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .send({ message: 'Unauthorized access', data: {} });
      }

      const schools = await this.schoolModel.find({
        status: SchoolStatus.PENDING,
        isDeleted: false,
      });

      return res
        .status(HttpStatus.OK)
        .send({ message: 'Pending schools found', data: schools });
    } catch (error) {
      throw error;
    }
  }

  async approveSchool(id, req, res) {
    try {
      if (req.user.role !== Role.SUPER_ADMIN) {
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
        { status: SchoolStatus.APPROVED },
        { new: true },
      );

      return res
        .status(HttpStatus.OK)
        .send({ message: 'School approved', data: approvedSchool });
    } catch (error) {
      throw error;
    }
  }

  async rejectSchool(id, req, res) {
    try {
      if (req.user.role !== Role.SUPER_ADMIN) {
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
        { status: SchoolStatus.REJECTED },
        { new: true },
      );

      return res
        .status(HttpStatus.OK)
        .send({ message: 'School rejected', data: rejectedSchool });
    } catch (error) {
      throw error;
    }
  }

  async setSchoolLocation(location, req, res) {
    try {
      if (req.user.role !== Role.SCHOOL_ADMIN) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Unauthorized access', data: {} });
      }

      const schoolExist = await this.schoolModel.findOne({
        userId: req.user._id,
      });

      if (!schoolExist) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'School not found', data: {} });
      }

      const updatedSchool = await this.schoolModel.findByIdAndUpdate(
        schoolExist._id,
        { latitude: location.latitude, longitude: location.longitude },
        { new: true },
      );

      return res
        .status(HttpStatus.OK)
        .send({ message: 'School location updated', data: updatedSchool });
    } catch (error) {
      throw error;
    }
  }
}
