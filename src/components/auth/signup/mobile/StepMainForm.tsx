import { StepMainFormProps } from '@/types/auth/auth.type';

import Button from '@/components/common/Buttons/Button';
import SignupCompleteIcon from '@/components/common/Icons/Auth/SignupCompleteIcon';

const StepMainForm = ({ onNext }: StepMainFormProps) => {
  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-col items-start justify-between overflow-hidden">
      <div className="flex w-full flex-grow items-center justify-center">
        <div className="absolute flex h-[90%] justify-center">
          <SignupCompleteIcon />
        </div>
        <span className="mt-24 flex flex-col items-center font-semiBold text-2xl text-gray-900">
          회원가입을 완료했어요!
        </span>
      </div>

      <div className="mb-[50px] flex w-full flex-col items-center justify-center">
        <Button text="이제, 여행을 떠나요" variant="blue" onClick={onNext} />
      </div>
    </div>
  );
};

export default StepMainForm;
