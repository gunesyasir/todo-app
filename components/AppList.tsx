import { FlashList, ContentStyle } from '@shopify/flash-list';
import React, { ReactElement } from 'react';

export type AppListProps<T> = {
  data: T[];
  renderItem: ({ item }: { item: T }) => ReactElement;
  keyExtractor: (item: T, index: number) => string;
  estimatedItemSize?: number;
  style?: ContentStyle;
};

function AppList<T>({ data, renderItem, keyExtractor, estimatedItemSize, style }: AppListProps<T>) {
  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={estimatedItemSize}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style}
    />
  );
}

export default AppList;
