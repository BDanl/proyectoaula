import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WorkoutButton = ({ isActive, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isActive ? styles.stopButton : styles.startButton
      ]} 
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>
        {isActive ? "Terminar Rutina" : "Comenzar Rutina"}
      </Text>
      <Ionicons 
        name={isActive ? "stop" : "play"} 
        size={18} 
        color="white" 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  startButton: {
    backgroundColor: '#3b82f6',
  },
  stopButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WorkoutButton;