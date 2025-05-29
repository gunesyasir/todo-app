import { useState } from 'react';

import { createList, getRecentLists } from '@/queries/lists';
import { useBoundStore } from '@/store/useBoundStore';
import { List } from '@/types';

export const useCreateListScreen = () => {
  const {
    lists,
    addList: addListStore,
    removeList: removeListStore,
    showGlobalError,
  } = useBoundStore((state) => state);
  const [text, setText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const onSave = async () => {
    if (!text.trim()) {
      setErrorMessage('Please enter a list name.');
      return;
    }

    if (lists.some((list) => list.name === text.trim())) {
      setErrorMessage('This list already exists, please choose another name.');
      return;
    }

    const tempId = Date.now();
    const optimisticList: List = {
      id: tempId, // Temporary ID until getting id from server side.
      name: text,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    addListStore(optimisticList);
    setIsCompleted(true);

    try {
      await createList(text);
      const recents = await getRecentLists(1);

      addListStore(recents[0]);
    } catch {
      showGlobalError({ message: 'Failed to create list.' });
    } finally {
      removeListStore(tempId);
    }
  };

  return {
    text,
    setText,
    errorMessage,
    setErrorMessage,
    isCompleted,
    onSave,
  };
};
