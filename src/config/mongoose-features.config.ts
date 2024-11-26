import { MongooseModule } from '@nestjs/mongoose';
import { SchoolSchema } from 'src/entities/school.entity';
import { UserSchema } from 'src/entities/user.entity';
export const mongooseFeatures = MongooseModule.forFeature([
  { name: 'User', schema: UserSchema },
  { name: 'School', schema: SchoolSchema },
]);
