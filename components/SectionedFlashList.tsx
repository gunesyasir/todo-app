import { FlashList } from '@shopify/flash-list';
import React from 'react';

interface SectionedFlashListProps<T> {
  data: (string | T)[];
  renderItem: (item: T) => React.ReactElement;
  renderSectionHeader: (header: string) => React.ReactElement;
  estimatedItemSize?: number;
}

export function SectionedFlashList<T>({
  data,
  renderItem,
  renderSectionHeader,
  estimatedItemSize = 60,
}: SectionedFlashListProps<T>) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) =>
        typeof item === 'string' ? renderSectionHeader(item) : renderItem(item)
      }
      getItemType={(item) => (typeof item === 'string' ? 'sectionHeader' : 'row')}
      estimatedItemSize={estimatedItemSize}
    />
  );
}
