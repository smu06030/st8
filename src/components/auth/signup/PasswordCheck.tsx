import Image from 'next/image';
import React from 'react';

interface PasswordCheckProps {
  password: string;
}

const PasswordCheck = ({ password = '' }: PasswordCheckProps) => {
  const hasNumber = /\d/.test(password);
  const hasLetter = /[A-Za-z]/.test(password);
  const isLongEnough = password.length >= 8;

  return (
    <div className="flex flex-row justify-end space-x-2">
      {/* 숫자 포함 */}
      <div className="flex items-center justify-end">
        <Image
          src={hasNumber ? '/images/check2.png' : '/images/alert2.png'}
          alt={hasNumber ? 'alert1' : 'alert1'}
          width={56}
          height={56}
        />
      </div>

      {/* 영문 포함 */}
      <div className="flex items-center justify-end">
        <Image
          src={hasLetter ? '/images/check1.png' : '/images/alert1.png'}
          alt={hasLetter ? 'check2' : 'alert2'}
          width={56}
          height={56}
        />
      </div>

      {/* 8자리 이상 */}
      <div className="flex items-center justify-end">
        <Image
          src={isLongEnough ? '/images/check3.png' : '/images/alert3.png'}
          alt={isLongEnough ? 'check3' : 'alert3'}
          width={120}
          height={120}
        />
      </div>
    </div>
  );
};

export default PasswordCheck;
