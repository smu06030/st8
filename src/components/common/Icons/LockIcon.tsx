const LockIcon = ({ color = '#white' }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 6H15C16.1046 6 17 6.89543 17 8V10H11V8C11 6.89543 11.8954 6 13 6ZM9 10V8C9 5.79086 10.7909 4 13 4H15C17.2091 4 19 5.79086 19 8V10H20C21.1046 10 22 10.8954 22 12V22C22 23.1046 21.1046 24 20 24H8C6.89543 24 6 23.1046 6 22V12C6 10.8954 6.89543 10 8 10H9ZM14 14C12.8954 14 12 14.8954 12 16C12 16.6543 12.3142 17.2352 12.8 17.6001L12 20H16L15.2 17.6001C15.6858 17.2352 16 16.6543 16 16C16 14.8954 15.1046 14 14 14Z"
        fill={color}
      />
    </svg>
  );
};

export default LockIcon;
