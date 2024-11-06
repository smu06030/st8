import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import Icon from '@/components/common/Icons/Icon';

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  status: 'default' | 'active' | 'done';
  iconName: 'MailIcon' | 'UserIcon' | 'LockIcon' | 'LocationIcon' | 'Eye2Icon' | 'EyeIcon';
  text?: string;
  type?: string;
  rightIcon?: ReactNode;
}

function InputField({
  placeholder,
  value,
  onChange,
  onBlur,
  status,
  iconName,
  text,
  type = 'text',
  rightIcon
}: InputFieldProps) {
  const [currentStatus, setCurrentStatus] = useState(status);

  // 상태별 스타일 정의
  const styles = {
    default: {
      border: 'border-gray-300',
      iconColor: '#9C9C9C',
      textColor: 'text-gray-400'
    },
    active: {
      border: 'border-secondary-800',
      iconColor: '#00688A',
      textColor: 'text-secondary-800'
    },
    done: {
      border: 'border-green-900',
      iconColor: '#1D1D1D',
      textColor: 'text-green-900'
    }
  };

  // value 값에 따라 상태를 동적으로 설정
  useEffect(() => {
    if (!value) {
      setCurrentStatus('default');
    } else if (status === 'done') {
      setCurrentStatus('done');
    } else {
      setCurrentStatus('active');
    }
  }, [value, status]);

  const currentStyle = styles[currentStatus];
  // console.log('Current status:', currentStatus);

  return (
    <div className="flex flex-col space-y-1">
      {text && <label className="text-base font-normal text-gray-900">{text}</label>}
      <span
        className={`flex items-center gap-1.5 rounded-xl border ${currentStyle.border} px-4 py-2.5 transition-colors duration-300 ease-in-out`}
      >
        <Icon name={iconName} color={currentStyle.iconColor} />
        <input
          type={type}
          placeholder={placeholder}
          className={`w-[235px] bg-transparent text-sm font-normal text-[#004156] ${currentStyle.textColor}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {rightIcon && <div className="ml-2">{rightIcon}</div>}
      </span>
    </div>
  );
}

export default InputField;
