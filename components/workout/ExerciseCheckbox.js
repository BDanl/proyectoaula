
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ExerciseCheckbox = ({ isCompleted, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <View style={[styles.checkbox, isCompleted && styles.completed]}>
        {isCompleted && (
          <Ionicons name="checkmark" size={18} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completed: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
});

export default ExerciseCheckbox;