const MapIcon = ({ color = '#white' }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 11V5C4 4.44772 4.44772 4 5 4H16V10L4 11ZM4 13L16 12V24H5C4.44772 24 4 23.5523 4 23V13ZM18 24V17L24 21V23C24 23.5523 23.5523 24 23 24H18ZM18 15L24 19L24 5C24 4.44772 23.5523 4 23 4H18L18 15Z"
        fill={color}
      />
    </svg>
  );
};

export default MapIcon;
