import { useState } from 'react';

import { translations } from '@/constants/translations';
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
      setErrorMessage(translations.list.nameEmptyError);
      return;
    }

    if (lists.some((list) => list.name === text.trim())) {
      setErrorMessage(translations.list.alreadyExistError);
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
      showGlobalError({ message: translations.list.creationError });
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
