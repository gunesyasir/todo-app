import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  Text,
  ViewStyle,
  StyleProp,
} from 'react-native';

import { Colors } from '@/utils/colors';

interface Props extends TouchableOpacityProps {
  iconPath?: string;
  text: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const SelectionButton: React.FC<Props> = ({
  iconPath,
  text,
  color = Colors.secondary_text,
  onPress,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...rest}>
      {iconPath && (
        <FontAwesome size={12} name={iconPath as any} color={color ?? Colors.text_light} />
      )}
      <Text style={[styles.text, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const MemoizedSelectionButton = React.memo(SelectionButton);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
