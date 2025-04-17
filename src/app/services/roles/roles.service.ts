import {
  GetRoleInfoParams,
  GetRoleInfoResult,
} from '../../database/repository/role/role.repository.interface';
import {
  CreateNonVerifiedUserRole,
  DisableEmailVerificationAccess,
  GetModulePermissionInfoParams,
  GetModulePermissionInfoResult,
  RoleServiceInterface,
} from './roles.service.interface';
import { roleRepository } from '../../database';
import { RolePermissions } from '../../database/modals/roles.modal.interface';
import { ObjectId } from '@i/common.interface';

class RolesService implements RoleServiceInterface {
  repository = roleRepository;

  async getRoleInfo({ roleId }: GetRoleInfoParams): Promise<GetRoleInfoResult> {
    return await this.repository.getRoleInfo({ roleId });
  }

  async getModuleRoleInfo<ModuleNameT extends keyof RolePermissions>({
    module,
    userId,
  }: GetModulePermissionInfoParams<ModuleNameT>): Promise<
    GetModulePermissionInfoResult<ModuleNameT>
  > {
    return await this.repository.getModuleRoleInfo({ module, userId });
  }

  async createNonVerifiedUserRole({
    userId,
  }: CreateNonVerifiedUserRole): Promise<ObjectId> {
    const result = await this.repository.createRole({
      userId,
      permissions: { emailVerification: { send: true, verify: true } },
    });
    return result.id;
  }

  async disableEmailVerificationAccess({
    userId,
  }: DisableEmailVerificationAccess): Promise<void> {
    await this.repository.disableEmailVerificationAccess(userId);
  }
}

export const rolesService = new RolesService();
