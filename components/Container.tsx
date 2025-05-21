import { SafeAreaView, StyleSheet, View } from 'react-native';
import { BottomSheetComponent } from '@/components/BottomSheetComponent';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import React, { ReactNode, useCallback, useRef } from 'react';
import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';

export const Container = ({ children }: { children: ReactNode }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <SafeAreaView className={styles.container}>
      <FloatingActionButton onPress={handlePresentModal} />

      <BottomSheetComponent
        ref={bottomSheetModalRef}
        children={
          <View style={styleSheet.content}>
            <BottomSheetTextInput
              placeholder={'e.g. Doctor appointment'}
              style={styleSheet.input}
              autoFocus
            />
            <BottomSheetTextInput
              placeholder={'Description'}
              style={[styleSheet.input, styleSheet.description]}
            />
            <BottomSheetTextInput placeholder={'Description'} value="" style={styleSheet.input} />
          </View>
        }
      />

      {children}
    </SafeAreaView>
  );
};

const styles = {
  container: 'flex flex-1',
};

const styleSheet = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 15, 43, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'yellow',
  },
  description: {
    fontSize: 12,
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
});
