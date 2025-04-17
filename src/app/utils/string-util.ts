export interface RandomStringOptions {
  includeNumbers?: boolean;
  includeChars?: boolean;
  includeSpecialChars?: boolean;
}

export function generateRandomString(
  length: number,
  options: RandomStringOptions
): string {
  let characters = '';

  if (options.includeNumbers) {
    characters += '0123456789';
  }

  if (options.includeChars) {
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  }

  if (options.includeSpecialChars) {
    characters += '!@#$%^&*()-=_+[]{}|;:\'",.<>?/`~';
  }

  if (characters.length === 0) {
    throw new Error('At least one character set should be included.');
  }

  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}
