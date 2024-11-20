export interface NicknameEditorProps {
  nickname: string | null;
  setNickname: (nickname: string) => void;
  openModal: () => void;
}

export interface RecentPhotoProps {
  limit?: number;
  containerStyle?: string;
}

export interface UserMenuType {
  initialNickname: string;
  isLoggedIn: boolean;
  nickname: string;
  tempNickname: string;
  checkUserStatus: string;
}
