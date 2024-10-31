'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserNickname from '@/hooks/useUserNickname';
import supabase from '@/utils/supabase/client';
import LogoutButton from '../auth/LogoutButton';

const Profile = () => {
  const router = useRouter();
  const { nickname, error: nicknameError } = useUserNickname(); // 닉네임 가져오기 훅 사용
  const [newNickname, setNewNickname] = useState<string | null>(nickname || ''); // 수정할 닉네임 상태
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (nicknameError) setError(nicknameError); // 훅에서 받은 에러 처리
  }, [nicknameError]);

  const onHandleUpdate = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) return;

      const userId = sessionData.session.user.id;
      const { error } = await supabase.from('profile').update({ nickname: newNickname }).eq('id', userId);

      if (error) {
        setError('닉네임 업데이트 중 오류가 발생했습니다.');
      } else {
        router.push('/mypage');
      }
    } catch (updateError) {
      console.error('닉네임 업데이트 중 오류가 발생했습니다:', updateError);
      setError('닉네임 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2 p-6">
      <div className="flex items-center space-x-2">
        <h1 className="font-bold text-xl">{nickname || 'guest'}님</h1>
        <span className="text-l font-normal">의 내 정보입니다.</span>
      </div>

      <p className="mt-2">이름</p>
      <input
        type="text"
        placeholder="수정 닉네임을 입력해 주세요."
        value={newNickname || ''}
        onChange={(e) => setNewNickname(e.target.value)}
        required
        className="h-auto w-[326px] border border-defaultcolor p-3"
      />
      <button onClick={onHandleUpdate} className="h-auto w-[326px] bg-defaultcolor p-3 font-bold text-gray-500">
        수정완료
      </button>
      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
