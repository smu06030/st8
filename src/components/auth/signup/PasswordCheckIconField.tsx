import React, { useState } from 'react';
import Icon from '@/components/common/Icons/Icon';
import InputField from '@/components/common/InputField';
import { useConfirmPassword } from '@/hooks/useConfirmPassword';

interface PasswordConfirmFieldProps {
  password: string;
}

const PasswordConfirmField = ({ password }: PasswordConfirmFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // useConfirmPassword 훅을 사용
  const { confirmPassword, status, error, handleConfirmPasswordChange, handleConfirmPasswordBlur } =
    useConfirmPassword(password);

  // 비밀번호 보이기/숨기기 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <InputField
        iconName="LockIcon"
        text="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요."
        type={showPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        onBlur={handleConfirmPasswordBlur}
        status={status}
        rightIcon={
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <Icon name="EyeIcon" color="#A1A1A1" /> : <Icon name="Eye2Icon" color="#A1A1A1" />}
          </button>
        }
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordConfirmField;

//입력한 비밀번호 두가지가 일치하는지 확인하는 곳
