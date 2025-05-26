import { useEffect, useState } from 'react';

import { createList, getAllLists } from '@/queries/lists';
import { useBoundStore } from '@/store/useBoundStore';

export const useSplash = () => {
  const setLists = useBoundStore((state) => state.setAllLists);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      let lists = await getAllLists();

      if (lists.length === 0) {
        // Creating default list in case no list exists.
        await createList('Home');
        lists = await getAllLists();
      }

      console.log('useSplash lists : ', lists);
      setLists(lists);

      setIsLoaded(true);
    };

    loadData();
  }, []);

  return { isLoaded };
};
