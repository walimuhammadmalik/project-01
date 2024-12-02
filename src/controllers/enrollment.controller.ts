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
import { EnrollmentService } from 'src/services/enrollment.service';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async createEnrollment(@Body() body, @Req() req, @Res() res) {
    return await this.enrollmentService.createEnrollment(body, req, res);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getEnrollments(@Req() req, @Res() res) {
    return await this.enrollmentService.getEnrollments(req, res);
  }

  @Get('/pending')
  @UseGuards(AuthGuard)
  async getPendingEnrollments(@Req() req, @Res() res) {
    return await this.enrollmentService.getPendingEnrollments(req, res);
  }

  @Patch('/status')
  @UseGuards(AuthGuard)
  async updateEnrollmentStatus(@Body() body, @Req() req, @Res() res) {
    return await this.enrollmentService.updateEnrollmentStatus(body, req, res);
  }
}
