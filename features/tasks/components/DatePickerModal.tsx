import React from 'react';
import { Modal, TouchableOpacity, StyleSheet } from 'react-native';

import DatePicker from '@/components/DatePicker';

type DatePickerModalProps = {
  visible: boolean;
  onClose: (date?: Date) => void;
  date: Date;
};

function DatePickerModal({ visible, onClose, date }: DatePickerModalProps) {
  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={() => onClose()}>
      <TouchableOpacity onPress={() => onClose()} style={styles.backdrop}>
        <DatePicker onClose={onClose} date={date} />
      </TouchableOpacity>
    </Modal>
  );
}

export const MemoizedDatePickerModal = React.memo(DatePickerModal);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 15, 43, 0.5)',
  },
});
