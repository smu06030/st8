import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Buttons/Button';
import Icon from '@/components/common/Icons/Icon';
import PasswordCheck from './PasswordCheck';

interface PasswordStepProps {
  onNext: (password: string) => void;
}

interface PasswordFormInputs {
  password: string;
  confirmPassword: string;
}

const PasswordStep: React.FC<PasswordStepProps> = ({ onNext }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordFormInputs>();

  useEffect(() => {
    if (errors.password) {
      console.log('Password Error:', errors.password.message);
    }
  }, [errors.password]);

  // 입력 필드 값 감지
  const password = watch('password') || '';
  const confirmPassword = watch('confirmPassword') || '';

  // 비밀번호와 확인 비밀번호가 일치할 때만 버튼 활성화
  const isFormFilled = password && confirmPassword && password === confirmPassword;
  const isMatching = password && confirmPassword && password === confirmPassword && confirmPassword.length > 0;

  const handleNext = (data: PasswordFormInputs) => {
    if (isFormFilled) {
      onNext(data.password);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  // 비밀번호 표시 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  // const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex min-h-screen flex-col items-center space-y-6 px-6 py-8">
      <span className="text-secondary-700 mb-6 w-full max-w-[327px] text-left font-bold text-[32px]">
        모아에게 <br /> 비밀번호를 알려주세요.
      </span>

      <InputField
        icon={<Icon name="LockIcon" />}
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type={showPassword ? 'text' : 'password'}
        register={register('password', {
          required: '비밀번호를 입력해주세요.',
          minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다.'
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: '영문과 숫자를 포함해야 합니다.'
          }
        })}
        rightIcon={
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <Icon name="EyeIcon" color="#A1A1A1" /> : <Icon name="Eye2Icon" color="#A1A1A1" />}
          </button>
        }
      />
      <PasswordCheck password={password} />
      <InputField
        icon={<Icon name="LockIcon" />}
        error={!!errors.password}
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요."
        type="password"
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
      {/* 비밀번호 일치 여부 메시지 */}
      <div className="flex items-center space-x-2">
        {isMatching ? (
          <span className="text-secondary-600 flex items-center">
            <Icon name="CheckIcon" /> 비밀번호가 동일합니다.
          </span>
        ) : confirmPassword.length > 0 ? (
          <span className="flex items-center text-red-500">
            <Icon name="XIcon" /> 비밀번호가 동일하지 않습니다.
          </span>
        ) : null}
      </div>
      <Button
        label="다음으로"
        variant={isFormFilled ? 'blue' : 'gray'}
        disabled={!isFormFilled}
        onClick={handleSubmit(handleNext)}
      />
    </div>
  );
};

export default PasswordStep;
