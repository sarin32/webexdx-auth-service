import { connection } from '../app/database';
import { roleModal } from '../app/database/modals';
import { objectId } from '../app/utils/data-type-util';

function insertRoles() {
  roleModal.insertMany([
    {
      _id: objectId('65f6e9cb28f7cd633b11df57'),
      name: 'non verified user',
      permissions: {
        emailVerification: { send: true, verify: true },
      },
    },
    {
      _id: objectId('65f6e9cb28f7cd633b11df56'),
      name: 'verified user',
      permissions: {
        environments: {
          delete: true,
          read: true,
          write: true,
        },
        projects: {
          delete: true,
          read: true,
          write: true,
        },
        variables: {
          delete: true,
          read: true,
          write: true,
        },
      },
    },
  ]);
}

(async () => {
  await connection.startConnecion();
  insertRoles();
})();
