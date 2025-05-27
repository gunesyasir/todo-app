import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';

import { BottomSheetComponent } from '@/components/BottomSheetComponent';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { CreateTaskForm } from '@/features/tasks/components/CreateTaskForm';
import { useCreateTask } from '@/features/tasks/hooks/useCreateTask';

export const Container = ({ children }: { children: ReactNode }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { createTask, isFinished, toggleIsFinished } = useCreateTask();

  useEffect(() => {
    if (isFinished) {
      toggleIsFinished();
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isFinished]);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <SafeAreaView className={styles.container}>
      <FloatingActionButton onPress={handlePresentModal} />

      <BottomSheetComponent
        ref={bottomSheetModalRef}
        children={<CreateTaskForm handleCreateTask={createTask} />}
      />

      {children}
    </SafeAreaView>
  );
};

const styles = {
  container: 'flex flex-1',
};
