interface ArrowPropType {
  disabled: boolean;
  handleClick: () => void;
  direction: 'left' | 'right';
}

const RoundedArrowButton = ({ disabled, handleClick, direction }: ArrowPropType) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleClick();
  };

  return (
    <button
      onClick={handleButtonClick}
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
