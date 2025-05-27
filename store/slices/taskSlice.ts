import { StateCreator } from 'zustand';

import { BoundStore } from '@/store/useBoundStore';
import { SharedTask } from '@/types';

export interface TaskSlice {
  tasks: SharedTask[];
  setAllTasks: (tasks: SharedTask[]) => void;
  addTask: (task: SharedTask) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, props: Partial<SharedTask>) => void;
}

export const createTaskSlice: StateCreator<BoundStore, [], [], TaskSlice> = (set, get) => ({
  tasks: [],
  setAllTasks: (tasks: SharedTask[]) => set({ tasks }),
  addTask: (task: SharedTask) => set({ tasks: [...get().tasks, task] }),
  removeTask: (id: number) => set({ tasks: get().tasks.filter((item) => item.id !== id) }),
  updateTask: (id: number, props: Partial<SharedTask>) =>
    set({ tasks: get().tasks.map((item) => (item.id === id ? { ...item, ...props } : item)) }),
});
