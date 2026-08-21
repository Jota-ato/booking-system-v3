import { User } from "@/db/types/index.types";
import { create } from "zustand";
import { UserInput } from "../schemes/user-schemes";

interface AccountStore {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
}));
