import { create } from "zustand";

export const useAccountStore = create<IAccountStore>((set) => ({

  isSidebarOpen:false,
  isLoggedIn: false,
  account: undefined,
  setAccount: (user): void => set({ account: user }),
  setIsLoggedIn: (value): void => set({ isLoggedIn: value }),
  setOpenSidebar:(value):void =>set({isSidebarOpen:value}),
}))