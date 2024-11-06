import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'gray' | 'blue' | 'yellow';
  disabled?: boolean;
}

const Button = ({ text, onClick, variant = 'gray', disabled = false }: ButtonProps) => {
  const baseStyles =
    'h-16 w-[327px] rounded-xl p-2.5 font-semiBold text-base transition-colors duration-300 ease-in-out';

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
