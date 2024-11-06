'use client';

import { useState } from 'react';
import supabase from '@/utils/supabase/client';
import Button from '@/components/common/Buttons/Button';

import { useForm } from 'react-hook-form';
import browserClient from '@/utils/supabase/client';
import InputField from '@/components/common/InputField';

interface ForgotFormInputs {
  email: string;
}

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailStatus, setEmailStatus] = useState<'default' | 'active' | 'done'>('default');
  const [email, setEmail] = useState(''); // 이메일 입력 상태를 직접 관리

  const { handleSubmit, reset } = useForm<ForgotFormInputs>();

  const isFormFilled = Boolean(email);

  // 비밀번호 재설정 이메일 전송 함수
  const handlePasswordReset = async () => {
    setMessage('');
    setError('');
    try {
      const { error } = await browserClient.auth.resetPasswordForEmail(email);
      if (error) {
        setError('이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
      } else {
        setMessage('비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해주세요.');
        setEmail(''); // 이메일 필드를 초기화
        setEmailStatus('done'); // 성공 시 상태를 'done'으로 설정
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="m-[32px] min-h-screen flex-col justify-between">
      <span className="mb-6 w-full text-left font-bold text-[32px] text-secondary-700">
        등록된 이메일로 <br />
        비밀번호를 변경합니다.
      </span>

      <form onSubmit={handleSubmit(handlePasswordReset)} className="w-full space-y-4">
        <InputField
          iconName="MailIcon"
          text="이메일"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailStatus('active');
          }}
          onBlur={() => setEmailStatus(email ? 'done' : 'default')}
          status={emailStatus}
        />

        <Button text="비밀번호 찾기" variant={isFormFilled ? 'blue' : 'gray'} disabled={!isFormFilled} />
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default ForgotPasswordForm;
