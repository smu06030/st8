import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/common/Buttons/Button';
import Icon from '@/components/common/Icons/Icon';
import PasswordCheck from './PasswordCheck';
import Image from 'next/image';
import InputField from '@/components/common/InputField';

interface PasswordStepProps {
  onNext: (password: string) => void;
}

const PasswordStep = ({ onNext }: PasswordStepProps) => {
  const {
    formState: { errors }
  } = useForm();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<'default' | 'active' | 'done'>('default');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState<'default' | 'active' | 'done'>('default');
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (errors.password) {
      console.log('Password Error:', errors.password.message);
    }
  }, [errors.password]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordStatus('active');
    setIsMatching(e.target.value === confirmPassword && confirmPassword.length > 0);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordStatus('active');
    setIsMatching(e.target.value === password && password.length > 0);
  };

  const handlePasswordBlur = () => {
    setPasswordStatus(password.length >= 8 ? 'done' : 'default');
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordStatus(confirmPassword === password ? 'done' : 'default');
  };

  const handleNext = () => {
    if (isMatching) {
      onNext(password);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="fixed flex min-h-screen flex-col items-center space-y-6 px-6 py-8">
      <span className="mb-6 w-full max-w-[327px] text-left font-bold text-[32px] text-secondary-700">
        모아에게 <br /> 비밀번호를 알려주세요.
      </span>

      <InputField
        iconName="LockIcon"
        text="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        status={passwordStatus}
        rightIcon={
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Icon name="Eye2Icon" color="#A1A1A1" /> : <Icon name="EyeIcon" color="#A1A1A1" />}
          </button>
        }
      />

      <PasswordCheck password={password} />

      <InputField
        iconName="LockIcon"
        text="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요."
        type={showConfirmPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        onBlur={handleConfirmPasswordBlur}
        status={confirmPasswordStatus}
        rightIcon={
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <Icon name="Eye2Icon" color="#A1A1A1" /> : <Icon name="EyeIcon" color="#A1A1A1" />}
          </button>
        }
      />

      {/* 비밀번호 일치 여부 메시지 */}
      <div className="flex w-full items-center justify-end space-x-2">
        {isMatching ? (
          <Image src="/images/pass-check1.png" alt="비밀번호 일치" width={128} height={128} />
        ) : confirmPassword.length > 0 ? (
          <Image src="/images/pass-alert1.png" alt="비밀번호 불일치" width={160} height={160} />
        ) : null}
      </div>

      <Button text="다음으로" variant={isMatching ? 'blue' : 'gray'} disabled={!isMatching} onClick={handleNext} />
    </div>
  );
};

export default PasswordStep;
