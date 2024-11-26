import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SchoolService } from 'src/services/school.service';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post('')
  @UseGuards(AuthGuard)
  async createSchool(@Body() school, @Req() req, @Res() res) {
    return await this.schoolService.createSchool(school, req, res);
  }

  @Patch('')
  @UseGuards(AuthGuard)
  async updateSchool(@Body() school, @Req() req, @Res() res) {
    return await this.schoolService.updateSchool(school, req, res);
  }
}
