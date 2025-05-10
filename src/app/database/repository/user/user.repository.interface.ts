import { ObjectId, WithId } from 'mongodb';
import { UserSchema } from '../../modals/user.modal.interface';

/**
 * Parameters for creating a new user
 */
export type CreateUserParams = {
  /** User's email address */
  email: string;
  /** User's full name */
  name: string;
  /** Hashed user password */
  password: string;
  /** Salt used for password hashing */
  salt: string;
};

/**
 * Parameters for finding a user by email
 */
export type FindUserByEmailParams = {
  /** Email address to search for */
  email: string;
};

/**
 * Parameters for finding a user by ID
 */
export type FindUserByIdParams = {
  /** User's ID to search for */
  id: ObjectId;
};

/**
 * Parameters for marking a user as verified
 */
export interface MarkUserAsVerifiedParams {
  /** ID of the user to mark as verified */
  userId: ObjectId;
}

/**
 * Interface defining the user repository contract
 */
export interface UserRepositoryInterface {
  /**
   * Creates a new user in the database
   */
  createUser(params: CreateUserParams): Promise<{ id: ObjectId }>;

  /**
   * Finds a user by their email address
   */
  findUserByEmail(
    params: FindUserByEmailParams
  ): Promise<WithId<UserSchema> | null>;

  /**
   * Checks if a user exists with the given email
   */
  isUserExistsWithEmail(params: FindUserByEmailParams): Promise<boolean>;

  /**
   * Finds a user by their ID
   */
  findUserById(params: FindUserByIdParams): Promise<WithId<UserSchema> | null>;

  /**
   * Marks a user's email as verified
   */
  markUserAsVerified(params: MarkUserAsVerifiedParams): Promise<void>;
}
