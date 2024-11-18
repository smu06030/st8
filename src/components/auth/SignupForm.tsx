'use client';

import { useEffect, useState } from 'react';

import MobileSignupForm from './MobileSignupForm';
import DesktopSignupForm from './DesktopSignupForm';

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
