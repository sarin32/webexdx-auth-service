import { Document } from 'mongodb';

export interface UserSchema extends Document {
  name: string;
  email: {
    value: string;
    isVerified: boolean;
  };
  password: string;
  salt: string;
  createdAt: Date;
}
