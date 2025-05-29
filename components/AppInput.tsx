import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React from 'react';
import { TextInput, StyleSheet, TextInputProps, Platform } from 'react-native';

import { Colors } from '@/utils/colors';

interface AppInputProps extends TextInputProps {
  bottomSheetInput?: boolean;
  hasError?: boolean;
  clearError?: () => void;
}

export const AppInput: React.FC<AppInputProps> = ({
  bottomSheetInput = false,
  hasError = false,
  clearError,
  onChangeText,
  style,
  ...rest
}) => {
  // Workaround for BottomSheetTextInput is problematic in android as it doesn't respect provided snap points.
  const AppInput =
    Platform.OS === 'android' || !bottomSheetInput ? TextInput : BottomSheetTextInput;

  const handleChange = (text: string) => {
    if (hasError && clearError) {
      // Disappear error on first text change event.
      clearError();
    }

    onChangeText?.(text);
  };

  return (
    <AppInput
      {...rest}
      onChangeText={handleChange}
      style={[styles.input, style, hasError && styles.errorInput]}
      placeholderTextColor={hasError ? Colors.error : Colors.placeholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 4,
    fontSize: 16,
    padding: 8,
  },
  errorInput: {
    color: Colors.error,
  },
});
