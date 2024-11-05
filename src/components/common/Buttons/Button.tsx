import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'gray' | 'blue' | 'yellow';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'gray', disabled = false }) => {
  const baseStyles =
    'h-[64px] w-full rounded-[12px] p-[10px] font-semiBold text-[16px] transition-colors duration-300 ease-in-out';

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
      {text}
    </button>
  );
};

export default Button;
