import { ObjectId } from '@i/common.interface';

/**
 * Parameters for sending email verification
 */
export interface SendEmailForVerificationParams {
  /** The ID of the user requesting email verification */
  userId: ObjectId;
}

/**
 * Result of successful email verification
 */
export interface VerifyEmailVerificationOTPResult {
  /** The ID of the verified user */
  userId: ObjectId;
  /** Authentication token generated after successful verification */
  token: string;
}

/**
 * Parameters for verifying email OTP
 */
export interface VerifyEmailVerificationOTPParams {
  /** The OTP code to verify */
  otp: string;
  /** The ID of the user being verified */
  userId: ObjectId;
}

/**
 * Parameters for sending verification email
 */
export interface SendEmailVerificationEmailParams {
  /** The OTP code to include in the email */
  otp: string;
  /** The email address to send the verification to */
  emailId: string;
}

/**
 * Parameters for checking access permissions
 */
export interface HasAccessParams {
  /** The ID of the user to check permissions for */
  userId: ObjectId;
}

/**
 * Interface defining the email verification service contract
 */
export interface EmailVerificationServiceInterface {
  /**
   * Checks if a user has permission to send email verification
   */
  hasAccessToSendEmailVerificationEmail(
    params: HasAccessParams
  ): Promise<boolean>;

  /**
   * Checks if a user has permission to verify email OTP
   */
  hasAccessToVerifyEmailVerificationOTP(
    params: HasAccessParams
  ): Promise<boolean>;

  /**
   * Initiates the email verification process for a user
   */
  sendEmailForVerification(
    params: SendEmailForVerificationParams
  ): Promise<void>;

  /**
   * Verifies the OTP code for email verification
   */
  verifyEmailVerificationOTP(
    params: VerifyEmailVerificationOTPParams
  ): Promise<VerifyEmailVerificationOTPResult>;

  /**
   * Sends the verification email with OTP
   */
  sendEmailVerificationEmail(
    params: SendEmailVerificationEmailParams
  ): Promise<void>;
}
