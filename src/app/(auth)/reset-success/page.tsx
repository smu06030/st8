import { Metadata } from 'next';

import ResetSuccess from '@/components/auth/reset/ResetSuccess';

export const metadata: Metadata = {
  title: '메일 발송완료',
  description: '메일 발송완료  페이지입니다.'
};

const ResetSuccessPage = () => {
  return (
    <div>
      <div className="mt-20"></div>
      <ResetSuccess />;
    </div>
  );
};

export default ResetSuccessPage;
