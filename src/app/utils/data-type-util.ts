import { ObjectId } from 'mongodb';

export function objectId(value?: string): ObjectId {
  return new ObjectId(value);
}
