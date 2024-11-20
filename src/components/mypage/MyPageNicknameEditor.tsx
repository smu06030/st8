import { useEffect } from 'react';

import browserClient from '@/utils/supabase/client';

interface NicknameEditorProps {
  nickname: string | null;
  setNickname: (nickname: string) => void;
  openModal: () => void;
}

const NicknameEditor = ({ nickname, setNickname, openModal }: NicknameEditorProps) => {
  useEffect(() => {
    const fetchNickname = async () => {
      const {
        data: { user }
      } = await browserClient.auth.getUser();
      if (user) {
        const userId = user.id;
        const { data } = await browserClient.from('profile').select('nickname').eq('id', userId).single();
        if (data?.nickname) {
          setNickname(data.nickname);
        }
      }
    };
    fetchNickname();
  }, [setNickname]);

  return (
    <div className="flex items-center justify-between">
      <h1 className="mr-[8px] mt-[34px] font-semiBold text-2xl text-gray-900">{nickname}님</h1>
      <button onClick={openModal} className="mt-[34px] text-sm text-gray-500">
        수정하기
      </button>
    </div>
  );
};

export default NicknameEditor;
