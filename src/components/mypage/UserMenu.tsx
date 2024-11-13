import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useModal from '@/hooks/useModal';
import browserClient from '@/utils/supabase/client';
import useUserId from '@/hooks/useUserId';
import Icon from '../common/Icons/Icon';

interface UserMenuType {
  initialNickname: string;
  isLoggedIn: boolean;
  nickname: string;
  tempNickname: string;
}

const UserMenu = ({ initialNickname }: UserMenuType) => {
  const router = useRouter();
  const { openModal, Modal, closeModal } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState(initialNickname);
  const [tempNickname, setTempNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userId = useUserId();

  useEffect(() => {
    const checkUserStatus = async () => {
      const {
        data: { user }
      } = await browserClient.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        const { data, error } = await browserClient.from('profile').select('nickname').eq('id', user.id).single();
        if (data) {
          setNickname(data.nickname);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkUserStatus();

    const { data: authListener } = browserClient.auth.onAuthStateChange(() => {
      checkUserStatus();
    });

    return () => {
      // authListener?.unsubscribe();
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await browserClient.auth.signOut();
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    router.push('/login');
  };

  const handleOpenModal = () => {
    setTempNickname(nickname);
    setError(null);
    openModal();
  };

  const handleNameChange = async () => {
    try {
      const trimmedNickname = tempNickname.trim();
      if (!trimmedNickname) {
        setError('닉네임을 입력해주세요.');
        return;
      }

      const { error } = await browserClient.from('profile').update({ nickname: trimmedNickname }).eq('id', userId);

      if (error) {
        setError('닉네임 업데이트 중 오류가 발생했습니다.');
      } else {
        setNickname(trimmedNickname);
        closeModal();
      }
    } catch (updateError) {
      console.error('닉네임 업데이트 중 오류가 발생했습니다:', updateError);
      setError('닉네임 업데이트 중 오류가 발생했습니다.');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="relative">
        <button onClick={toggleDropdown} className="text-sm font-normal text-gray-700">
          <span className="flex flex-row text-lg font-semibold text-black">
            {nickname}
            <p className="ml-1 mt-[2.5px] text-base font-normal text-black"> 님</p>
          </span>
        </button>
        {isDropdownOpen && (
          <div className="shadow-md absolute right-0 mt-2 w-48 rounded-md bg-white py-3">
            <Link href="/stamp-all" className="block px-4 py-2 text-gray-700">
              지금까지 모은 스탬프
            </Link>
            <Link href="/stamp-map" className="block px-4 py-2 text-gray-700">
              나의 발자취
            </Link>
            <Link href="/photo-album" className="block px-4 py-2 text-gray-700">
              나의 추억들
            </Link>
            <Link href="/book-mark" className="block px-4 py-2 text-gray-700">
              내가 찜한 여행지
            </Link>
            <button onClick={handleOpenModal} className="block w-full px-4 py-2 text-left text-gray-700">
              닉네임 변경하기
            </button>
            <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-700">
              로그아웃
            </button>
          </div>
        )}

        <Modal>
          <div className="fixed inset-0 m-[18px] flex items-center justify-center">
            <div className="w-[327px] max-w-md rounded-3xl bg-white p-[32px]" onClick={(e) => e.stopPropagation()}>
              <p className="mb-1 text-xl font-semibold text-gray-900">이름을 변경하시겠습니까?</p>
              <p className="text-base text-gray-900">변경할 이름을 입력해주세요.</p>
              <div className="mb-[28px] mt-4 w-full whitespace-nowrap">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
                    <Icon name="UserIcon" color="#004156" />
                  </div>
                  <input
                    type="text"
                    placeholder="변경할 이름을 입력해주세요"
                    value={tempNickname}
                    onChange={(e) => setTempNickname(e.target.value)}
                    className="h-16 w-full max-w-[327px] rounded-xl border border-[#004156] px-12 py-2.5 text-sm font-normal text-[#004156] focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 flex w-full">
                <button
                  onClick={handleNameChange}
                  disabled={!tempNickname}
                  className={`h-16 w-[327px] rounded-xl p-2.5 py-2 font-semiBold text-base ${!tempNickname ? 'bg-gray-400' : 'bg-secondary-500 text-secondary-900'}`}
                >
                  변경하기
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  } else {
    return (
      <Link href="/login" className="text-sm font-normal text-gray-700 hover:font-semibold hover:text-gray-900">
        로그인
      </Link>
    );
  }
};

export default UserMenu;
