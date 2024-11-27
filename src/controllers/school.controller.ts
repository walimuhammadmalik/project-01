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
import { SchoolService } from 'src/services/school.service';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post('')
  @UseGuards(AuthGuard)
  async registerSchool(@Body() school, @Req() req, @Res() res) {
    return await this.schoolService.registerSchool(school, req, res);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async updateSchool(@Body() school, @Param('id') id, @Req() req, @Res() res) {
    return await this.schoolService.updateSchool(id, school, req, res);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getSchool(@Req() req, @Res() res) {
    return await this.schoolService.getSchool(req, res);
  }

  @Patch('/active/:id')
  @UseGuards(AuthGuard)
  async setActiveSchool(@Param('id') id, @Req() req, @Res() res) {
    return await this.schoolService.setActiveSchool(id, req, res);
  }

  @Patch('/deactive/:id')
  @UseGuards(AuthGuard)
  async setDeactiveSchool(@Param('id') id, @Req() req, @Res() res) {
    return await this.schoolService.setDeactiveSchool(id, req, res);
  }

  @Patch('/approve/:id')
  @UseGuards(AuthGuard)
  async approveSchool(@Param('id') id, @Req() req, @Res() res) {
    return await this.schoolService.approveSchool(id, req, res);
  }

  @Patch('/reject/:id')
  @UseGuards(AuthGuard)
  async rejectSchool(@Param('id') id, @Req() req, @Res() res) {
    return await this.schoolService.rejectSchool(id, req, res);
  }

  @Patch('/location/:id')
  @UseGuards(AuthGuard)
  async setSchoolLocation(@Param('id') id, @Body() location, @Req() req, @Res() res) {
    return await this.schoolService.setSchoolLocation(id, location, req, res);
  }
}
