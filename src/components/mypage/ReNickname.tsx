import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Buttons/Button';
import Icon from '../common/Icons/Icon';
import useModal from '@/hooks/useModal';
import supabase from '@/utils/supabase/client';

const ReNickname = () => {
  const { openModal, Modal, closeModal } = useModal();
  // const { handleSubmit } = useForm();
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parentFocused, setParentFocused] = useState(false);
  const [tempNickname, setTempNickname] = useState<string | null>(nickname);

  useEffect(() => {
    const fetchNickname = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        const userId = sessionData.session.user.id;
        const { data, error } = await supabase.from('profile').select('nickname').eq('id', userId).single();

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
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) return;

      const userId = sessionData.session.user.id;
      const nicknameToSave = tempNickname?.trim() || nickname;

      const { error } = await supabase.from('profile').update({ nickname: nicknameToSave }).eq('id', userId);

      if (error) {
        setError('닉네임 업데이트 중 오류가 발생했습니다.');
      } else {
        setNickname(nicknameToSave); // 닉네임 상태 즉시 업데이트
        closeModal();
      }
    } catch (updateError) {
      console.error('닉네임 업데이트 중 오류가 발생했습니다:', updateError);
      setError('닉네임 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-[24px]">{nickname}님</h1>
      <div>
        <button onClick={openModal} className="ml-3 text-[14px] text-gray-500">
          수정하기
        </button>
      </div>

      <Modal>
        <div className="fixed inset-0 m-[18px] flex items-center justify-center">
          <div className="mx-4 w-full max-w-md rounded-[12px] bg-white p-[32px]" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-4 text-[14px] font-semibold">이름을 변경하시겠습니까?</h3>
            <div className="mt-4 w-full whitespace-nowrap">
              <span
                className="flex gap-[6px] rounded-[12px] border border-[#B5B5B5] px-[16px] py-[16px] focus-within:border-[#00688A]"
                onFocus={() => setParentFocused(true)}
                onBlur={() => setParentFocused(false)}
              >
                <Icon name="UserIcon" color={`${parentFocused ? '#00688A' : '#9C9C9C'}`} />
                <input
                  type="text"
                  placeholder="변경할 이름을 입력해주세요"
                  className="w-full bg-transparent text-[14px] outline-none group-focus-within:text-[#00688A]"
                  value={tempNickname || ''}
                  onChange={(e) => setTempNickname(e.target.value)} // tempNickname에만 반영
                />
              </span>
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
