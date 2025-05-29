import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppInput } from '@/components/AppInput';
import { Button } from '@/components/Button';
import { translations } from '@/constants/translations';
import { useCreateListScreen } from '@/hooks/useCreateListScreen';
import { Colors } from '@/utils/colors';

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
          title: translations.list.addList,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <View
        style={[styles.container, insets.bottom !== 0 && { paddingBottom: insets.bottom + 12 }]}>
        <View>
          <AppInput
            style={[styles.input, !!errorMessage && styles.inputErrorContainer]}
            placeholder={translations.list.listName}
            hasError={!!errorMessage}
            clearError={() => setErrorMessage('')}
            value={text}
            onChangeText={setText}
          />
          <Text style={styles.inputError}>{errorMessage}</Text>
        </View>
        <Button title={translations.save} onPress={onSave} style={styles.button} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.button_background,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  input: {
    borderColor: Colors.input_border,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 16,
    color: Colors.input_text,
  },
  inputError: {
    color: Colors.error_text,
    fontSize: 14,
    marginTop: 6,
  },
  inputErrorContainer: {
    borderColor: Colors.error_text,
  },
});
