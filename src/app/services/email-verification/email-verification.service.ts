import {
  VERIFICATION_MAX_RESEND_INTERVAL,
  VERIFICATION_MAX_TRIES,
} from '../../config';
import { emailVerificationRepository } from '../../database';
import {
  AuthorizationError,
  ConflictError,
  ForbiddenError,
} from '../../errors';
import emailUtil from '../../utils/email-util';
import { generateRandomString } from '../../utils/string-util';
import { generateTemplate } from '../../utils/template-util';
import { userService } from '../user/user.service';
import { userAuthService } from '../user-auth/user-auth.service';
import {
  EmailVerificationServiceInterface,
  HasAccessParams,
  SendEmailForVerificationParams,
  SendEmailVerificationEmailParams,
  VerifyEmailVerificationOTPParams,
  VerifyEmailVerificationOTPResult,
} from './email-verification.service.interface';
import { rolesService } from '../roles/roles.service';

class EmailVerificationService implements EmailVerificationServiceInterface {
  private readonly repository = emailVerificationRepository;

  async hasAccessToSendEmailVerificationEmail({
    userId,
  }: HasAccessParams): Promise<boolean> {
    const respose = await rolesService.getModuleRoleInfo({
      userId,
      module: 'emailVerification',
    });
    return respose?.send || false;
  }

  async hasAccessToVerifyEmailVerificationOTP({
    userId,
  }: HasAccessParams): Promise<boolean> {
    const respose = await rolesService.getModuleRoleInfo({
      userId,
      module: 'emailVerification',
    });
    return respose?.verify || false;
  }

  public async sendEmailForVerification({
    userId,
  }: SendEmailForVerificationParams): Promise<void> {
    const user = await userService.getUserInfo({ userId });

    const existingVerification = await this.repository.getEmailVerification({
      userId: user._id,
    });

    if (existingVerification) {
      const timeSinceLastSend =
        Date.now() - existingVerification.lastSendTime.getTime();

      if (timeSinceLastSend < VERIFICATION_MAX_RESEND_INTERVAL) {
        throw new ForbiddenError(
          'Resend request is not allowed within 1 minute of the previous request'
        );
      }

      if (existingVerification.verificationTry >= VERIFICATION_MAX_TRIES) {
        throw new ForbiddenError(
          'Email verification tries have been exhausted'
        );
      }

      await this.repository.updateVerificationById({
        id: existingVerification._id,
        incrementVerificationTry: true,
      });

      await this.sendEmailVerificationEmail({
        emailId: user.email.value,
        otp: existingVerification.otp,
      });
    } else {
      const otp = generateRandomString(6, { includeNumbers: true });

      await this.repository.createEmailVerification({
        email: user.email.value,
        otp,
        userId: user._id,
      });

      await this.sendEmailVerificationEmail({
        emailId: user.email.value,
        otp,
      });
    }
  }

  async verifyEmailVerificationOTP({
    otp,
    userId,
  }: VerifyEmailVerificationOTPParams): Promise<VerifyEmailVerificationOTPResult> {
    const verification = await this.repository.getEmailVerification({
      userId,
    });

    if (!verification)
      throw new ConflictError('No verification process has been initiated');

    if (verification.otp !== otp) throw new AuthorizationError('Invalid OTP');

    await userService.markUserAsVerified({ userId });
    await rolesService.disableEmailVerificationAccess({ userId });

    return {
      userId: userId,
      token: await userAuthService.generateLoginToken({
        userId: userId,
      }),
    };
  }

  async sendEmailVerificationEmail({
    otp,
    emailId,
  }: SendEmailVerificationEmailParams): Promise<void> {
    const body = await generateTemplate('email-verification', { otp });
    await emailUtil.sendEmail({
      to: emailId,
      subject: 'OTP for your email verification',
      html: body,
      senderName: 'WEBEXDX Admin',
    });
  }
}

export const emailVerificationService = new EmailVerificationService();
