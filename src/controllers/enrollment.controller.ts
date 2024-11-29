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
}
