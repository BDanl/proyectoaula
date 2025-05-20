import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ time }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
});

export default Timer;