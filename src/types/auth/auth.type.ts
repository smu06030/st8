export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface SignupFormInputs {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormValues {
  email: string;
}

export interface PasswordFormValues {
  password: string;
}

export interface NicknameStepProps {
  onNext: (nickname: string) => void;
}

export interface NicknameFormInputs {
  nickname: string;
}

export interface EmailStepProps {
  onNext: (email: string) => void;
}

export interface PasswordStepProps {
  onNext: (password: string) => void;
}

export interface StepMainFormProps {
  onNext: () => void;
}
