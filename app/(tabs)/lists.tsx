import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, Pressable } from 'react-native';

import CollapsibleList from '@/components/CollapsibleList';
import { Container } from '@/components/Container';
import { useBoundStore } from '@/store/useBoundStore';
import { List } from '@/types';

export default function Lists() {
  const { name } = useLocalSearchParams();
  const listData = useBoundStore((state) => state.lists);
  const listItemHeight = 40;

  return (
    <>
      <Stack.Screen options={{ title: 'Lists' }} />
      <Container>
        {/*<ScreenContent path="screens/lists.tsx" title={`Showing details for user ${name}`} />*/}

        <CollapsibleList<List>
          title="My Lists"
          data={listData}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                console.log(item);
              }}
              style={{ height: listItemHeight, justifyContent: 'center' }}>
              <Text style={{ marginStart: 2 }}>{item.name}</Text>
            </Pressable>
          )}
          estimatedItemSize={listItemHeight}
          keyExtractor={(item) => item.id.toString()}
        />
      </Container>
    </>
  );
}
