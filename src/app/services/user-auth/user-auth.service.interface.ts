import { ObjectId } from '@i/common.interface';

/**
 * Parameters for user signup
 */
export interface SignupParams {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
  /** User's full name */
  name: string;
}

/**
 * Result of successful user signup
 */
export interface SignupResult {
  /** The ID of the newly created user */
  userId: ObjectId;
  /** Authentication token for the new user */
  token: string;
}

/**
 * Result of successful user signin
 */
export interface SigninResult {
  /** Authentication token for the signed in user */
  token: string;
}

/**
 * Parameters for user signin
 */
export interface SignInParams {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
}

/**
 * Parameters for generating a login token
 */
export interface GenerateLoginTokenParams {
  /** The ID of the user to generate token for */
  userId: ObjectId;
}

/**
 * Interface defining the user authentication service contract
 */
export interface UserAuthServiceInterface {
  /**
   * Creates a new user account
   */
  signup(params: SignupParams): Promise<SignupResult>;

  /**
   * Authenticates an existing user
   */
  signIn(params: SignInParams): Promise<SigninResult>;

  /**
   * Generates a new authentication token for a user
   */
  generateLoginToken(params: GenerateLoginTokenParams): Promise<string>;
}
