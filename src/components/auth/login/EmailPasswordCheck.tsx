import React, { useState } from 'react';
import supabase from '@/utils/supabase/client';
import Icon from '@/components/common/Icons/Icon';

interface EmailPasswordCheckProps {
  email: string;
  password: string;
}

const EmailPasswordCheck: React.FC<EmailPasswordCheckProps> = ({ email, password }) => {
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  const checkEmail = async () => {
    const { data, error } = await supabase.from('profiles').select('email').eq('email', email).single();
    if (error || !data) {
      setEmailMessage('등록되지 않은 이메일입니다.');
    } else {
      setEmailMessage(null);
    }
  };

  const checkPassword = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setPasswordMessage('등록되지 않은 비밀번호입니다.');
    } else {
      setPasswordMessage(null);
    }
  };

  return (
    <div>
      {/* 이메일 오류 메시지 */}
      {emailMessage && (
        <div className="mt-1 flex items-center text-[12px] text-red-500">
          <Icon name="SXIcon" />
          <span className="ml-2">{emailMessage}</span>
        </div>
      )}
      {/* 비밀번호 오류 메시지 */}
      {passwordMessage && (
        <div className="mt-1 flex items-center text-[12px] text-red-500">
          <Icon name="SXIcon" />
          <span className="ml-2">{passwordMessage}</span>
        </div>
      )}
    </div>
  );
};

export default EmailPasswordCheck;
