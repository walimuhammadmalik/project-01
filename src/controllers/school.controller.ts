import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SchoolService } from 'src/services/school.service';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get('/')
  async getAllSchools(@Query() params, @Res() res) {
    return await this.schoolService.getAllSchools(params, res);
  }

  @Post('/')
  @UseGuards(AuthGuard)
  async registerSchool(
    @Body() school,
    @Query() params,
    @Req() req,
    @Res() res,
  ) {
    return await this.schoolService.registerSchool(school, params, req, res);
  }

  @Patch('/')
  @UseGuards(AuthGuard)
  async updateSchool(@Body() school, @Req() req, @Res() res) {
    return await this.schoolService.updateSchool(school, req, res);
  }

  @Get('/personal')
  @UseGuards(AuthGuard)
  async getSchool(@Req() req, @Res() res) {
    return await this.schoolService.getSchool(req, res);
  }

  @Patch('/active')
  @UseGuards(AuthGuard)
  async setActiveSchool(@Req() req, @Res() res) {
    return await this.schoolService.setActiveSchool(req, res);
  }

  @Patch('/deactive')
  @UseGuards(AuthGuard)
  async setDeactiveSchool(@Req() req, @Res() res) {
    return await this.schoolService.setDeactiveSchool(req, res);
  }

  @Patch('/location')
  @UseGuards(AuthGuard)
  async setSchoolLocation(@Body() location, @Req() req, @Res() res) {
    return await this.schoolService.setSchoolLocation(location, req, res);
  }

  @Get('/pending')
  @UseGuards(AuthGuard)
  async pendingSchools(@Req() req, @Res() res) {
    return await this.schoolService.pendingSchools(req, res);
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
}
