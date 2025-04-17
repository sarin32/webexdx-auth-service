import { ClientEncryption, MongoClient } from 'mongodb';
import * as crypto from 'crypto';

export async function setupCSFLE(
  uri: string,
  keyVaultDatabase = 'encryption',
  keyVaultCollection = '__keyVault'
) {
  const keyVaultNamespace = `${keyVaultDatabase}.${keyVaultCollection}`;
  const masterKey = crypto.randomBytes(96);

  const keyVaultClient = new MongoClient(uri);
  await keyVaultClient.connect();
  const keyVaultDB = keyVaultClient.db(keyVaultDatabase);

  if ((await keyVaultDB.collections()).length) {
    if ((await keyVaultDB.collection(keyVaultCollection).countDocuments()) > 0)
      throw new Error(
        'keyvault database is already created!!!. terminating!!!'
      );
  }

  // creating keyvault collection and its index
  const keyVaultColl = keyVaultDB.collection(keyVaultCollection);
  await keyVaultColl.createIndex(
    { keyAltNames: 1 },
    {
      unique: true,
      partialFilterExpression: { keyAltNames: { $exists: true } },
    }
  );

  const provider = 'local';
  const kmsProviders = {
    local: {
      key: masterKey,
    },
  };

  const client = new MongoClient(uri);
  await client.connect();

  // create DEK(data encryption key)
  const encryption = new ClientEncryption(client, {
    keyVaultNamespace,
    kmsProviders,
  });
  const key = await encryption.createDataKey(provider);

  console.log('!!!!!!!  Warning! securely store these values  !!!!!!\n');
  console.log('DataKeyId [base64]: ', key.toString('base64'));
  console.log('Master Key        : ', masterKey.toString('hex'));
  console.log('=====================================================');
  // close connection
  await keyVaultClient.close();
  await client.close();
}
