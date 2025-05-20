
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ExerciseCard = ({ icon, exerciseKey, name, series, reps, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.exerciseCard}
      activeOpacity={0.7}
      onPress={() => onPress(exerciseKey)}
    >
      <View style={styles.exerciseHeader}>
        <Ionicons name={icon} size={20} color="#3b82f6" />
        <Text style={styles.exerciseName}>
          {name || "Ejercicio no especificado"}
        </Text>
      </View>
      <Text style={styles.exerciseDetail}>
        {series} series x {reps} repeticiones
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  exerciseCard: {
    backgroundColor: "#334155",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#3b82f6",
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e2e8f0",
    maxWidth: "95%",
  },
  exerciseDetail: {
    fontSize: 13,
    color: "#94a3b8",
  },
});

export default ExerciseCard;