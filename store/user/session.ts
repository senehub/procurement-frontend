import { UserStoreSession } from "@/types/global";
import { create } from "zustand";

type UserStore = {
  userId?: string;
  session?: UserStoreSession;
  readonly clearStore: () => void;
  readonly setUserId: (userId: string) => void;
  readonly setSession: (session: UserStoreSession) => void;
};

export const userStore = create<UserStore>((set) => ({
  clearStore: () => set({ userId: undefined, session: undefined }),

  setUserId: (userId) => set({ userId }),

  setSession: (session) => set({ session }),
}));
