import { ObjectId } from '@i/common.interface';

export interface SignupParams {
  email: string;
  password: string;
  name: string;
}

export interface SignupResult {
  userId: ObjectId;
  token: string;
}

export interface SigninResult {
  token: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface GenerateLoginTokenParams {
  userId: ObjectId;
}

export interface UserAuthServiceInterface {
  signup(params: SignupParams): Promise<SignupResult>;
  signIn(params: SignInParams): Promise<SigninResult>;
  generateLoginToken(params: GenerateLoginTokenParams): Promise<string>;
}
