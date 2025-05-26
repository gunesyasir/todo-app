import { StateCreator } from 'zustand';

import { BoundStore } from '@/store/useBoundStore';
import { List } from '@/types';

export interface ListSlice {
  lists: List[];
  setAllLists: (lists: List[]) => void;
}

export const createListSlice: StateCreator<BoundStore, [], [], ListSlice> = (set, get) => ({
  lists: [],
  setAllLists: (lists: List[]) => set({ lists }),
});
