import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode; // 좌측 아이콘
  rightIcon?: React.ReactNode; // 우측 아이콘
  register?: UseFormRegisterReturn; // register 타입을 prop으로 추가
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type = 'text', icon, rightIcon, register }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsFilled(!!e.target.value); // 입력값이 있는 경우 isFilled를 true로 설정
  };

  const inputColorClasses = isFocused
    ? 'border-secondary-800 text-secondary-800 placeholder-secondary-800' // 포커스 상태
    : isFilled
      ? 'border-gray-300 text-gray-900 placeholder-gray-900' // 입력 완료
      : 'border-gray-300 text-gray-400 placeholder-gray-400'; // 초기 상태

  const iconColor = isFocused
    ? 'secondary-800' // 포커스 상태
    : isFilled
      ? 'gray-900' // 입력 완료
      : 'gray-300'; // 초기 상태

  return (
    <div className="flex w-full flex-col">
      <label className="mb-[8px] px-[6px] text-[16px] text-gray-900">{label}</label>
      <div
        className={`flex h-[60px] items-center rounded-[12px] border bg-transparent px-[16px] py-[10px] text-[14px] ${inputColorClasses} transition-colors duration-300 ease-in-out`}
      >
        {icon && (
          <div className="mr-2" style={{ color: iconColor }}>
            {icon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...register} // register를 input에 연결
        />
        {rightIcon && (
          <div className="ml-2 cursor-pointer" style={{ color: iconColor }}>
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
