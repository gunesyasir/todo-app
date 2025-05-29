import { router, Stack } from 'expo-router';
import { Text, Pressable } from 'react-native';

import CollapsibleList from '@/components/CollapsibleList';
import { Container } from '@/components/Container';
import { translations } from '@/constants/translations';
import { useBoundStore } from '@/store/useBoundStore';

export default function Lists() {
  const listData = useBoundStore((state) => state.lists);
  const listItemHeight = 40;

  return (
    <>
      <Stack.Screen options={{ title: translations.list.lists }} />
      <Container>
        <CollapsibleList
          title={translations.list.myLists}
          onAddPress={() => router.navigate('/create-list')}
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
