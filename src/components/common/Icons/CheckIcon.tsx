const CheckIcon = ({ color = '#white' }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.7071 8.29289C22.0976 8.68342 22.0976 9.31658 21.7071 9.70711L11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L6.29289 15.7071C5.90237 15.3166 5.90237 14.6834 6.29289 14.2929C6.68342 13.9024 7.31658 13.9024 7.70711 14.2929L11 17.5858L20.2929 8.29289C20.6834 7.90237 21.3166 7.90237 21.7071 8.29289Z"
        fill={color}
      />
    </svg>
  );
};

export default CheckIcon;
