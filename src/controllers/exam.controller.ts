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
import { ExamService } from 'src/services/exam.service';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}
}
