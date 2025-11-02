import type { ObjectId } from 'mongodb';
import { roleModal } from '../../modals';
import type {
  CreateRoleParams,
  GetModulePermissionInfoParams,
  GetModulePermissionInfoResult,
  GetRoleInfoParams,
  GetRoleInfoResult,
  ModuleName,
  RoleRepositoryInterface,
} from './role.repository.interface';

class RoleRepository implements RoleRepositoryInterface {
  modal = roleModal;

  async getRoleInfo({ roleId }: GetRoleInfoParams): Promise<GetRoleInfoResult> {
    const role = await this.modal.findOne({ _id: roleId });

    if (!role) throw new Error('No role found with the given id');

    return role;
  }

  async getModuleRoleInfo<ModuleNameT extends ModuleName>({
    userId,
    module,
  }: GetModulePermissionInfoParams<ModuleNameT>): Promise<
    GetModulePermissionInfoResult<ModuleNameT>
  > {
    const moduleKey = `permissions.${module}`;

    const projection: Record<string, number> = {};
    projection[moduleKey] = 1;

    const role = await this.modal.findOne({ userId }, { projection });

    if (!role) throw new Error('No role found with the given id');

    return role.permissions[module];
  }

  async createRole(createRoleParams: CreateRoleParams) {
    const result = await this.modal.insertOne(createRoleParams);

    if (!result.acknowledged) {
      throw new Error('Failed to create role');
    }

    return {
      id: result.insertedId,
    };
  }

  async disableEmailVerificationAccess(userId: ObjectId): Promise<void> {
    const response = await this.modal.updateOne(
      {
        userId,
      },
      {
        $set: {
          'permissions.emailVerification.send': false,
          'permissions.emailVerification.verify': false,
        },
      },
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error('Failed to update role data');
    }
  }
}

export const roleRepository = new RoleRepository();
