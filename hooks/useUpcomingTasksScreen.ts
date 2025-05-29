import { useBoundStore } from '@/store/useBoundStore';
import { Task } from '@/types';
import { getFormattedDayName } from '@/utils/dateUtils';

interface UpcomingTasksScreenProps {
  sectionListData: (string | Task)[];
}

export const useUpcomingTasksScreen = (): UpcomingTasksScreenProps => {
  const tasks: Task[] = useBoundStore((state) => state.tasks);

  const data: Record<string, Task[]> = tasks.reduce(
    (groups, task) => {
      const dateString = task.due_date!.split('T')[0];
      if (!groups[dateString]) groups[dateString] = [];
      groups[dateString].push(task);
      return groups;
    },
    {} as Record<string, Task[]>
  );

  const sectionListData: (string | Task)[] = Object.entries(data).flatMap(
    ([dateString, taskList]) => {
      const formattedHeader = getFormattedDayName(dateString);
      return [formattedHeader, ...taskList];
    }
  );

  return {
    sectionListData,
  };
};
