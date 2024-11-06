import React, { useEffect, useState } from 'react';
import Button from '../common/Buttons/Button';
import InputField from '@/components/common/InputField';
import useModal from '@/hooks/useModal';
import browserClient from '@/utils/supabase/client';

const ReNickname = () => {
  const { openModal, Modal, closeModal } = useModal();
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tempNickname, setTempNickname] = useState<string | null>(nickname);
  const [inputStatus, setInputStatus] = useState<'default' | 'active' | 'done'>('default');

  useEffect(() => {
    const fetchNickname = async () => {
      const { data: sessionData } = await browserClient.auth.getSession();
      if (sessionData?.session) {
        const userId = sessionData.session.user.id;
        const { data, error } = await browserClient.from('profile').select('nickname').eq('id', userId).single();

        if (error) {
          setError('닉네임을 가져오는 중 오류가 발생했습니다.');
        } else {
          setNickname(data.nickname);
          setTempNickname(data.nickname); // 닉네임을 초기 tempNickname으로 설정
        }
      }
    };
    fetchNickname();
  }, []);

  const handleNameChange = async () => {
    try {
      const { data: sessionData } = await browserClient.auth.getSession();
      if (!sessionData?.session) return;

      const userId = sessionData.session.user.id;
      const nicknameToSave = tempNickname?.trim() || nickname;

      const { error } = await browserClient.from('profile').update({ nickname: nicknameToSave }).eq('id', userId);

      if (error) {
        setError('닉네임 업데이트 중 오류가 발생했습니다.');
      } else {
        setNickname(nicknameToSave);
        setInputStatus('done'); // 업데이트 성공 시 상태를 done으로 설정
        closeModal();
      }
    } catch (updateError) {
      console.error('닉네임 업데이트 중 오류가 발생했습니다:', updateError);
      setError('닉네임 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="mr-[8px] mt-[34px] text-2xl font-semibold">{nickname}님</h1>
      <div>
        <button onClick={openModal} className="mt-[34px] text-sm text-gray-500">
          수정하기
        </button>
      </div>

      <Modal>
        <div className="fixed inset-0 m-[18px] flex items-center justify-center">
          <div className="w-[327px] max-w-md rounded-3xl bg-white p-[32px]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold">이름을 변경하시겠습니까?</h3>
            <div className="mt-4 w-full whitespace-nowrap">
              <InputField
                iconName="UserIcon"
                text="변경할 이름을 입력해주세요"
                placeholder="변경할 이름을 입력해주세요"
                value={tempNickname || ''}
                onChange={(e) => {
                  setTempNickname(e.target.value);
                  setInputStatus('active');
                }}
                onBlur={() => setInputStatus(tempNickname ? 'done' : 'default')} // 입력 완료 시 상태 변경
                status={inputStatus}
              />
            </div>
            <div className="mt-4 flex w-full">
              <Button
                text="변경하기"
                variant={tempNickname ? 'blue' : 'gray'}
                onClick={handleNameChange}
                disabled={!tempNickname}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReNickname;
