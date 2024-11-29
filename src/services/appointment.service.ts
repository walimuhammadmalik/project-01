import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentStatus } from 'src/constant/appointment.constant';
import { Role } from 'src/constant/roles.constant';
import Appointment from 'src/entities/appointment.entity';
import School from 'src/entities/school.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment')
    private readonly appointmentModel: Model<Appointment>,
    @InjectModel('School') private readonly schoolModel: Model<School>,
  ) {}

  async getAppointments(req, res) {
    try {
      if (req.user.role === Role.USER || req.user.role === Role.PRIVATE_USER) {
        const appointments = await this.appointmentModel
          .find({
            userId: req.user._id,
            isDeleted: false,
          })
          .select('date appointmentType appointmentStatus schoolId');

        if (!appointments) {
          return res.status(HttpStatus.NOT_FOUND).send({
            message: 'No appointments found',
            data: {},
          });
        }

        return res.status(HttpStatus.OK).send({
          message: 'Appointments fetched successfully',
          date: appointments,
        });
      }
      return res.status(HttpStatus.FORBIDDEN).send({
        message: 'You are not authorized to fetch appointments',
      });
    } catch (error) {
      throw error;
    }
  }

  async createAppointment(body, req, res) {
    try {
      if (req.user.role === Role.USER || req.user.role === Role.PRIVATE_USER) {
        const appointment = await this.appointmentModel.create({
          ...body,
          userId: req.user._id,
        });
        return res.status(HttpStatus.CREATED).send({
          message: 'Appointment created successfully',
          data: appointment,
        });
      }
      return res.status(HttpStatus.FORBIDDEN).send({
        message: 'You are not authorized to create an appointment',
      });
    } catch (error) {
      throw error;
    }
  }

  async rescheduleAppointment(id, body, req, res) {
    try {
      if (req.user.role === Role.USER || req.user.role === Role.PRIVATE_USER) {
        const appointment = await this.appointmentModel.findOne({
          _id: id,
          userId: req.user._id,
        });

        if (!appointment) {
          return res.status(HttpStatus.NOT_FOUND).send({
            message: 'Appointment not found',
            data: {},
          });
        }

        const updatedAppointment =
          await this.appointmentModel.findByIdAndUpdate(id, body, {
            new: true,
          });

        return res.status(HttpStatus.OK).send({
          message: 'Appointment updated successfully',
          data: updatedAppointment,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async cancelAppointment(id, req, res) {
    try {
      if (req.user.role === Role.USER || req.user.role === Role.PRIVATE_USER) {
        const appointment = await this.appointmentModel.findOne({
          _id: id,
          userId: req.user._id,
        });

        if (!appointment) {
          return res.status(HttpStatus.NOT_FOUND).send({
            message: 'Appointment not found',
            data: {},
          });
        }

        const updatedAppointment =
          await this.appointmentModel.findByIdAndUpdate(
            id,
            { appointmentStatus: AppointmentStatus.CANCELLED },
            { new: true },
          );

        return res.status(HttpStatus.OK).send({
          message: 'Appointment cancelled successfully',
          data: updatedAppointment,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async updateAppointmentStatus(id, status, req, res) {
    try {
      if (req.user.role === Role.SCHOOL_ADMIN) {
        const schoolExists = await this.schoolModel.findOne({
          schoolAdminId: req.user._id,
        });

        if (!schoolExists) {
          return res.status(HttpStatus.NOT_FOUND).send({
            message: 'School not found',
            data: {},
          });
        }

        const appointment = await this.appointmentModel.findOne({
          _id: id,
          schoolId: schoolExists._id,
        });

        if (!appointment) {
          return res.status(HttpStatus.NOT_FOUND).send({
            message: 'Appointment not found',
            data: {},
          });
        }

        const updatedAppointment =
          await this.appointmentModel.findByIdAndUpdate(
            id,
            { appointmentStatus: status },
            { new: true },
          );

        return res.status(HttpStatus.OK).send({
          message: 'Appointment status updated successfully',
          data: updatedAppointment,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getSchoolPendingAppointments(req, res) {
    try {
      if (req.user.role === Role.SCHOOL_ADMIN) {
        const schoolExists = await this.schoolModel.findOne({
          schoolAdminId: req.user._id,
        });

        if (!schoolExists) {
          return res.status(HttpStatus.NOT_FOUND).send({
            message: 'School not found',
            data: {},
          });
        }

        const appointments = await this.appointmentModel
          .find({
            schoolId: schoolExists._id,
            appointmentStatus: AppointmentStatus.PENDING,
          })
          .select('date appointmentType appointmentStatus userId');

        if (!appointments) {
          return res.status(HttpStatus.NOT_FOUND).send({
            message: 'No pending appointments found',
            data: {},
          });
        }

        return res.status(HttpStatus.OK).send({
          message: 'Pending appointments fetched successfully',
          data: appointments,
        });
      }
    } catch (error) {
      throw error;
    }
  }

}
