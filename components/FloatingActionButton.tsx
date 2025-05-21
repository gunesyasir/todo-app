import { Octicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const FloatingActionButton = () => {
  const handlePress = () => {
    alert('Floating Button Pressed!');
  };

  return (
    <TouchableOpacity style={styles.floatingButton} onPress={handlePress}>
      <Octicons name="diff-added" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
