import React, { ReactNode, useEffect, useState, forwardRef, ChangeEvent } from 'react';
import Icon from '@/components/common/Icons/Icon';
import { InputFieldStyles } from '@/components/common/InputField/InputFieldStyles';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  placeholder: string;
  status: 'default' | 'active' | 'done' | 'error';
  iconName: 'MailIcon' | 'UserIcon' | 'LockIcon' | 'LocationIcon';
  text?: string;
  type?: string;
  rightIcon?: ReactNode;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  error?: { message?: string };
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

const InputFieldWithRegister = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ placeholder, status, iconName, text, type = 'text', rightIcon, errorMessage, register, error, onChange }, ref) => {
    const [currentStatus, setCurrentStatus] = useState<'default' | 'active' | 'done' | 'error'>(status);

    useEffect(() => {
      setCurrentStatus(error?.message ? 'error' : status);
    }, [status, error?.message]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentStatus('active'); // 입력 중일 때 active 상태로 설정
      register?.onChange?.(e); // react-hook-form에서 전달된 onChange 호출
    };

    const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentStatus(error?.message ? 'error' : 'done');
    };

    const currentStyle = InputFieldStyles[currentStatus];

    return (
      <div className="relative flex h-16 w-full max-w-[327px] flex-col space-y-1">
        {text && <label className="text-base font-normal text-gray-900">{text}</label>}
        <span
          className={`flex items-center rounded-xl border ${currentStyle.border} w-full px-4 py-2.5 transition-colors duration-300 ease-in-out`}
        >
          <Icon name={iconName} color={currentStyle.iconColor} />
          <input
            type={type}
            placeholder={placeholder}
            className={`flex-grow bg-transparent text-sm font-normal text-[#004156] focus:outline-none ${currentStyle.textColor}`}
            {...register}
            onChange={handleInputChange} // active 상태 반영
            onBlur={handleInputBlur}
          />
          {rightIcon && <div className="ml-2">{rightIcon}</div>}
        </span>
        {error?.message && <p className="absolute bottom-[-35px] right-[-5px] text-xs text-red-500">{error.message}</p>}
      </div>
    );
  }
);

InputFieldWithRegister.displayName = 'InputFieldWithRegister';

export default InputFieldWithRegister;
