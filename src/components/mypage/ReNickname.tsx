import { useController, useForm } from 'react-hook-form';
import Button from '../common/Buttons/Button';
import InputField from '../common/InputField';
import Icon from '../common/Icons/Icon';
import { useEffect, useState } from 'react';
import useModal from '@/hooks/useModal';
import supabase from '@/utils/supabase/client';

const ReNickname = () => {
  const { openModal, Modal, closeModal } = useModal();
  const { control, handleSubmit } = useForm();
  const [nickname, setNickname] = useState<string | null>(null); // 현재 닉네임 상태
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
        }
      }
    };
    fetchNickname();
  }, []);

  const { field } = useController({
    name: 'nickname',
    control,
    defaultValue: nickname || ''
  });

  const handleNameChange = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) return;

      const userId = sessionData.session.user.id;
      const nicknameToSave = field.value.trim();

      const { error } = await supabase.from('profile').update({ nickname: nicknameToSave }).eq('id', userId);

      if (error) {
        setError('닉네임 업데이트 중 오류가 발생했습니다.');
      } else {
        setNickname(nicknameToSave); // 닉네임 상태 즉시 업데이트
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
        <div className="fixed inset-0 m-[18px] flex items-center justify-center">
          <div className="mx-4 w-full max-w-md rounded-[12px] bg-white p-[32px]" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-4 text-[14px] font-semibold">이름을 변경하시겠습니까?</h3>
            <div className="mt-4 w-full whitespace-nowrap">
              <InputField
                icon={<Icon name="UserIcon" />}
                label="변경할 이름을 입력해주세요"
                placeholder=""
                type="text"
                {...field} // useController로 받아온 필드를 펼쳐서 사용
              />
            </div>
            <div className="mt-4 flex w-full">
              <Button
                label="변경하기"
                variant={field.value ? 'blue' : 'gray'}
                onClick={handleNameChange}
                disabled={!field.value}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReNickname;
