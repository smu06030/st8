import { useState } from 'react';

export const useLoginFormState = () => {
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'default' | 'active' | 'done'>('default');
  const [passwordStatus, setPasswordStatus] = useState<'default' | 'active' | 'done'>('default');

  const resetErrors = () => {
    setIsEmailError(false);
    setIsPasswordError(false);
  };

  return {
    isEmailError,
    setIsEmailError,
    isPasswordError,
    setIsPasswordError,
    emailStatus,
    setEmailStatus,
    passwordStatus,
    setPasswordStatus,
    resetErrors
  };
};

//이메일과 비밀번호 상태 및 오류관리 하는 곳
