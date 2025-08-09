// applevel contstants

export const VERIFICATION_MAX_RESEND_INTERVAL = 30 * 1000; // 30 seconds
export const VERIFICATION_MAX_TRIES = 3;

export const COLLECTION_EMAIL_VERIFICATIONS = 'emailVerifications';
export const COLLECTION_USERS = 'users';
export const COLLECTION_ROLES = 'roles';
export const COLLECTION_KEYVAULT = '__keyVault';

export const DATABASE_AUTH = 'auth';
export const DATABASE_ENCRYPTION = 'encryption';

export const NAMESPACE_KEYVAULT = `${DATABASE_ENCRYPTION}.${COLLECTION_KEYVAULT}`;

export const DETERMINISTIC_ALGORITHM =
  'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic';

export const VERIFIED_USER_ROLE_ID = '65f6e9cb28f7cd633b11df56';
export const NON_VERIFIED_USER_ROLE_ID = '65f6e9cb28f7cd633b11df57';

export enum ProjectAccessLevel {
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin',
}
