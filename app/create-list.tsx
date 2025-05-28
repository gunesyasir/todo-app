import { router, Stack } from 'expo-router';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

import { AppInput } from '@/components/AppInput';
import { Button } from '@/components/Button';
import { useCreateListScreen } from '@/hooks/useCreateListScreen';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CreateListScreen() {
  const { text, setText, errorMessage, setErrorMessage, onSave, isCompleted } =
    useCreateListScreen();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isCompleted) {
      router.back();
    }
  }, [isCompleted]);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Add List',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <View
        style={[styles.container, insets.bottom !== 0 && { paddingBottom: insets.bottom + 12 }]}>
        <View>
          <AppInput
            style={[styles.input, !!errorMessage && styles.inputErrorContainer]}
            placeholder="List Name"
            hasError={!!errorMessage}
            clearError={() => setErrorMessage('')}
            value={text}
            onChangeText={setText}
          />
          <Text style={styles.inputError}>{errorMessage}</Text>
        </View>
        <Button title="Save" onPress={onSave} style={styles.button} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  input: {
    borderColor: 'blue',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 16,
    color: 'gray',
  },
  inputError: {
    color: 'red',
    fontSize: 14,
    marginTop: 6,
  },
  inputErrorContainer: {
    borderColor: 'red',
  },
});
