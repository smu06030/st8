import { useState } from 'react';

interface FormData {
  nickname: string;
  email: string;
  password: string;
}

export const useSignupFormState = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({ nickname: '', email: '', password: '' });

  const handleNext = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  return { step, formData, handleNext };
};

//회원가입 스텝을 저장하는 곳
