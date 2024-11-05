import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import InputField from '@/components/common/InputField';
import Icon from '@/components/common/Icons/Icon';

interface PasswordConfirmFieldProps {
  register: UseFormRegister<any>; // register 타입
  password: string; // password는 string 타입
}

const PasswordConfirmField: React.FC<PasswordConfirmFieldProps> = ({ register, password }) => {
  const [showPassword, setShowPassword] = useState(false);

  // 비밀번호 보이기/숨기기 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputField
      icon={<Icon name="LockIcon" color="#A1A1A1" />}
      label="비밀번호 확인"
      placeholder="비밀번호를 다시 입력해주세요."
      type={showPassword ? 'text' : 'password'}
      register={register('confirmPassword', {
        required: '비밀번호 확인을 입력해주세요.',
        validate: (value) => value === password || '비밀번호가 일치하지 않습니다.'
      })}
      rightIcon={
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? <Icon name="EyeIcon" color="#A1A1A1" /> : <Icon name="Eye2Icon" color="#A1A1A1" />}
        </button>
      }
    />
  );
};

export default PasswordConfirmField;
