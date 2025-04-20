import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CreateAccountState {
    email: string;
    password: string;
    isMagicLink: boolean;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setIsMagicLink: (isMagicLink: boolean) => void;
    reset: () => void;
}

const initialState = {
    email: '',
    password: '',
    isMagicLink: false,
};

export const useCreateAccountStore = create<CreateAccountState>()(
    persist(
        (set) => ({
            ...initialState,
            setEmail: (email) => set({ email }),
            setPassword: (password) => set({ password }),
            setIsMagicLink: (isMagicLink) => set({ isMagicLink }),
            reset: () => set(initialState),
        }),
        {
            name: 'create-account-storage',
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
); 