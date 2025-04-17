import * as bcrypt from 'bcrypt';

export async function generateSalt() {
  return await bcrypt.genSalt();
}

export async function generatePassword(password: string, salt: string) {
  return await bcrypt.hash(password, salt);
}

export async function validatePassword(
  enteredPassword: string,
  savedPassword: string,
  salt: string
): Promise<boolean> {
  const hashedEnteredPassword = await generatePassword(enteredPassword, salt);
  return hashedEnteredPassword === savedPassword;
}
