import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode; // 좌측 아이콘
  rightIcon?: React.ReactNode; // 우측 아이콘
  register?: UseFormRegisterReturn; // register 타입을 prop으로 추가
  error?: boolean; // 에러 상태 추가
  errorMessage?: string; // 에러 메시지 추가
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 추가된 부분
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = 'text',
  icon,
  rightIcon,
  register,
  error = false,
  errorMessage,
  value, // 추가된 부분
  onChange // 추가된 부분
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    console.log('>>>>>>>>>>>>>>>>>>');
    setIsFilled(!!e.target.value); // 입력값이 있는 경우 isFilled를 true로 설정
  };

  const inputColorClasses = error
    ? 'border-red-500 text-red-500 placeholder-red-500' // 에러 상태
    : isFocused
      ? 'border-secondary-800 text-secondary-800 placeholder-secondary-800' // 포커스 상태
      : isFilled
        ? 'border-gray-300 text-gray-900 placeholder-gray-900' // 입력 완료
        : 'border-gray-300 text-gray-400 placeholder-gray-400'; // 초기 상태

  const iconColor = error
    ? 'red-500' // 에러 상태
    : isFocused
      ? 'secondary-800' // 포커스 상태
      : isFilled
        ? 'gray-900' // 입력 완료
        : 'gray-300'; // 초기 상태

  return (
    <div className="flex flex-col">
      <label className="mb-[8px] px-[6px] text-[16px] text-gray-900">{label}</label>
      <div
        className={`flex h-[60px] w-[327px] items-center rounded-[12px] border bg-transparent px-[16px] py-[10px] text-[14px] ${inputColorClasses} transition-colors duration-300 ease-in-out`}
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
          {...register}
          value={value} // 추가된 부분
          onChange={onChange} // 추가된 부분
        />
        {rightIcon && (
          <div className="ml-2 cursor-pointer" style={{ color: iconColor }}>
            {rightIcon}
          </div>
        )}
      </div>
      {error && errorMessage && (
        <span className="mt-1 flex items-center px-[6px] text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;
