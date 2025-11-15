import type { ObjectId, WithId } from 'mongodb';
import type { EmailVerificationSchema } from '../../modals/email-verification.modal.interface';

/**
 * Parameters for creating an email verification record
 */
export type CreateEmailVerificationParams = Pick<
  EmailVerificationSchema,
  'userId' | 'otp' | 'email'
>;

/**
 * Parameters for getting email verification information
 */
export type GetEmailVerificationParams = Pick<
  EmailVerificationSchema,
  'userId'
>;

/**
 * Parameters for updating a verification record
 */
export type UpdateVerificationByIdParams = {
  id: EmailVerificationSchema["userId"];
  incrementVerificationTry: boolean;
  otp?: EmailVerificationSchema["otp"];
}

/**
 * Interface defining the email verification repository contract
 */
export interface EmailVerificationRepositoryInterface {
  /**
   * Creates a new email verification record
   */
  createEmailVerification(
    params: CreateEmailVerificationParams,
  ): Promise<{ id: ObjectId }>;

  /**
   * Gets email verification information for a user
   */
  getEmailVerification(
    params: GetEmailVerificationParams,
  ): Promise<WithId<EmailVerificationSchema> | null>;

  /**
   * Updates an existing verification record
   */
  updateVerificationById(params: UpdateVerificationByIdParams): Promise<void>;
}
