import { StateCreator } from 'zustand';

import { BoundStore } from '@/store/useBoundStore';
import { Task } from '@/types';

type AppTask = Omit<Task, 'id'>;
export type SharedTask = AppTask | Task;

export interface TaskSlice {
  tasks: SharedTask[];
  setAllTasks: (tasks: SharedTask[]) => void;
  addTask: (task: SharedTask) => void;
  removeTask: (task: SharedTask) => void;
}

export const createTaskSlice: StateCreator<BoundStore, [], [], TaskSlice> = (set, get) => ({
  tasks: [],
  setAllTasks: (tasks: SharedTask[]) => set({ tasks }),
  addTask: (task: SharedTask) => set({ tasks: [...get().tasks, task] }),
  removeTask: (task: SharedTask) =>
    set({ tasks: get().tasks.filter((item) => item.created_at !== task.created_at) }),
});
