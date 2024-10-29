import Homepage from '@/components/homepage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈페이지',
  description: '홈페이지 입니다.'
};

export default function Home() {
  return (
    <div>
      <Homepage />
    </div>
  );
}
