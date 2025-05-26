import { StateCreator } from 'zustand';

import { BoundStore } from '@/store/useBoundStore';
import { Task } from '@/types';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type AppTask = PartialBy<Task, 'id'>; // Type without id prop

export interface TaskSlice {
  tasks: AppTask[];
  setAllTasks: (tasks: AppTask[]) => void;
  addTask: (task: AppTask) => void;
  removeTask: (task: AppTask) => void;
}

export const createTaskSlice: StateCreator<BoundStore, [], [], TaskSlice> = (set, get) => ({
  tasks: [],
  setAllTasks: (tasks: AppTask[]) => set({ tasks }),
  addTask: (task: AppTask) => set({ tasks: [...get().tasks, task] }),
  removeTask: (task: AppTask) =>
    set({ tasks: get().tasks.filter((item) => item.created_at !== task.created_at) }),
});
