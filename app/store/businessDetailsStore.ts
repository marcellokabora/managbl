import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BusinessDetailsState {
    businessName: string;
    phoneNumber: string;
    numberOfUnits: number;
    businessType: string;
    setBusinessName: (name: string) => void;
    setPhoneNumber: (phone: string) => void;
    setNumberOfUnits: (units: number) => void;
    setBusinessType: (type: string) => void;
    reset: () => void;
}

const initialState = {
    businessName: '',
    phoneNumber: '',
    numberOfUnits: 0,
    businessType: '',
};

export const useBusinessDetailsStore = create<BusinessDetailsState>()(
    persist(
        (set) => ({
            ...initialState,
            setBusinessName: (name) => set({ businessName: name }),
            setPhoneNumber: (phone) => set({ phoneNumber: phone }),
            setNumberOfUnits: (units) => set({ numberOfUnits: units }),
            setBusinessType: (type) => set({ businessType: type }),
            reset: () => set(initialState),
        }),
        {
            name: 'business-details-storage',
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
); 