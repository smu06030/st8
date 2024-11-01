const BookMarkIcon = ({ color = '#white' }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 6C8 4.89543 8.89543 4 10 4H18C19.1046 4 20 4.89543 20 6V20V24L14 20L8 24V20V6Z"
        fill={color}
      />
    </svg>
  );
};

export default BookMarkIcon;
