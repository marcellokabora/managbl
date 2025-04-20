import { create } from 'zustand';

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

export const useCreateAccountStore = create<CreateAccountState>((set) => ({
    ...initialState,
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setIsMagicLink: (isMagicLink) => set({ isMagicLink }),
    reset: () => set(initialState),
})); 