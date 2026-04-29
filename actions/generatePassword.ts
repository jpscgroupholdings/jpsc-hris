/**
 * Generates a cryptographically strong random string.
 * @param length The length of the string (default 8)
 * @returns A random alphanumeric string
 */
export const generatePassword = (length: number): string => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#_";
  let password = "";

  // Use Web Crypto API for better security
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }

  return password;
};

// Usage
const newPassword = generatePassword(8);
