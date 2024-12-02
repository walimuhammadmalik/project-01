import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { AppointmentService } from 'src/services/appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async getScheduledAppointments(@Req() req, @Res() res) {
    return await this.appointmentService.getScheduledAppointments(req, res);
  }

  @Post('/')
  @UseGuards(AuthGuard)
  async createAppointment(@Body() body, @Req() req, @Res() res) {
    return await this.appointmentService.createAppointment(body, req, res);
  }

  @Get('/ownself')
  @UseGuards(AuthGuard)
  async getOwnselfAppointment(@Req() req, @Res() res) {
    return await this.appointmentService.getOwnselfAppointment(req, res);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async rescheduleAppointment(
    @Body() body,
    @Param('id') id,
    @Req() req,
    @Res() res,
  ) {
    return await this.appointmentService.rescheduleAppointment(
      id,
      body,
      req,
      res,
    );
  }

  @Patch('/status/:id')
  @UseGuards(AuthGuard)
  async updateAppointmentStatus(
    @Param('id') id,
    @Body() status,
    @Req() req,
    @Res() res,
  ) {
    return await this.appointmentService.updateAppointmentStatus(
      id,
      status,
      req,
      res,
    );
  }

  @Patch('/cancel/:id')
  @UseGuards(AuthGuard)
  async cancelAppointment(@Param('id') id, @Req() req, @Res() res) {
    return await this.appointmentService.cancelAppointment(id, req, res);
  }
}
