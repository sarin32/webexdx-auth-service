import { ObjectId, WithId } from 'mongodb';
import {
  RolePermissions as RoleModalPermissions,
  RolesSchema,
} from '../../modals/roles.modal.interface';

/**
 * Parameters for getting role information
 */
export interface GetRoleInfoParams {
  /** ID of the role to get information for */
  roleId: ObjectId;
}

/**
 * Type representing all available module names
 */
export type ModuleName = keyof RoleModalPermissions;

/**
 * Parameters for getting module-specific permission information
 */
export interface GetModulePermissionInfoParams<ModuleNameT extends ModuleName> {
  /** ID of the user to check permissions for */
  userId: ObjectId;
  /** Name of the module to check permissions for */
  module: ModuleNameT;
}

/**
 * Type representing all available role permissions
 */
export type RolePermissions = RoleModalPermissions;

/**
 * Result type for module-specific permission information
 */
export type GetModulePermissionInfoResult<ModuleNameT extends ModuleName> =
  RoleModalPermissions[ModuleNameT];

/**
 * Result type for role information
 */
export type GetRoleInfoResult = WithId<RolesSchema>;

/**
 * Parameters for creating a new role
 */
export interface CreateRoleParams {
  /** ID of the user to create role for */
  userId: ObjectId;
  /** Permissions to assign to the role */
  permissions: RolePermissions;
}

/**
 * Interface defining the role repository contract
 */
export interface RoleRepositoryInterface {
  /**
   * Gets information about a specific role
   */
  getRoleInfo(params: GetRoleInfoParams): Promise<GetRoleInfoResult>;

  /**
   * Gets module-specific role information for a user
   */
  getModuleRoleInfo<ModuleNameT extends ModuleName>(
    params: GetModulePermissionInfoParams<ModuleNameT>
  ): Promise<GetModulePermissionInfoResult<ModuleNameT>>;

  /**
   * Disables email verification access for a user
   */
  disableEmailVerificationAccess(userId: ObjectId): Promise<void>;
}
