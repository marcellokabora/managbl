import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PhoneConfigState {
    announcement: string;
    forwardingNumber: string;
    isTested: boolean;
    setAnnouncement: (announcement: string) => void;
    setForwardingNumber: (number: string) => void;
    setIsTested: (isTested: boolean) => void;
    reset: () => void;
}

const initialState = {
    announcement: '',
    forwardingNumber: '',
    isTested: false,
};

export const usePhoneConfigStore = create<PhoneConfigState>()(
    persist(
        (set) => ({
            ...initialState,
            setAnnouncement: (announcement) => set({ announcement }),
            setForwardingNumber: (forwardingNumber) => set({ forwardingNumber }),
            setIsTested: (isTested) => set({ isTested }),
            reset: () => set(initialState),
        }),
        {
            name: 'phone-config-storage',
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
); 