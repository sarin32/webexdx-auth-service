import { ObjectId } from '@i/common.interface';
import {
  GetRoleInfoParams as GetRoleInfoRepositoryParams,
  GetRoleInfoResult as GetRoleInfoRepositoryResult,
  ModuleName,
  RolePermissions,
} from '../../database/repository/role/role.repository.interface';

type GetRoleInfoParams = GetRoleInfoRepositoryParams;
type GetRoleInfoResult = GetRoleInfoRepositoryResult;

export interface GetModulePermissionInfoParams<ModuleNameT extends ModuleName> {
  userId: ObjectId;
  module: ModuleNameT;
}

export type GetModulePermissionInfoResult<ModuleNameT extends ModuleName> =
  RolePermissions[ModuleNameT];

export interface CreateNonVerifiedUserRole {
  userId: ObjectId;
}

export interface DisableEmailVerificationAccess {
  userId: ObjectId;
}

export interface RoleServiceInterface {
  getRoleInfo(params: GetRoleInfoParams): Promise<GetRoleInfoResult>;

  getModuleRoleInfo<ModuleNameT extends ModuleName>(
    params: GetModulePermissionInfoParams<ModuleNameT>
  ): Promise<GetModulePermissionInfoResult<ModuleNameT>>;

  createNonVerifiedUserRole(
    params: CreateNonVerifiedUserRole
  ): Promise<ObjectId>;

  disableEmailVerificationAccess(
    params: DisableEmailVerificationAccess
  ): Promise<void>;
}
