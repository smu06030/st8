'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SignupFormInputs } from '@/types/auth/auth.type';
import { signUpWithEmail, checkEmailExists } from '@/app/api/auth/authService';
import { passwordValidationRules, validatePassword } from '@/utils/auth/passwordValidation';

import Icon from '@/components/common/Icons/Icon';
import Button from '@/components/common/Buttons/Button';
import InputField from '@/components/common/InputField/InputField';
import GoMainStep from '@/components/auth/signup/mobile/StepMainForm';
import SmailXIcon from '@/components/common/Icons/Auth/SmailXIcon';
import SmailCheckIcon from '@/components/common/Icons/Auth/SmailCheckIcon';
import PasswordMatchStatus from '@/components/common/auth/PasswordMatchStatus';

const DesktopSignupForm = () => {
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<SignupFormInputs>({
    mode: 'onChange'
  });

  const passwordValue = watch('password') || '';
  const confirmPasswordValue = watch('confirmPassword') || '';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordValidations = validatePassword(passwordValue, confirmPasswordValue);
  const validationRules = passwordValidationRules(passwordValidations);

  const handleSignup = async (data: SignupFormInputs) => {
    try {
      await signUpWithEmail(data.nickname, data.email, data.password);
      window.location.href = '/home';
    } catch (error: any) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const onSubmit = (data: SignupFormInputs) => {
    if (isValid && passwordValidations.isMatching) {
      setStep(1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {step === 0 && (
        <div className="mr-[185px] mt-3 flex flex-col">
          <p className="mb-2 text-2xl font-semibold text-secondary-900">회원가입</p>
          <p className="mb-6 text-gray-700">모아랑 여행을 떠나요.</p>
        </div>
      )}

      {step === 0 ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-screen flex-col items-center space-y-12">
          <InputField
            iconName="UserIcon"
            placeholder="이름을 입력해주세요."
            text="이름"
            status={errors.nickname ? 'error' : 'default'}
            register={register('nickname', { required: '이름을 입력해주세요.' })}
            error={errors.nickname}
          />

          <InputField
            iconName="MailIcon"
            text="이메일"
            placeholder="이메일을 입력해주세요."
            register={register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '유효한 이메일 주소를 입력해주세요.'
              },
              validate: async (email) => {
                try {
                  const exists = await checkEmailExists(email);
                  return exists ? '이미 사용 중인 이메일입니다.' : true;
                } catch {
                  return '이메일 확인 중 오류가 발생했습니다.';
                }
              }
            })}
            status={errors.email ? 'error' : 'default'}
            error={errors.email}
          />

          <InputField
            iconName="LockIcon"
            text="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type={showPassword ? 'text' : 'password'}
            status={errors.password ? 'error' : 'default'}
            register={register('password', {
              required: '비밀번호를 입력해주세요.'
            })}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'Eye2Icon' : 'EyeIcon'} color="#A1A1A1" />
              </button>
            }
          />

          <div className="!mb-[-22px] !mt-8 flex w-full justify-end gap-2 text-xs">
            {validationRules.map(({ label, isValid }, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className={isValid ? 'text-secondary-700' : 'text-red-700'}>{label}</span>
                {isValid ? <SmailCheckIcon /> : <SmailXIcon />}
              </div>
            ))}
          </div>

          <InputField
            iconName="LockIcon"
            text="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            type={showConfirmPassword ? 'text' : 'password'}
            status={errors.confirmPassword ? 'error' : 'default'}
            register={register('confirmPassword')}
            error={errors.confirmPassword}
            rightIcon={
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon name={showConfirmPassword ? 'Eye2Icon' : 'EyeIcon'} color="#A1A1A1" />
              </button>
            }
          />

          <div className="!mt-8 flex w-full items-center justify-end space-y-6 text-xs">
            <PasswordMatchStatus isMatching={passwordValidations.isMatching} />
          </div>

          <div>
            <Button
              text="다음으로"
              variant={isValid && passwordValidations.isMatching ? 'blue' : 'gray'}
              disabled={!isValid || !passwordValidations.isMatching}
              type="submit"
            />
          </div>
        </form>
      ) : (
        <GoMainStep onNext={() => handleSignup(watch())} />
      )}
    </div>
  );
};

export default DesktopSignupForm;
