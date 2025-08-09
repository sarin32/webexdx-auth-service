import { ObjectId } from '@i/common.interface';
import {
  GetRoleInfoParams as GetRoleInfoRepositoryParams,
  GetRoleInfoResult as GetRoleInfoRepositoryResult,
  ModuleName,
  RolePermissions,
} from '../../database/repository/role/role.repository.interface';

type GetRoleInfoParams = GetRoleInfoRepositoryParams;
type GetRoleInfoResult = GetRoleInfoRepositoryResult;

/**
 * Parameters for getting module permission information
 */
export interface GetModulePermissionInfoParams<ModuleNameT extends ModuleName> {
  /** The ID of the user to check permissions for */
  userId: ObjectId;
  /** The module to check permissions for */
  module: ModuleNameT;
}

/**
 * Result of module permission information
 */
export type GetModulePermissionInfoResult<ModuleNameT extends ModuleName> =
  RolePermissions[ModuleNameT];

/**
 * Parameters for creating a non-verified user role
 */
export interface CreateNonVerifiedUserRole {
  /** The ID of the user to create role for */
  userId: ObjectId;
}

/**
 * Parameters for disabling email verification access
 */
export interface DisableEmailVerificationAccess {
  /** The ID of the user to disable access for */
  userId: ObjectId;
}

/**
 * Interface defining the roles service contract
 */
export interface RoleServiceInterface {
  /**
   * Gets role information for a user
   */
  getRoleInfo(params: GetRoleInfoParams): Promise<GetRoleInfoResult>;

  /**
   * Gets module-specific role information for a user
   */
  getModuleRoleInfo<ModuleNameT extends ModuleName>(
    params: GetModulePermissionInfoParams<ModuleNameT>
  ): Promise<GetModulePermissionInfoResult<ModuleNameT>>;

  /**
   * Creates a role for a non-verified user
   */
  createNonVerifiedUserRole(
    params: CreateNonVerifiedUserRole
  ): Promise<ObjectId>;

  /**
   * Disables email verification access for a user
   */
  disableEmailVerificationAccess(
    params: DisableEmailVerificationAccess
  ): Promise<void>;
}
