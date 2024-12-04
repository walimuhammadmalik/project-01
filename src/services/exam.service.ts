import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Exam from 'src/entities/exam.entity';

@Injectable()
export class ExamService {
  constructor(@InjectModel('Exam') private readonly examModel: Model<Exam>) {}
}
