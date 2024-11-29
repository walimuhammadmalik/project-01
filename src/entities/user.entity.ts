import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/constant/roles.constant';

@Schema({ timestamps: true })
export default class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop({
    set: (password: string) => bcrypt.hashSync(password, 10),
  })
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: null })
  otp: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
