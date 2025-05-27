import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { splashAnimation } from '@/assets/animations';
import { useSplashScreen } from '@/hooks/useSplashScreen';

export default function SplashScreen() {
  const { isLoaded } = useSplashScreen();

  useEffect(() => {
    if (!isLoaded) return;

    router.replace('/(tabs)');
  }, [isLoaded]);

  return (
    <View style={styles.container}>
      <LottieView autoPlay style={styles.lottie} source={splashAnimation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  lottie: {
    width: '50%',
    aspectRatio: 1,
  },
});
