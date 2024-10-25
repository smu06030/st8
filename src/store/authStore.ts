import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  email: string;
  nickname: string;
  setUser: (userData: Partial<UserState>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: '',
      nickname: '',

      setUser: (userData: Partial<UserState>) => set((state) => ({ ...state, ...userData })),
      //로그아웃
      clearUser: () => set({ email: '', nickname: '' })
    }),
    {
      name: 'user-storage'
    }
  )
);

export { useUserStore };
export default useUserStore;
