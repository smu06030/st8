import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Buttons/Button';
import useModal from '@/hooks/useModal';
import browserClient from '@/utils/supabase/client';
import InputField from '../common/InputField/InputField';

const NicknameEditor = () => {
  const { openModal, Modal, closeModal } = useModal();
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<{ tempNickname: string }>({
    mode: 'onBlur'
  });

  useEffect(() => {
    const fetchNickname = async () => {
      const {
        data: { user }
      } = await browserClient.auth.getUser();
      if (user) {
        const userId = user.id;
        const { data, error } = await browserClient.from('profile').select('nickname').eq('id', userId).single();
        if (user.app_metadata.provider !== 'email') {
          if (!data && nickname == null) {
            const email = user.user_metadata.email;
            const nickname = user.user_metadata.name;
            const { error: insertError } = await browserClient
              .from('profile')
              .insert([{ id: userId, email, nickname }]);

            setNickname(nickname);
            setValue('tempNickname', nickname || '');
            if (insertError) {
            }
          }
        }

        if (error) {
          setError('닉네임을 가져오는 중 오류가 발생했습니다.');
        } else {
          setNickname(data.nickname);
          setValue('tempNickname', data.nickname || '');
        }
      }
    };
    fetchNickname();
  }, [setValue, nickname]);

  const handleNameChange = async (formData: { tempNickname: string }) => {
    try {
      const {
        data: { user }
      } = await browserClient.auth.getUser();
      if (!user) return;

      const userId = user.id;
      const nicknameToSave = formData.tempNickname.trim();

      const { error } = await browserClient.from('profile').update({ nickname: nicknameToSave }).eq('id', userId);

      if (error) {
        setError('닉네임 업데이트 중 오류가 발생했습니다.');
      } else {
        setNickname(nicknameToSave);
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
            <div className="mb-[28px] mt-4 w-full whitespace-nowrap">
              <InputField
                iconName="UserIcon"
                text="변경할 이름을 입력해주세요"
                placeholder="변경할 이름을 입력해주세요"
                status={errors.tempNickname ? 'error' : 'default'}
                register={register('tempNickname', {
                  required: '닉네임을 입력해주세요.',
                  maxLength: { value: 20, message: '닉네임은 20자 이하로 입력해주세요.' }
                })}
                error={errors.tempNickname}
              />
            </div>
            <div className="mt-4 flex w-full">
              <Button
                text="변경하기"
                variant={errors.tempNickname ? 'gray' : 'blue'}
                onClick={handleSubmit(handleNameChange)}
                disabled={!!errors.tempNickname}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NicknameEditor;
