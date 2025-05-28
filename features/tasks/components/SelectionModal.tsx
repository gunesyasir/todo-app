import React from 'react';
import {
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';

type SelectionItems<T> = {
  label: string;
  value: T;
  keyExtractor?: string;
};

type SelectionModalProps<T> = {
  visible: boolean;
  items: SelectionItems<T>[];
  onSelect: (item: SelectionItems<T>) => void;
  onClose: () => void;
};

function SelectionModal<T>({ visible, items, onSelect, onClose }: SelectionModalProps<T>) {
  const { width, height } = useWindowDimensions();

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableOpacity onPress={onClose} style={styles.backdrop}>
        <FlatList
          data={items}
          contentContainerStyle={[
            styles.contentContainer,
            { width: width * 0.8, marginTop: height * 0.2 },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.keyExtractor ?? String(item.value)}
              style={styles.button}
              onPress={() => onSelect(item)}
              activeOpacity={0.9}>
              <Text style={styles.buttonText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </TouchableOpacity>
    </Modal>
  );
}

export const MemoizedSelectionModal = React.memo(SelectionModal) as typeof SelectionModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 15, 43, 0.5)',
  },
  button: {
    backgroundColor: 'white',
    padding: 16,
  },
  buttonText: { fontSize: 14 },
  contentContainer: {
    borderRadius: 14,
    overflow: 'hidden',
  },
});
