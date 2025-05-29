import { StateCreator } from 'zustand';

import { BoundStore } from '@/store/useBoundStore';
import { Task } from '@/types';

export interface TaskSlice {
  tasks: Task[];
  setAllTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, props: Partial<Task>) => void;
}

export const createTaskSlice: StateCreator<BoundStore, [], [], TaskSlice> = (set, get) => ({
  tasks: [],
  setAllTasks: (tasks: Task[]) => set({ tasks }),
  addTask: (task: Task) => set({ tasks: [...get().tasks, task] }),
  removeTask: (id: number) => set({ tasks: get().tasks.filter((item) => item.id !== id) }),
  updateTask: (id: number, props: Partial<Task>) =>
    set({ tasks: get().tasks.map((item) => (item.id === id ? { ...item, ...props } : item)) }),
});
