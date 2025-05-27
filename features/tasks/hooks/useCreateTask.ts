import { useState } from 'react';

import { TaskCreateSchema } from '../schema';

import { createTask, getRecentTasks } from '@/queries/tasks';
import { useBoundStore } from '@/store/useBoundStore';
import { SharedTask } from '@/types';

export const useCreateTask = () => {
  const addTask = useBoundStore((state) => state.addTask);
  const removeTask = useBoundStore((state) => state.removeTask);
  const [isFinished, setIsFinished] = useState(false);

  const createTaskFn = async (newTask: TaskCreateSchema) => {
    const task: SharedTask = {
      ...newTask,
      id: Date.now(), // Temporary ID until getting id from server side.
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
    setIsFinished(true);

    createTask(newTask)
      .then(async () => {
        removeTask(task.id);
        const item = await getRecentTasks(1);
        addTask(item[0]);
      })
      .catch(() => {
        removeTask(task.id);
      });
  };

  return {
    createTask: createTaskFn,
    isFinished,
    toggleIsFinished: () => setIsFinished(!isFinished),
  };
};
