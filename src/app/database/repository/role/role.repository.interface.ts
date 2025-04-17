import { ObjectId, WithId } from 'mongodb';
import {
  RolePermissions as RoleModalPermissions,
  RolesSchema,
} from '../../modals/roles.modal.interface';

export interface GetRoleInfoParams {
  roleId: ObjectId;
}

export type ModuleName = keyof RoleModalPermissions;

export interface GetModulePermissionInfoParams<ModuleNameT extends ModuleName> {
  userId: ObjectId;
  module: ModuleNameT;
}

export type RolePermissions = RoleModalPermissions;

export type GetModulePermissionInfoResult<ModuleNameT extends ModuleName> =
  RoleModalPermissions[ModuleNameT];

export type GetRoleInfoResult = WithId<RolesSchema>;

export interface RoleRepositoryInterface {
  getRoleInfo(params: GetRoleInfoParams): Promise<GetRoleInfoResult>;

  getModuleRoleInfo<ModuleNameT extends ModuleName>(
    params: GetModulePermissionInfoParams<ModuleNameT>
  ): Promise<GetModulePermissionInfoResult<ModuleNameT>>;

  disableEmailVerificationAccess(userId: ObjectId): Promise<void>;
}

export interface CreateRoleParams {
  userId: ObjectId;
  permissions: RolePermissions;
}
