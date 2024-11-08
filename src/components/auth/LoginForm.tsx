'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import Button from '@/components/common/Buttons/Button';
import LinkButton from '@/components/common/Buttons/LinkButton';
import InputField from '../common/InputField';
import SocialLoginButton from '@/components/common/Buttons/SocialLoginButton';
import { useLoginFormState } from '@/hooks/useLoginFormState';
import { loginWithEmailAndPassword } from '@/app/api/auth/authService';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { loginWithProvider } = useSocialLogin();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<LoginFormInputs>();
  const {
    isEmailError,
    setIsEmailError,
    isPasswordError,
    setIsPasswordError,
    emailStatus,
    setEmailStatus,
    passwordStatus,
    setPasswordStatus,
    resetErrors
  } = useLoginFormState();
  const router = useRouter();

  const email = watch('email');
  const password = watch('password');

  const isFormFilled = email && password;

  const onHandleLogin = async (data: LoginFormInputs) => {
    resetErrors();

    const result = await loginWithEmailAndPassword(data.email, data.password);

    if (result.success) {
      router.push('/mypage');
    } else {
      if (result.type === 'password') {
        setIsPasswordError(true);
        setPasswordStatus('done');
      } else {
        setIsEmailError(true);
        setEmailStatus('done');
      }
    }
  };

  return (
    <div className="m-[32px] min-h-screen flex-col justify-between">
      <form onSubmit={handleSubmit(onHandleLogin)} className="flex flex-col items-center justify-center space-y-[24px]">
        <InputField
          iconName="MailIcon"
          text="이메일"
          placeholder="이메일을 입력해주세요."
          value={email || ''}
          onChange={(e) => {
            setValue('email', e.target.value);
            setEmailStatus('active');
          }}
          onBlur={() => {
            setEmailStatus(isEmailError ? 'error' : 'done');
          }}
          status={isEmailError ? 'error' : emailStatus}
          errorMessage={isEmailError ? '이메일 형식이 올바르지 않습니다.' : undefined}
        />

        <InputField
          iconName="LockIcon"
          text="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={password || ''}
          onChange={(e) => {
            setValue('password', e.target.value);
            setPasswordStatus('active');
          }}
          onBlur={() => {
            setPasswordStatus(isPasswordError ? 'error' : 'done');
          }}
          status={isPasswordError ? 'error' : passwordStatus}
          errorMessage={isPasswordError ? '비밀번호가 올바르지 않습니다.' : undefined}
        />

        <div className="mx-auto !mt-[66px] flex w-full max-w-md justify-between px-8">
          <label className="flex items-center text-gray-700">
            <input type="checkbox" className="mr-2 text-[14px]" />
            자동 로그인
          </label>
          <a href="/forgot-password" className="text-[14px] text-gray-700">
            아이디/비밀번호 찾기
          </a>
        </div>

        <Button
          text="로그인"
          variant={isFormFilled ? 'blue' : 'gray'}
          disabled={!isFormFilled}
          onClick={handleSubmit(onHandleLogin)}
        />

        <div className="!mt-[48px] flex justify-center space-x-[16px]">
          <SocialLoginButton
            provider="google"
            onClick={() => loginWithProvider('google')}
            altText="Google Login"
            imageUrl="/images/google-icon.png"
          />

          <SocialLoginButton
            provider="kakao"
            onClick={() => loginWithProvider('kakao')}
            altText="Kakao Login"
            imageUrl="/images/kakao-icon.png"
          />
        </div>

        <div className="!mt-[210px] mb-4 flex items-center justify-center space-x-2">
          <span className="text-[14px] text-gray-600">아직 회원이 아니신가요?</span>
          <LinkButton text="회원가입" href="/signup" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

//register를 사용하려고 했는데 InputField에서 계속 오류가 생겨 해당 부분은 그냥 두었습니다ㅠ
