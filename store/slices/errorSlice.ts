import { StateCreator } from 'zustand';

import { BoundStore } from '@/store/useBoundStore';

interface ErrorProps {
  message: string;
}

export interface ErrorSlice {
  error?: ErrorProps;
  showGlobalError: (props: ErrorProps) => void;
}

export const createErrorSlice: StateCreator<BoundStore, [], [], ErrorSlice> = (set, get) => ({
  error: undefined,
  showGlobalError: (error) => set({ error }),
});
