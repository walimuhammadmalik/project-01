import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UpdateNameDto } from 'src/dtos/update-name.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('/update-name')
  @UseGuards(AuthGuard)
  async updateName(@Body() name: UpdateNameDto, @Req() req, @Res() res) {
    return await this.userService.updateName(name, req, res);
  }

  @Patch('/type')
  @UseGuards(AuthGuard)
  async setUserType(@Body() body, @Req() req, @Res() res) {
    return await this.userService.setUserType(body, req, res);
  }

  @Get('/all')
  @UseGuards(AuthGuard)
  async getAllUsers(@Query() params, @Req() req, @Res() res) {
    return await this.userService.getAllUsers(params, req, res);
  }
}
