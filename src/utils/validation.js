/**
 * Validates an email address using a comprehensive regex pattern
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if the email is valid, false otherwise
 */
export const isValidEmail = (email) => {
  // RFC 5322 compliant email regex
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

/**
 * Validates a 6-digit verification code
 * @param {string} code - The verification code to validate
 * @returns {boolean} - True if the code is valid, false otherwise
 */
export const isValidVerificationCode = (code) => {
  // Must be exactly 6 digits
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(code);
};
