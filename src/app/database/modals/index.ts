import {
  COLLECTION_EMAIL_VERIFICATIONS,
  COLLECTION_ROLES,
  COLLECTION_USERS,
} from '../../config';
import connection from '../connection';
import type { EmailVerificationSchema } from './email-verification.modal.interface';
import type { RolesSchema } from './roles.modal.interface';
import type { UserSchema } from './user.modal.interface';

export const userModal = connection.getCollection<UserSchema>(COLLECTION_USERS);

export const emailVerificationModal =
  connection.getCollection<EmailVerificationSchema>(
    COLLECTION_EMAIL_VERIFICATIONS,
  );
export const roleModal =
  connection.getCollection<RolesSchema>(COLLECTION_ROLES);
