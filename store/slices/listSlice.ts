import { StateCreator } from 'zustand';

import { BoundStore } from '@/store/useBoundStore';
import { List } from '@/types';

export interface ListSlice {
  lists: List[];
  setAllLists: (lists: List[]) => void;
  addList: (list: List) => void;
  removeList: (id: number) => void;
}

export const createListSlice: StateCreator<BoundStore, [], [], ListSlice> = (set, get) => ({
  lists: [],
  setAllLists: (lists: List[]) => set({ lists }),
  addList: (list: List) => set({ lists: [...get().lists, list] }),
  removeList: (id: number) => set({ lists: get().lists.filter((item) => item.id !== id) }),
});
