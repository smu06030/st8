const EtcIcon = ({ color = '#white' }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 14C9 15.1046 8.10457 16 7 16C5.89543 16 5 15.1046 5 14C5 12.8954 5.89543 12 7 12C8.10457 12 9 12.8954 9 14ZM16 14C16 15.1046 15.1046 16 14 16C12.8954 16 12 15.1046 12 14C12 12.8954 12.8954 12 14 12C15.1046 12 16 12.8954 16 14ZM21 16C22.1046 16 23 15.1046 23 14C23 12.8954 22.1046 12 21 12C19.8954 12 19 12.8954 19 14C19 15.1046 19.8954 16 21 16Z"
        fill={color}
      />
    </svg>
  );
};

export default EtcIcon;
