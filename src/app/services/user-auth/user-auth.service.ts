import {
  GenerateLoginTokenParams,
  SignInParams,
  SignupParams,
  SignupResult,
  UserAuthServiceInterface,
} from './user-auth.service.interface';
import { LOGIN_TOKEN_LIFETIME } from '../../config/config';
import { userRepository } from '../../database';
import { AuthorizationError, ConflictError } from '@webexdx/koa-wrap/errors';
import {
  generatePassword,
  generateSalt,
  validatePassword,
} from '../../utils/password-util';
import { generateSignature } from '../../utils/token-util';
import { rolesService } from '../roles/roles.service';

class UserAuthService implements UserAuthServiceInterface {
  private readonly repository = userRepository;
  private rolesService = rolesService;

  async signup({ email, name, password }: SignupParams): Promise<SignupResult> {
    const isUserExists = await this.repository.isUserExistsWithEmail({ email });
    if (isUserExists)
      throw new ConflictError('An account with this email id already exists');

    const salt = await generateSalt();
    password = await generatePassword(password, salt);

    const { id } = await this.repository.createUser({
      email,
      name,
      password,
      salt,
    });

    await this.rolesService.createNonVerifiedUserRole({ userId: id });

    return {
      userId: id,
      token: await this.generateLoginToken({
        userId: id,
      }),
    };
  }

  async signIn({ email, password }: SignInParams) {
    const user = await this.repository.findUserByEmail({ email });
    if (!user) throw new AuthorizationError('Invalid Credenials');

    const isValidPassword = await validatePassword(
      password,
      user.password,
      user.salt
    );
    if (!isValidPassword) throw new AuthorizationError('Invalid Credenials');

    return {
      userId: user._id,
      token: await this.generateLoginToken({
        userId: user._id,
      }),
    };
  }

  async generateLoginToken({
    userId,
  }: GenerateLoginTokenParams): Promise<string> {
    const payload = {
      userId,
    };
    const token = await generateSignature(payload, LOGIN_TOKEN_LIFETIME);
    return `Bearer ${token}`;
  }
}

export const userAuthService = new UserAuthService();
