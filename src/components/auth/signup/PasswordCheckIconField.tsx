import React, { useState } from 'react';
import InputField from '@/components/common/InputField';
import Icon from '@/components/common/Icons/Icon';

interface PasswordConfirmFieldProps {
  password: string; // password는 string 타입
}

const PasswordConfirmField = ({ password }: PasswordConfirmFieldProps) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'default' | 'active' | 'done'>('default');
  const [error, setError] = useState<string | null>(null);

  // 비밀번호 보이기/숨기기 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 비밀번호 확인 입력 핸들러
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setStatus('active'); // 입력 중일 때 active 상태
    setError(null);
  };

  // 블러 시 비밀번호 확인 유효성 검사
  const handleConfirmPasswordBlur = () => {
    if (confirmPassword === password) {
      setStatus('done'); // 비밀번호 일치 시 done 상태
    } else {
      setStatus('default');
      setError('비밀번호가 일치하지 않습니다.');
    }
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
