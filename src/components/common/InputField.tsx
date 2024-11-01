import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form'; // react-hook-form 타입 가져오기
import UserIcon from './Icons/UserIcon';

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode; // 아이콘을 받을 수 있도록 prop 추가
  register?: UseFormRegisterReturn; // register 타입을 prop으로 추가
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type = 'text', icon, register }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsFilled(!!e.target.value); // 입력값이 있는 경우 isFilled를 true로 설정
  };

  const inputBorderColor = isFocused
    ? 'border-[#00688A] text-[#004157]' // 포커스 시 스타일
    : isFilled
      ? 'border-gray-300 text-gray-900' // 입력 완료 시 스타일
      : 'border-gray-300 text-gray-400'; // 초기 상태 스타일

  return (
    <div className="flex flex-col">
      <label className="mb-[8px] px-[6px] text-[16px] text-gray-900">{label}</label>
      <div
        className={`flex h-[60px] w-[327px] items-center rounded-[12px] border bg-transparent px-[16px] py-[10px] text-[14px] ${inputBorderColor} transition-colors duration-300 ease-in-out`}
      >
        {icon && <div className="mr-2 text-gray-500">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...register}
        />
      </div>
    </div>
  );
};

export default InputField;
