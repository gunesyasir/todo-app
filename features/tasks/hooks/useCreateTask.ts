import { useState } from 'react';

import { TaskCreateSchema } from '../schema';

import { createTask } from '@/queries/tasks';
import { AppTask } from '@/store/slices/taskSlice';
import { useBoundStore } from '@/store/useBoundStore';

export const useCreateTask = () => {
  const addTask = useBoundStore((state) => state.addTask);
  const removeTask = useBoundStore((state) => state.removeTask);
  const [isCompleted, setIsCompleted] = useState(false);

  const createTaskFn = async (newTask: TaskCreateSchema) => {
    const task: AppTask = {
      ...newTask,
      name: newTask.name,
      description: newTask.description !== undefined ? newTask.description : null,
      image: newTask.image !== undefined ? newTask.image : null,
      due_date: newTask.due_date !== undefined ? newTask.due_date : null,
      status: newTask.status !== undefined ? newTask.status : null,
      priority: newTask.priority !== undefined ? newTask.priority : null,
      is_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    // Optimistically add task to store and set completed as true.
    addTask(task);
    setIsCompleted(true);

    createTask(newTask)
      .then(() => {})
      .catch(() => {
        removeTask(task);
      });
  };

  return {
    createTask: createTaskFn,
    isCompleted,
  };
};
