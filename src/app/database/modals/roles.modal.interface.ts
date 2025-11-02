import type { Document, ObjectId } from 'mongodb';

export interface EmailVerificationPermission {
  send: boolean;
  verify: boolean;
}

export interface ModulePermission {
  read: boolean;
  write: boolean;
  delete: boolean;
}
export interface RolePermissions {
  emailVerification?: EmailVerificationPermission;
}
export interface RolesSchema extends Document {
  userId: ObjectId;
  permissions: RolePermissions;
}
