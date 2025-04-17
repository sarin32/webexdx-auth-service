import { ObjectId } from '@i/common.interface';

export interface SendEmailForVerificationParams {
  userId: ObjectId;
}

export interface VerifyEmailVerificationOTPResult {
  userId: ObjectId;
  token: string;
}

export interface VerifyEmailVerificationOTPParams {
  otp: string;
  userId: ObjectId;
}

export interface SendEmailVerificationEmailParams {
  otp: string;
  emailId: string;
}

export interface HasAccessParams {
  userId: ObjectId;
}

export interface EmailVerificationServiceInterface {
  hasAccessToSendEmailVerificationEmail(
    params: HasAccessParams
  ): Promise<boolean>;

  hasAccessToVerifyEmailVerificationOTP(
    params: HasAccessParams
  ): Promise<boolean>;

  sendEmailForVerification(
    params: SendEmailForVerificationParams
  ): Promise<void>;

  verifyEmailVerificationOTP(
    params: VerifyEmailVerificationOTPParams
  ): Promise<VerifyEmailVerificationOTPResult>;

  sendEmailVerificationEmail(
    params: SendEmailVerificationEmailParams
  ): Promise<void>;
}
