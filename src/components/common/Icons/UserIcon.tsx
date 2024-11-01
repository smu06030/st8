const UserIcon = ({ color = '#white' }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 14C16.7614 14 19 11.7614 19 9C19 6.23858 16.7614 4 14 4C11.2386 4 9 6.23858 9 9C9 11.7614 11.2386 14 14 14ZM8 16C5.79086 16 4 17.7909 4 20V24H24V20C24 17.7909 22.2091 16 20 16H8Z"
        fill={color}
      />
    </svg>
  );
};

export default UserIcon;
