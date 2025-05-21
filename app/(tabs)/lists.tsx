import { Stack, useLocalSearchParams } from 'expo-router';

import { Text, Pressable } from 'react-native';
import { Container } from '@/components/Container';
import { List } from '@/types';
import CollapsibleList from '@/components/CollapsibleList';

export default function Lists() {
  const { name } = useLocalSearchParams();

  const listItemHeight = 40;
  const listData: List[] = [
    {
      id: 1,
      name: 'List 1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'List 2',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'List 3',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

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
