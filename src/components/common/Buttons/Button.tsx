import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'gray' | 'blue' | 'yellow';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'gray', disabled = false }) => {
  const baseStyles =
    'm-[20px] h-[64px] w-[327px] rounded-[12px] p-[10px] font-semiBold text-[16px] transition-colors duration-300 ease-in-out';

  const variantStyles = {
    gray: 'bg-gray-100 text-gray-300 cursor-not-allowed',
    blue: 'text-secondary-900 bg-secondary-500',
    yellow: 'text-primary-900 bg-primary-400'
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[variant]}`}
      onClick={onClick}
      disabled={variant === 'gray' || disabled}
    >
      {label}
    </button>
  );
};

export default Button;
