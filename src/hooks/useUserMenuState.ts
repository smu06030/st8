import { useEffect, useState, useRef } from 'react';
import browserClient from '@/utils/supabase/client';
import useUserId from '@/hooks/auth/useUserId';

const useUserMenuState = (initialNickname: string) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState(initialNickname);
  const [tempNickname, setTempNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const nicknameEditRef = useRef<HTMLDivElement>(null);
  const userId = useUserId();

  useEffect(() => {
    const checkUserStatus = async () => {
      const { data } = await browserClient.auth.getUser();
      const user = data?.user;

      if (user) {
        setIsLoggedIn(true);
        const { data: profile } = await browserClient.from('profile').select('nickname').eq('id', user.id).single();

        if (profile?.nickname) setNickname(profile.nickname);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUserStatus();
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  const openNicknameEditor = () => {
    setTempNickname(nickname);
    setError(null);
    setIsEditingNickname(true);
  };
  const closeNicknameEditor = () => setIsEditingNickname(false);

  const handleNameChange = async () => {
    if (!tempNickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    const trimmedNickname = tempNickname.trim();
    const { error } = await browserClient.from('profile').update({ nickname: trimmedNickname }).eq('id', userId);

    if (error) {
      setError('닉네임 업데이트 중 오류가 발생했습니다.');
    } else {
      setNickname(trimmedNickname);
      closeNicknameEditor();
    }
  };

  return {
    isLoggedIn,
    nickname,
    tempNickname,
    error,
    isDropdownOpen,
    isEditingNickname,
    dropdownRef,
    nicknameEditRef,
    toggleDropdown,
    closeDropdown,
    openNicknameEditor,
    closeNicknameEditor,
    setTempNickname,
    handleNameChange
  };
};

export default useUserMenuState;
