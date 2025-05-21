import { SafeAreaView } from 'react-native';

import { FloatingActionButton } from '@/components/FloatingActionButton';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className={styles.container}>
      <FloatingActionButton />
      {children}
    </SafeAreaView>
  );
};

const styles = {
  container: 'flex flex-1',
};
