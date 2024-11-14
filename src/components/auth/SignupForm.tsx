'use client';

import React, { useEffect, useState } from 'react';
import DesktopSignupForm from './DesktopSignupForm';
import MobileSignupForm from './MobileSignupForm';

const SignupForm = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return <>{isDesktop ? <DesktopSignupForm /> : <MobileSignupForm />}</>;
};

export default SignupForm;
