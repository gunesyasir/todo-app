import { SharedTask } from '@/store/slices/taskSlice';
import { useBoundStore } from '@/store/useBoundStore';
import { getFormattedDayName } from '@/utils/dateUtils';

interface UpcomingTasksScreenProps {
  sectionListData: (string | SharedTask)[];
}

export const useUpcomingTasksScreen = (): UpcomingTasksScreenProps => {
  const tasks: SharedTask[] = useBoundStore((state) => state.tasks);

  const data: Record<string, SharedTask[]> = tasks.reduce(
    (groups, task) => {
      const dateString = task.created_at.split('T')[0];
      if (!groups[dateString]) groups[dateString] = [];
      groups[dateString].push(task);
      return groups;
    },
    {} as Record<string, SharedTask[]>
  );

  const sectionListData: (string | SharedTask)[] = Object.entries(data).flatMap(
    ([dateString, taskList]) => {
      const formattedHeader = getFormattedDayName(dateString);
      return [formattedHeader, ...taskList];
    }
  );

  return {
    sectionListData,
  };
};
