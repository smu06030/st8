// components/auth/PasswordCheck.tsx

import Icon from '@/components/common/Icons/Icon';
import React from 'react';

interface PasswordCheckProps {
  password: string;
}

const PasswordCheck: React.FC<PasswordCheckProps> = ({ password = '' }) => {
  const hasNumber = /\d/.test(password);
  const hasLetter = /[A-Za-z]/.test(password);
  const isLongEnough = password.length >= 8;

  return (
    <div className="mt-2 flex space-x-2">
      <div className={`flex items-center ${hasNumber ? 'text-secondary-600' : 'text-red-500'}`}>
        {hasNumber ? <Icon name="CheckIcon" /> : <Icon name="XIcon" />} 숫자 포함
      </div>
      <div className={`flex items-center ${hasLetter ? 'text-secondary-600' : 'text-red-500'}`}>
        {hasNumber ? <Icon name="CheckIcon" /> : <Icon name="XIcon" />}영문 포함
      </div>
      <div className={`flex items-center ${isLongEnough ? 'text-secondary-600' : 'text-red-500'}`}>
        {hasNumber ? <Icon name="CheckIcon" /> : <Icon name="XIcon" />} 8자리 이상
      </div>
    </div>
  );
};

export default PasswordCheck;
