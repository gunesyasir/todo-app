import { useState } from 'react';

import { updateTask } from '@/queries/tasks';
import { useBoundStore } from '@/store/useBoundStore';

type UpdateTask = Partial<{
  name: string;
  description: string;
  image: string;
  status: string;
  priority: string;
  is_completed: boolean;
  due_date: string;
  list_id: number;
}>;

export const useUpdateTask = () => {
  const removeTaskStore = useBoundStore((state) => state.removeTask);
  const updateTaskStore = useBoundStore((state) => state.updateTask);
  const [isFinished, setIsFinished] = useState(false);

  const toggleCompletionFn = async (taskId: number, isCompleted: boolean) => {
    const task: UpdateTask = {
      is_completed: isCompleted,
    };

    updateTaskStore(taskId, task);
    setIsFinished(true);

    updateTask(taskId, task)
      .then(() => {})
      .catch(() => {
        const taskRollback: UpdateTask = {
          is_completed: isCompleted,
        };
        updateTaskStore(taskId, taskRollback);
      });
  };

  const updateTaskFn = async (taskId: number, task: UpdateTask) => {
    // Optimistically update and set completed as true.
    updateTaskStore(taskId, task);
    setIsFinished(true);

    updateTask(taskId, task)
      .then(() => {})
      .catch(() => {
        removeTaskStore(taskId);
        // TODO: Fetch the task again by taskId from server and add to store.
      });
  };

  return {
    updateTask: updateTaskFn,
    toggleIsCompleted: toggleCompletionFn,
    isFinished,
    toggleIsFinished: () => setIsFinished(!isFinished),
  };
};
