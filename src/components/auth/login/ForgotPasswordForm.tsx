'use client';

import { useState } from 'react';
import supabase from '@/utils/supabase/client';
import Button from '@/components/common/Buttons/Button';
import InputField from '@/components/common/InputField';
import Icon from '@/components/common/Icons/Icon';
import { useForm } from 'react-hook-form';

interface ForgotFormInputs {
  email: string;
}

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<ForgotFormInputs>();

  // 입력 필드 값 감지
  const email = watch('email');
  const isFormFilled = Boolean(email);

  // 비밀번호 재설정 이메일 전송 함수
  const handlePasswordReset = async (data: ForgotFormInputs) => {
    setMessage('');
    setError('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email);
      if (error) {
        setError('이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
      } else {
        setMessage('비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해주세요.');
        reset(); // 이메일 필드를 초기화
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="fixed flex min-h-screen flex-col items-center space-y-6 px-6 py-8">
      <span className="mb-6 w-full max-w-[327px] text-left font-bold text-[32px] text-secondary-700">
        비밀번호 찾기
      </span>

      <form onSubmit={handleSubmit(handlePasswordReset)} className="w-full max-w-[327px] space-y-4">
        <InputField
          icon={<Icon name="MailIcon" />}
          label="이메일"
          placeholder="이메일을 입력해주세요."
          register={register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '유효한 이메일 주소를 입력해주세요.'
            }
          })}
        />

        <Button label="이메일 보내기" variant={isFormFilled ? 'blue' : 'gray'} disabled={!isFormFilled} />
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
