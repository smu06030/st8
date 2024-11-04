import { useState, useRef } from 'react';

const useDropdoun = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); //기준

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, setIsOpen, toggleDropdown, dropdownRef };
};

export default useDropdoun;
