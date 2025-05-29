import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppInput } from '@/components/AppInput';
import { Divider } from '@/components/Divider';
import { MemoizedSelectionButton } from '@/components/SelectionButton';
import { MemoizedDatePickerModal } from '@/features/tasks/components/DatePickerModal';
import { MemoizedSelectionModal } from '@/features/tasks/components/SelectionModal';
import { Priority, PriorityLabels, Status } from '@/features/tasks/constants';
import { TaskCreateSchema, taskCreateSchema } from '@/features/tasks/schema';
import { useBoundStore } from '@/store/useBoundStore';
import { List } from '@/types';
import { convertFormattedDayNameFromDate } from '@/utils/dateUtils';

type CreateTaskProps = {
  handleCreateTask: (task: TaskCreateSchema) => void;
};

export const CreateTaskForm: React.FC<CreateTaskProps> = ({ handleCreateTask }) => {
  const { lists, showGlobalError } = useBoundStore((state) => state);
  const defaultList = lists[0];

  const [task, setTask] = useState<TaskCreateSchema>({
    name: '',
    description: '',
    image: undefined,
    status: Status.Pending,
    priority: Priority.Medium,
    is_completed: false,
    due_date: new Date().toISOString(),
    list_id: defaultList.id,
  });
  const [taskError, setTaskError] = useState<Record<keyof TaskCreateSchema, string>>({
    name: '',
    description: '',
    image: '',
    status: '',
    priority: '',
    is_completed: '',
    due_date: '',
    list_id: '',
  });

  const dateUTC = task.due_date ? new Date(task.due_date) : new Date();
  const localDate = convertFormattedDayNameFromDate(dateUTC);
  const memoizedDueDate = useMemo(() => {
    return task.due_date ? new Date(task.due_date) : new Date();
  }, [task.due_date]);

  const listName = useMemo(() => {
    return lists.filter((list) => list.id === task.list_id)?.[0]?.name;
  }, [task.list_id, lists]);

  const listOptions = useMemo(
    () =>
      lists.map((list) => ({
        label: list.name,
        value: list,
        keyExtractor: list.id.toString(),
      })),
    []
  );

  const priorityOptions = useMemo(
    () =>
      Object.values(Priority).map((value) => ({
        label: PriorityLabels[value],
        value,
      })),
    []
  );

  const [dueDateModalVisible, setDueDateModalVisible] = useState(false);
  const [listsModalVisible, setListsModalVisible] = useState(false);
  const [priorityModalVisible, setPriorityModalVisible] = useState(false);
  const [savePressed, setSavePressed] = useState(false);

  useEffect(() => {
    if (!savePressed) return;
    setSavePressed(false);

    const entries = Object.entries(taskError).filter(([_, value]) => value !== '');
    if (entries.length === 0) return;

    const firstEntry = entries[0];

    if (firstEntry.length > 0 && firstEntry[1]) {
      showGlobalError({ message: firstEntry[1] });
    }
  }, [taskError, savePressed]);

  const onSavePress = useCallback(() => {
    setSavePressed(true);

    const result = taskCreateSchema.safeParse(task);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      setTaskError({
        name: errors.name?.[0] ?? '',
        description: errors.description?.[0] ?? '',
        image: errors.image?.[0] ?? '',
        status: errors.status?.[0] ?? '',
        priority: errors.priority?.[0] ?? '',
        is_completed: errors.is_completed?.[0] ?? '',
        due_date: errors.due_date?.[0] ?? '',
        list_id: errors.list_id?.[0] ?? '',
      });

      return;
    }

    handleCreateTask(result.data);
  }, [task]);

  const handleNameChange = useCallback((text: string) => {
    setTask((prev) => ({ ...prev, name: text }));
  }, []);

  const handleDescriptionChange = useCallback((text: string) => {
    setTask((prev) => ({ ...prev, description: text }));
  }, []);

  const handleImageChange = useCallback((text: string) => {
    setTask((prev) => ({ ...prev, image: text }));
  }, []);

  const handleDueDateModalClose = useCallback((date?: Date) => {
    date && setTask((prev) => ({ ...prev, due_date: date.toISOString() }));
    setDueDateModalVisible(false);
  }, []);

  const handlePriorityModalClose = useCallback(() => {
    setPriorityModalVisible(false);
  }, []);

  const handleListModalClose = useCallback(() => {
    setListsModalVisible(false);
  }, []);

  const handlePrioritySelect = useCallback((item: { label: string; value: Priority }) => {
    setTask((prev) => ({ ...prev, priority: item.value }));
    setPriorityModalVisible(false);
  }, []);

  const handleListSelect = useCallback((item: { label: string; value: List }) => {
    setTask((prev) => ({ ...prev, list_id: item.value.id }));
    setListsModalVisible(false);
  }, []);

  const handleDueDateButtonPress = useCallback(() => {
    setTaskError((prev) => ({ ...prev, due_date: '' }));
    setDueDateModalVisible(true);
  }, []);

  const handlePriorityButtonPress = useCallback(() => {
    setPriorityModalVisible(true);
  }, []);

  const handleListButtonPress = useCallback(() => {
    setListsModalVisible(true);
  }, []);

  return (
    <View style={styles.content}>
      <View style={styles.paddingHorizontal}>
        <AppInput
          placeholder="Name: e.g. Doctor appointment"
          bottomSheetInput
          hasError={!!taskError.name}
          clearError={() => setTaskError((prev) => ({ ...prev, name: '' }))}
          onChangeText={handleNameChange}
          autoFocus
        />

        <AppInput
          placeholder="Description"
          bottomSheetInput
          hasError={!!taskError.description}
          clearError={() => setTaskError((prev) => ({ ...prev, description: '' }))}
          onChangeText={handleDescriptionChange}
          style={styles.smallerInput}
        />

        <AppInput
          placeholder="Image Path"
          bottomSheetInput
          hasError={!!taskError.image}
          clearError={() => setTaskError((prev) => ({ ...prev, image: '' }))}
          onChangeText={handleImageChange}
          style={styles.smallerInput}
        />

        <MemoizedSelectionButton
          iconPath="calendar"
          text={`${localDate}`}
          onPress={handleDueDateButtonPress}
          color={taskError.due_date ? 'red' : 'green'}
        />

        <MemoizedSelectionButton
          iconPath="flag"
          text={`${PriorityLabels[task.priority]} Priority`}
          onPress={handlePriorityButtonPress}
        />
      </View>

      <Divider />

      <View style={styles.bottomContainer}>
        <MemoizedSelectionButton
          iconPath="folder-open"
          text={listName}
          onPress={handleListButtonPress}
          style={styles.selectionButtonExtra}
        />

        <TouchableOpacity style={styles.saveButton} onPress={onSavePress}>
          <FontAwesome size={15} name="arrow-right" color="#8080aa" />
        </TouchableOpacity>
      </View>

      <MemoizedDatePickerModal
        visible={dueDateModalVisible}
        onClose={handleDueDateModalClose}
        date={memoizedDueDate}
      />

      <MemoizedSelectionModal
        visible={priorityModalVisible}
        items={priorityOptions}
        onSelect={handlePrioritySelect}
        onClose={handlePriorityModalClose}
      />

      <MemoizedSelectionModal
        visible={listsModalVisible}
        items={listOptions}
        onSelect={handleListSelect}
        onClose={handleListModalClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  content: {
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    gap: 8,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
    gap: 8,
  },
  saveButton: {
    padding: 12,
    paddingHorizontal: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(200, 120, 140, 0.4)',
  },
  selectionButtonExtra: {
    alignSelf: 'center',
  },
  smallerInput: {
    fontSize: 12,
  },
});
