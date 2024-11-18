import { useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icons/Icon';
import LogoutModal from '@/components/common/Modal/LogoutModal';
import useModal from '@/hooks/modal/useModal';
import useUserMenuState from '@/hooks/useUserMenuState';

interface UserMenuType {
  initialNickname: string;
  isLoggedIn: boolean;
  nickname: string;
  tempNickname: string;
  checkUserStatus: string;
}

const UserMenu = ({ initialNickname }: UserMenuType) => {
  const {
    isLoggedIn,
    nickname,
    tempNickname,
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
  } = useUserMenuState(initialNickname);

  const { openModal, closeModal, Modal } = useModal();

  const handleLogoutClick = () => {
    openModal();
    closeDropdown();
  };

  // 배경 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (dropdownRef.current?.contains(target) || nicknameEditRef.current?.contains(target)) {
        return;
      }

      closeDropdown(); // 드롭다운 닫기
      closeNicknameEditor(); // 닉네임 수정 모달 닫기
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown, closeNicknameEditor, dropdownRef, nicknameEditRef]);

  if (!isLoggedIn) {
    return (
      <Link href="/login" className="text-sm font-normal text-gray-700 hover:font-semibold hover:text-gray-900">
        로그인
      </Link>
    );
  }

  return (
    <div className="relative flex items-start space-x-4">
      <button onClick={toggleDropdown} className="text-sm font-normal text-gray-700">
        <span className="flex flex-row text-lg font-semibold text-black">
          {nickname}
          <p className="ml-1 mt-[2.5px] text-base font-normal text-black"> 님</p>
        </span>
      </button>

      {isDropdownOpen && (
        <div ref={dropdownRef} className="absolute right-0 mt-12 w-48 rounded-2xl bg-white py-4 shadow-headerShadow">
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
          <button onClick={openNicknameEditor} className="block w-full px-4 py-2 text-left text-gray-700">
            닉네임 변경하기
          </button>
          <button onClick={handleLogoutClick} className="block w-full px-4 py-2 text-left text-red-700">
            로그아웃
          </button>
        </div>
      )}

      <Modal>
        <LogoutModal closeModal={closeModal} />
      </Modal>

      {isEditingNickname && (
        <div
          ref={nicknameEditRef}
          className="absolute right-[194px] top-0 mt-12 w-80 rounded-2xl bg-white p-6 shadow-headerShadow"
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
                value={tempNickname}
                placeholder="변경할 이름을 입력해주세요"
                onChange={(e) => setTempNickname(e.target.value)}
                className="h-16 w-full rounded-xl border border-[#004156] px-12 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleNameChange}
            disabled={!tempNickname.trim()}
            className={`h-16 w-full rounded-xl font-semibold ${
              !tempNickname.trim() ? 'bg-gray-400' : 'bg-secondary-500 text-secondary-900'
            }`}
          >
            변경하기
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
