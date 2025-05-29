import { useEffect, useState } from 'react';

import { createList, getAllLists } from '@/queries/lists';
import { getAllTasks } from '@/queries/tasks';
import { useBoundStore } from '@/store/useBoundStore';

export const useSplashScreen = (): { isLoaded: boolean } => {
  const setLists = useBoundStore((state) => state.setAllLists);
  const setTasks = useBoundStore((state) => state.setAllTasks);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const listsPromise = (async () => {
        let lists = await getAllLists();
        if (lists.length === 0) {
          await createList('Home');
          lists = await getAllLists();
        }
        setLists(lists);
      })();

      const tasksPromise = (async () => {
        const tasks = await getAllTasks();
        setTasks(tasks);
      })();

      await Promise.allSettled([listsPromise, tasksPromise]);
      setIsLoaded(true);
    };

    loadData();
  }, []);

  return { isLoaded };
};
