import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/entities/user.entity';
export const mongooseFeatures = MongooseModule.forFeature([
  { name: 'User', schema: UserSchema },
]);
