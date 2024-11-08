import React, { ChangeEvent, ReactNode, useEffect, useState, forwardRef } from 'react';
import Icon from '@/components/common/Icons/Icon';
import { InputFieldStyles } from '@/components/common/InputField/InputFieldStyles';

interface InputFieldProps {
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  status: 'default' | 'active' | 'done' | 'error';
  iconName: 'MailIcon' | 'UserIcon' | 'LockIcon' | 'LocationIcon';
  text?: string;
  type?: string;
  rightIcon?: ReactNode;
  errorMessage?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ placeholder, value, onChange, onBlur, status, iconName, text, type = 'text', rightIcon, errorMessage }, ref) => {
    const [currentStatus, setCurrentStatus] = useState<'default' | 'active' | 'done' | 'error'>(status);

    useEffect(() => {
      if (!value) {
        setCurrentStatus('default');
      } else {
        setCurrentStatus(errorMessage ? 'error' : status);
      }
    }, [status, errorMessage, value]);

    const currentStyle = InputFieldStyles[currentStatus];

    return (
      <div className="relative flex h-16 w-full max-w-[327px] flex-col space-y-1">
        {text && <label className="text-base font-normal text-gray-900">{text}</label>}
        <span
          className={`flex items-center rounded-xl border ${currentStyle.border} w-full px-4 py-2.5 transition-colors duration-300 ease-in-out`}
        >
          <Icon name={iconName} color={currentStyle.iconColor} />
          <input
            // ref={ref}
            type={type}
            placeholder={placeholder}
            className={`flex-grow bg-transparent text-sm font-normal text-[#004156] focus:outline-none ${currentStyle.textColor}`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          {rightIcon && <div className="ml-2">{rightIcon}</div>}
        </span>
        {errorMessage && <p className="absolute bottom-[-35px] right-[-5px] text-xs text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
