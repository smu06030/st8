import { ReactPortal } from 'react';
import { useForm } from 'react-hook-form';
import browserClient from '@/utils/supabase/client';
import Button from '../Buttons/Button';
import InputField from '../InputField/InputField';

interface NicknameEditorModalProps {
  Modal: ({ children }: { children: React.ReactNode }) => React.ReactPortal | null;
  closeModal: () => void;
  nickname: string | null;
  setNickname: (nickname: string) => void;
}

const NicknameEditorModal = ({ Modal, closeModal, nickname, setNickname }: NicknameEditorModalProps) => {
  const { register, handleSubmit, formState } = useForm<{ tempNickname: string }>({
    mode: 'onBlur',
    defaultValues: { tempNickname: nickname || '' }
  });

  const handleNameChange = async ({ tempNickname }: { tempNickname: string }) => {
    const user = (await browserClient.auth.getUser()).data?.user;
    if (!user) return;

    const { error } = await browserClient.from('profile').update({ nickname: tempNickname.trim() }).eq('id', user.id);

    if (!error) {
      setNickname(tempNickname.trim());
      closeModal();
    }
  };

  return (
    <Modal>
      <div className="fixed inset-0 m-[18px] flex items-center justify-center">
        <div className="w-[327px] max-w-md rounded-3xl bg-white p-[32px]" onClick={(e) => e.stopPropagation()}>
          <h3 className="font-semiBold text-xl text-gray-900">이름을 변경하시겠습니까?</h3>
          <div className="mb-[28px] mt-4 w-full whitespace-nowrap">
            <InputField
              iconName="UserIcon"
              text="변경할 이름을 입력해주세요"
              placeholder="변경할 이름을 입력해주세요"
              status={formState.errors.tempNickname ? 'error' : 'default'}
              register={register('tempNickname', {
                required: '닉네임을 입력해주세요.',
                maxLength: { value: 20, message: '닉네임은 20자 이하로 입력해주세요.' }
              })}
              error={formState.errors.tempNickname}
            />
          </div>
          <div className="mt-4 flex w-full">
            <Button
              text="변경하기"
              variant={formState.errors.tempNickname ? 'gray' : 'blue'}
              onClick={handleSubmit(handleNameChange)}
              disabled={!!formState.errors.tempNickname}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NicknameEditorModal;
