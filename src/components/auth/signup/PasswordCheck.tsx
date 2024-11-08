import React from 'react';

interface PasswordCheckProps {
  password: string;
}

const PasswordCheck = ({ password = '' }: PasswordCheckProps) => {
  const hasNumber = /\d/.test(password);
  const hasLetter = /[A-Za-z]/.test(password);
  const isLongEnough = password.length >= 8 && password.length <= 16;

  return (
    <div className="flex w-full flex-row justify-end space-x-4 text-sm">
      <div className="flex items-center">
        {hasNumber ? <p className="text-secondary-600">숫자 포함 ✔</p> : <p className="text-red-600">숫자 포함 ✖</p>}
      </div>
      <div className="flex items-center">
        {hasLetter ? <p className="text-secondary-600">영문 포함 ✔</p> : <p className="text-red-600">영문 포함 ✖</p>}
      </div>
      <div className="flex items-center">
        {isLongEnough ? (
          <p className="text-secondary-600">8자리 이상 ✔</p>
        ) : (
          <p className="text-red-600">8자리 이상 ✖</p>
        )}
      </div>
    </div>
  );
};

export default PasswordCheck;
