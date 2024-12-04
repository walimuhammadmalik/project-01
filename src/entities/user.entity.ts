import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/constant/user.constant';

@Schema({ timestamps: true })
export default class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop({
    set: (password: string) => bcrypt.hashSync(password, 10),
  })
  password: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: null })
  otp: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
