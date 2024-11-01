const BellIcon = ({ color = '#white' }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 13C20 10.3405 18.2697 8.08514 15.8734 7.29827C15.5892 6.53984 14.8577 6 14 6C13.1423 6 12.4108 6.53984 12.1266 7.29827C9.7303 8.08514 8 10.3405 8 13V19H20V13ZM15 22C16.1046 22 17 21.1046 17 20H11C11 21.1046 11.8954 22 13 22H15Z"
        fill={color}
      />
    </svg>
  );
};

export default BellIcon;
