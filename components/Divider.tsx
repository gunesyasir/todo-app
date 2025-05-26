import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#eee',
    height: 1,
  },
});
