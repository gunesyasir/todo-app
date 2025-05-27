import { Stack } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Container } from '@/components/Container';
import { SectionedFlashList } from '@/components/SectionedFlashList';
import { useUpdateTask } from '@/features/tasks/hooks/useUpdateTask';
import { useUpcomingTasksScreen } from '@/hooks/useUpcomingTasksScreen';
import { SharedTask } from '@/types';

export default function TaskScreen() {
  const { sectionListData } = useUpcomingTasksScreen();
  const { toggleIsCompleted } = useUpdateTask();
  const ITEM_HEIGHT = 60; // TODO: Calculate on layout

  const renderHeaderItem = (header: string) => <Text style={styles.header}>{header}</Text>;

  const renderTaskItem = (item: SharedTask) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={[styles.button, item.is_completed && styles.filledButton]}
        onPress={() => toggleIsCompleted(item.id, !item.is_completed ?? true)}
      />
      <View style={{ flex: 1 }}>
        <Text style={[styles.taskTitle, item.is_completed && styles.taskTitleCompleted]}>
          {item.name}
        </Text>
        {item.description && <Text style={styles.subtitle}>{item.description}</Text>}
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Upcoming Tasks' }} />
      <Container>
        <View style={styles.container}>
          <SectionedFlashList
            data={sectionListData}
            renderItem={renderTaskItem}
            renderSectionHeader={renderHeaderItem}
            estimatedItemSize={ITEM_HEIGHT}
          />
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
    marginTop: 6,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  filledButton: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#bbb',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
  },
  taskItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 6,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});
