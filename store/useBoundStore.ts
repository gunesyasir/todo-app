import { create } from 'zustand';

import { createListSlice, ListSlice } from './slices/listSlice';
import { createTaskSlice, TaskSlice } from './slices/taskSlice';

import { createErrorSlice, ErrorSlice } from '@/store/slices/errorSlice';

export type BoundStore = TaskSlice & ListSlice & ErrorSlice;

export const useBoundStore = create<BoundStore>((...a) => ({
  ...createTaskSlice(...a),
  ...createListSlice(...a),
  ...createErrorSlice(...a),
}));
