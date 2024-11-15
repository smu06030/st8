import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

import Link from 'next/link';
import Icon from '../common/Icons/Icon';
import useUserId from '@/hooks/auth/useUserId';
import browserClient from '@/utils/supabase/client';

interface UserMenuType {
  initialNickname: string;
  isLoggedIn: boolean;
  nickname: string;
  tempNickname: string;
  checkUserStatus: string;
}

const UserMenu = ({ initialNickname }: UserMenuType) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState(initialNickname);
  const [tempNickname, setTempNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const userId = useUserId();

  const nicknameEditRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      const {
        data: { user }
      } = await browserClient.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        const { data } = await browserClient.from('profile').select('nickname').eq('id', user.id).single();
        if (data) {
          setNickname(data.nickname);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkUserStatus();
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

  const handleOpenNicknameEdit = () => {
    setTempNickname(nickname);
    setError(null);
    setIsEditingNickname(true);
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
        setIsEditingNickname(false);
      }
    } catch (updateError) {
      console.error('닉네임 업데이트 중 오류가 발생했습니다:', updateError);
      setError('닉네임 업데이트 중 오류가 발생했습니다.');
    }
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (nicknameEditRef.current && !nicknameEditRef.current.contains(event.target as Node)) {
        setIsEditingNickname(false);
      }
    };

    if (isEditingNickname) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditingNickname]);

  if (isLoggedIn) {
    return (
      <div className="relative flex items-start space-x-4">
        <button onClick={toggleDropdown} className="text-sm font-normal text-gray-700">
          <span className="flex flex-row text-lg font-semibold text-black">
            {nickname}
            <p className="ml-1 mt-[2.5px] text-base font-normal text-black"> 님</p>
          </span>
        </button>

        {isDropdownOpen && (
          <div className="shadow-md absolute right-0 mt-12 w-48 rounded-2xl bg-white py-4">
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
            <button onClick={handleOpenNicknameEdit} className="block w-full px-4 py-2 text-left text-gray-700">
              닉네임 변경하기
            </button>
            <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-700">
              로그아웃
            </button>
          </div>
        )}

        {isEditingNickname && (
          <div
            ref={nicknameEditRef}
            className="shadow-md absolute right-[194px] top-0 mt-12 w-80 rounded-2xl bg-white p-6"
          >
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
            <button
              onClick={handleNameChange}
              disabled={!tempNickname}
              className={`h-16 w-full rounded-xl p-2.5 py-2 font-semiBold text-base ${
                !tempNickname ? 'bg-gray-400' : 'bg-secondary-500 text-secondary-900'
              }`}
            >
              변경하기
            </button>
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
        )}
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
