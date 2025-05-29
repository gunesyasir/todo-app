import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';

import AppList, { AppListProps } from '@/components/AppList';
import { Colors } from '@/utils/colors';

type CollapsibleListProps<T> = {
  title: string;
  onAddPress: () => void;
} & AppListProps<T>;

export default function CollapsibleList<T>({
  title,
  onAddPress,
  data,
  renderItem,
  estimatedItemSize,
  keyExtractor,
}: CollapsibleListProps<T>) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <Pressable onPress={() => setIsVisible(!isVisible)} style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.iconContainer}>
          <Pressable style={styles.iconButton} onPress={onAddPress}>
            <FontAwesome size={18} name="plus" color={Colors.text_light} />
          </Pressable>

          <Pressable style={styles.iconButton} onPress={() => setIsVisible(!isVisible)}>
            <FontAwesome
              size={18}
              name={isVisible ? 'chevron-up' : 'chevron-down'}
              color={Colors.text_light}
            />
          </Pressable>
        </View>
      </Pressable>
      {isVisible && (
        <AppList
          data={data}
          renderItem={renderItem}
          style={styles.listContainerStyle}
          keyExtractor={keyExtractor}
          estimatedItemSize={estimatedItemSize}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  listContainerStyle: {
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.title,
  },
  iconButton: {
    padding: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 24,
  },
});
