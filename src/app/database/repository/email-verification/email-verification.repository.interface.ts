import { ObjectId, WithId } from 'mongodb';
import { EmailVerificationSchema } from '../../modals/email-verification.modal.interface';

export interface CreateEmailVerificationParams {
  userId: ObjectId;
  otp: string;
  email: string;
}

export interface GetEmailVerificationParams {
  userId: ObjectId;
}

export interface UpdateVerificationByIdParams {
  id: ObjectId;
  incrementVerificationTry: boolean;
  otp?: string;
}

export interface EmailVerificationRepositoryInterface {
  createEmailVerification(
    params: CreateEmailVerificationParams
  ): Promise<{ id: ObjectId }>;

  getEmailVerification(
    params: GetEmailVerificationParams
  ): Promise<WithId<EmailVerificationSchema> | null>;

  updateVerificationById(params: UpdateVerificationByIdParams): Promise<void>;
}
