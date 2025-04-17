import { Document, ObjectId } from 'mongodb';

export interface EmailVerificationSchema extends Document {
  userId: ObjectId;
  otp: string;
  email: string;
  lastSendTime: Date;
  verificationTry: number;
}
