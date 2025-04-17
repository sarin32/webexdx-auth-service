import * as crypto from 'crypto';

// Function to generate a secure JWT secret
export function generateJWTSecret(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Generate and log a new JWT secret
const newSecret = generateJWTSecret();
console.log('Generated JWT secret:', newSecret);
