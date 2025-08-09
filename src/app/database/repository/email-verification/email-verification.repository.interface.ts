import { ObjectId, WithId } from 'mongodb';
import { EmailVerificationSchema } from '../../modals/email-verification.modal.interface';

/**
 * Parameters for creating an email verification record
 */
export interface CreateEmailVerificationParams {
  /** ID of the user requesting verification */
  userId: ObjectId;
  /** OTP code for verification */
  otp: string;
  /** Email address to verify */
  email: string;
}

/**
 * Parameters for getting email verification information
 */
export interface GetEmailVerificationParams {
  /** ID of the user to get verification for */
  userId: ObjectId;
}

/**
 * Parameters for updating a verification record
 */
export interface UpdateVerificationByIdParams {
  /** ID of the verification record to update */
  id: ObjectId;
  /** Whether to increment the verification try count */
  incrementVerificationTry: boolean;
  /** Optional new OTP to set */
  otp?: string;
}

/**
 * Interface defining the email verification repository contract
 */
export interface EmailVerificationRepositoryInterface {
  /**
   * Creates a new email verification record
   */
  createEmailVerification(
    params: CreateEmailVerificationParams
  ): Promise<{ id: ObjectId }>;

  /**
   * Gets email verification information for a user
   */
  getEmailVerification(
    params: GetEmailVerificationParams
  ): Promise<WithId<EmailVerificationSchema> | null>;

  /**
   * Updates an existing verification record
   */
  updateVerificationById(params: UpdateVerificationByIdParams): Promise<void>;
}
