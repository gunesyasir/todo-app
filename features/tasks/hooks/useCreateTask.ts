import { useState } from 'react';

import { TaskCreateSchema } from '../schema';

import { translations } from '@/constants/translations';
import { createTask, getRecentTasks } from '@/queries/tasks';
import { useBoundStore } from '@/store/useBoundStore';
import { Task } from '@/types';

export const useCreateTask = () => {
  const {
    addTask: addTaskStore,
    removeTask: removeTaskStore,
    showGlobalError,
  } = useBoundStore((state) => state);
  const [isFinished, setIsFinished] = useState(false);

  const createTaskFn = async (newTask: TaskCreateSchema) => {
    const task: Task = {
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
    addTaskStore(task);
    setIsFinished(true);

    createTask(newTask)
      .then(async () => {
        const item = await getRecentTasks(1);
        addTaskStore(item[0]);
      })
      .catch(() => showGlobalError({ message: translations.task.creationError }))
      .finally(() => removeTaskStore(task.id));
  };

  return {
    createTask: createTaskFn,
    isFinished,
    toggleIsFinished: () => setIsFinished(!isFinished),
  };
};
