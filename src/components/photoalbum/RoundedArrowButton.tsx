import React from 'react';

interface ArrowPropType {
  disabled: boolean;
  handleClick: () => void;
  direction: 'left' | 'right';
}

const RoundedArrowButton = ({ disabled, handleClick, direction }: ArrowPropType) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        backgroundImage: `url('${direction === 'left' ? '/images/photo-arrow-prev.png' : '/images/photo-arrow-next.png'}')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '64px',
        height: '64px'
      }}
    ></button>
  );
};

export default RoundedArrowButton;
