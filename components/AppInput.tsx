import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

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
  const AppInput = bottomSheetInput ? BottomSheetTextInput : TextInput;

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
      style={[styles.input, hasError && styles.errorInput, style]}
      placeholderTextColor={hasError ? 'red' : '#999'}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 4,
    fontSize: 16,
  },
  errorInput: {
    color: 'red',
  },
});
