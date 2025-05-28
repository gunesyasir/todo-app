import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppInput } from '@/components/AppInput';
import { Divider } from '@/components/Divider';
import { MemoizedSelectionButton } from '@/components/SelectionButton';
import { MemoizedSelectionModal } from '@/features/tasks/components/SelectionModal';
import { DueDate, Priority, PriorityLabels, Status } from '@/features/tasks/constants';
import { TaskCreateSchema, taskCreateSchema } from '@/features/tasks/schema';
import { useBoundStore } from '@/store/useBoundStore';
import { List } from '@/types';

type CreateTaskProps = {
  handleCreateTask: (task: TaskCreateSchema) => void;
};

export const CreateTaskForm: React.FC<CreateTaskProps> = ({ handleCreateTask }) => {
  const lists = useBoundStore((state) => state.lists);
  const defaultList = lists[0];
  const [task, setTask] = useState<TaskCreateSchema>({
    name: '',
    description: '',
    image: undefined,
    status: Status.Pending,
    priority: Priority.Medium,
    is_completed: false,
    due_date: undefined, // TODO: Set real due date
    list_id: defaultList.id,
  });
  const [taskError, setTaskError] = useState<Record<keyof TaskCreateSchema, boolean>>({
    name: false,
    description: false,
    image: false,
    status: false,
    priority: false,
    is_completed: false,
    due_date: false,
    list_id: false,
  });
  const listOptions = useMemo(
    () =>
      lists.map((list) => ({
        label: list.name,
        value: list,
        keyExtractor: list.id.toString(),
      })),
    []
  );
  const dueDateOptions = useMemo(
    () =>
      Object.values(DueDate).map((value) => ({
        label: value,
        value,
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

  const onSavePress = useCallback(() => {
    const result = taskCreateSchema.safeParse(task);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      setTaskError({
        name: !!errors.name,
        description: !!errors.description,
        image: !!errors.image,
        status: !!errors.status,
        priority: !!errors.priority,
        is_completed: !!errors.is_completed,
        due_date: !!errors.due_date,
        list_id: !!errors.list_id,
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

  const handleDueDateSelect = useCallback((item: { label: string; value: DueDate }) => {
    setTask((prev) => ({ ...prev, due_date: item.value }));
    setDueDateModalVisible(false);
  }, []);

  const handleDueDateModalClose = useCallback(() => {
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
    setPriorityModalVisible(false);
  }, []);

  const handleDueDateButtonPress = useCallback(() => {
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
          hasError={taskError.name}
          clearError={() => setTaskError((prev) => ({ ...prev, name: false }))}
          onChangeText={handleNameChange}
          autoFocus
        />

        <AppInput
          placeholder="Description"
          bottomSheetInput
          hasError={taskError.description}
          clearError={() => setTaskError((prev) => ({ ...prev, description: false }))}
          onChangeText={handleDescriptionChange}
          style={styles.smallerInput}
        />

        <AppInput
          placeholder="Image Path"
          bottomSheetInput
          hasError={taskError.image}
          clearError={() => setTaskError((prev) => ({ ...prev, image: false }))}
          onChangeText={handleImageChange}
          style={styles.smallerInput}
        />

        <MemoizedSelectionButton
          iconPath="calendar"
          text={`${task.due_date}`}
          onPress={handleDueDateButtonPress}
          color="green"
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
          text={defaultList?.name}
          onPress={handleListButtonPress}
          style={styles.selectionButtonExtra}
        />

        <TouchableOpacity style={styles.saveButton} onPress={onSavePress}>
          <FontAwesome size={15} name="arrow-right" color="#8080aa" />
        </TouchableOpacity>
      </View>

      <MemoizedSelectionModal
        visible={dueDateModalVisible}
        items={dueDateOptions}
        onSelect={handleDueDateSelect}
        onClose={handleDueDateModalClose}
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
