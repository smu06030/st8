import React, { useEffect, useState } from 'react';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Buttons/Button';
import Icon from '@/components/common/Icons/Icon';
import useModal from '@/hooks/useModal';
import supabase from '@/utils/supabase/client';

const ReNickname = () => {
  const { openModal, Modal, closeModal } = useModal();
  const [nickname, setNickname] = useState<string | null>(null); // 현재 닉네임 상태
  const [newNickname, setNewNickname] = useState<string | null>(nickname || ''); // 수정할 닉네임 상태
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 닉네임을 처음 가져오기
    const fetchNickname = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        const userId = sessionData.session.user.id;
        const { data, error } = await supabase.from('profile').select('nickname').eq('id', userId).single();

        if (error) {
          setError('닉네임을 가져오는 중 오류가 발생했습니다.');
        } else {
          setNickname(data.nickname);
          setNewNickname(data.nickname); // 처음에 닉네임을 초기값으로 설정
        }
      }
    };
    fetchNickname();
  }, []);

  const handleNameChange = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) return;

      const userId = sessionData.session.user.id;
      const nicknameToSave = newNickname?.trim() || nickname;

      const { error } = await supabase.from('profile').update({ nickname: nicknameToSave }).eq('id', userId);

      if (error) {
        setError('닉네임 업데이트 중 오류가 발생했습니다.');
      } else {
        setNickname(nicknameToSave); // 닉네임 상태 즉시 업데이트
        setNewNickname(nicknameToSave); // 업데이트된 닉네임을 입력 필드에 반영
        closeModal(); // 모달 닫기
      }
    } catch (updateError) {
      console.error('닉네임 업데이트 중 오류가 발생했습니다:', updateError);
      setError('닉네임 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-[24px]">{nickname ? nickname : 'guest'}님</h1>
      <div>
        <button onClick={openModal} className="ml-3 text-[14px] text-gray-500">
          수정하기
        </button>
      </div>

      <Modal>
        <div className="fixed inset-0 m-[32px] flex items-center justify-center">
          <div className="w-full rounded-[12px] bg-white p-[32px]" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-4 text-lg font-semibold">이름을 변경하시겠습니까?</h3>

            <InputField
              icon={<Icon name="UserIcon" />}
              label="변경할 이름을 입력해주세요"
              placeholder=""
              type="text"
              value={newNickname || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewNickname(e.target.value)}
            />

            <div className="mt-4 flex">
              <Button
                label="변경하기"
                variant={newNickname ? 'yellow' : 'gray'}
                onClick={handleNameChange}
                disabled={!newNickname}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReNickname;
