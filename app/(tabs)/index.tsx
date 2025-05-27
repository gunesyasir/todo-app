import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { noTaskAnimation } from '@/assets/animations';
import { Container } from '@/components/Container';
import { SectionedFlashList } from '@/components/SectionedFlashList';
import { useUpdateTask } from '@/features/tasks/hooks/useUpdateTask';
import { useUpcomingTasksScreen } from '@/hooks/useUpcomingTasksScreen';
import { useBoundStore } from '@/store/useBoundStore';
import { SharedTask } from '@/types';

export default function TaskScreen() {
  const { sectionListData } = useUpcomingTasksScreen();
  const { toggleIsCompleted } = useUpdateTask();
  const listData = useBoundStore((state) => state.lists);
  const ITEM_HEIGHT = 60; // TODO: Calculate on layout

  const renderHeaderItem = (header: string) => <Text style={styles.header}>{header}</Text>;

  const renderTaskItem = (item: SharedTask) => {
    const listName = listData.filter((list) => list.id === item.list_id)?.[0]?.name;
    return (
      <View style={styles.taskItem}>
        <TouchableOpacity
          style={[styles.button, item.is_completed && styles.filledButton]}
          onPress={() => toggleIsCompleted(item.id, !item.is_completed ?? true)}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.taskTitle, item.is_completed && styles.taskTitleCompleted]}>
            {item.name}
          </Text>
          <View style={styles.bottomContainer}>
            <Text numberOfLines={3} style={styles.subtitle}>
              {item.description}
            </Text>

            <View style={styles.listContainer}>
              <Text>{listName}</Text>
              <FontAwesome size={18} name="folder" color="#ccc" />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Upcoming Tasks' }} />
      <Container>
        {sectionListData.length !== 0 ? (
          <View style={styles.container}>
            <SectionedFlashList
              data={sectionListData}
              renderItem={renderTaskItem}
              renderSectionHeader={renderHeaderItem}
              estimatedItemSize={ITEM_HEIGHT}
            />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <LottieView autoPlay style={styles.lottie} source={noTaskAnimation} />
            <Text style={styles.emptyText}>No task found ahead, schedule your tasks.</Text>
          </View>
        )}
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c',
    marginTop: 16,
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
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lottie: {
    width: '50%',
    aspectRatio: 1,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    flexShrink: 1,
    paddingEnd: 12,
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
