export const validatePassword = (password: string, confirmPassword: string) => {
  return {
    hasMinLength: password.length >= 8,
    hasMaxLength: password.length <= 16,
    hasNumber: /\d/.test(password),
    hasLetter: /[A-Za-z]/.test(password),
    isMatching: password === confirmPassword
  };
};

export const passwordValidationRules = (validations: any) => [
  { label: '숫자 포함', isValid: validations.hasNumber },
  { label: '영문 포함', isValid: validations.hasLetter },
  {
    label: '8자리 이상 16자리 이하',
    isValid: validations.hasMinLength && validations.hasMaxLength
  }
];
