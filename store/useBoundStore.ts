import { create } from 'zustand';

import { createListSlice, ListSlice } from './slices/listSlice';
import { createTaskSlice, TaskSlice } from './slices/taskSlice';

export type BoundStore = TaskSlice & ListSlice;

export const useBoundStore = create<BoundStore>((...a) => ({
  ...createTaskSlice(...a),
  ...createListSlice(...a),
}));
