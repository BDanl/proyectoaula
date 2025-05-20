import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Animated,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoutinesContext } from "../../../../context/RoutinesContext";
import ExerciseCard from "../../../../components/workout/ExerciseCard";
import useWorkoutTimer from "../../../../hooks/useWorkoutTimer";
import Timer from "../../../../components/workout/Timer";
import WorkoutButton from "../../../../components/workout/WorkoutButton";
import ExerciseCheckbox from "../../../../components/workout/ExerciseCheckbox";

const StrengthRoutine = () => {
  const [routine, setRoutine] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const { loading, error, getRoutine, loadAllRoutines } = useRoutinesContext();

  const exercisesConfig = useMemo(() => [
    {
      id: "ejercicio1",
      icon: "barbell",
      image: "https://static.strengthlevel.com/images/exercises/squat/squat-800.jpg",
      series: 5,
      reps: 5,
      muscleGroup: "piernas",
      exerciseType: "resistencia",
    },
    {
      id: "ejercicio2",
      icon: "body",
      image: "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-800.jpg",
      series: 5,
      reps: 5,
      muscleGroup: "pecho",
      exerciseType: "fuerza",
    },
    {
      id: "ejercicio3",
      icon: "fitness",
      image: "https://static.strengthlevel.com/images/exercises/stiff-leg-deadlift/stiff-leg-deadlift-800.jpg",
      series: 5,
      reps: 5,
      muscleGroup: "espalda",
      exerciseType: "resistencia",
    },
    {
      id: "ejercicio4",
      icon: "fitness",
      image: "https://static.strengthlevel.com/images/exercises/military-press/military-press-800.jpg",
      series: 5,
      reps: 5,
      muscleGroup: "brazos",
      exerciseType: "resistencia",
    },
    {
      id: "ejercicio5",
      icon: "fitness",
      image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/11/barbell-row-benefits.jpg",
      series: 5,
      reps: 5,
      muscleGroup: "espalda",
      exerciseType: "fuerza",
    },
  ], []);

  const {
    isWorkoutActive,
    elapsedTime,
    formattedTime,
    handleWorkoutToggle,
    completedExercises,
    toggleExerciseComplete,
    isSaving,
    completionPercentage,
    completedExercisesData,
  } = useWorkoutTimer(exercisesConfig);

  const getExercisesData = () => {
    if (!routine) return [];
    return exercisesConfig.map((exercise) => ({
      ...exercise,
      name:
        routine[exercise.id] ||
        `Ejercicio ${exercise.id.replace("ejercicio", "")}`,
    }));
  };

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        await loadAllRoutines();
        const routineData = await getRoutine("StrengthRoutine");
        if (routineData) {
          setRoutine(routineData);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }).start();
        }
      } catch (err) {
        console.error("Error fetching routine:", err);
      }
    };
    fetchRoutine();
  }, []);

  const handleExercisePress = (imageUrl) => {
    setCurrentImage(imageUrl);
    setImageModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Cargando rutina...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.error}>⚠️ Error: {error}</Text>
      </View>
    );
  }

const handlePress = async () => {
  const result = await handleWorkoutToggle();
  
  if (result?.action === 'stop') {
    if (result.success) {
      navigation.navigate('Stats', { 
        refresh: true,
        workoutData: {
          routineName: routine?.name || "StrengthRoutine",
          ...result.workoutData,
          muscleGroups: completedExercisesData.muscleGroups,
          exerciseTypes: completedExercisesData.exerciseTypes
        }
      });
    } else {
      Alert.alert("Error", "No se pudo guardar la sesión");
    }
  }
};

  return (
    <View style={styles.centeredContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {routine ? (
          <Animated.View
            style={[styles.routineContainer, { opacity: fadeAnim }]}
          >
            <View style={styles.header}>
              <Text style={styles.routineName}>
                {routine.name || "Rutina FullBody"}
              </Text>
              <Text style={styles.routineDescription}>
                {routine.descripcion || "Descripción no disponible"}
              </Text>
              <View style={styles.durationBadge}>
                <Ionicons name="time-outline" size={16} color="#3b82f6" />
                <Text style={styles.durationText}>
                  {routine.duration
                    ? `${routine.duration} mins`
                    : "Duración no especificada"}
                </Text>
              </View>
            </View>

            {isWorkoutActive && (
              <>
                <Timer time={formattedTime} />
                <Text style={styles.progressText}>
                  Completado: {completionPercentage}%
                </Text>
              </>
            )}

            <Text style={styles.sectionTitle}>Ejercicios</Text>

            {getExercisesData().map((exercise) => (
              <View key={exercise.id} style={styles.exerciseContainer}>
                <View
                  style={[
                    styles.exerciseCardWrapper,
                    { width: isWorkoutActive ? "90%" : "100%" },
                  ]}
                >
                  <ExerciseCard
                    icon={exercise.icon}
                    name={exercise.name}
                    series={exercise.series}
                    reps={exercise.reps}
                    onPress={() => handleExercisePress(exercise.image)}
                  />
                </View>
                {isWorkoutActive && (
                  <ExerciseCheckbox
                    isCompleted={completedExercises[exercise.id]}
                    onToggle={() => toggleExerciseComplete(exercise.id)}
                  />
                )}
              </View>
            ))}

            <WorkoutButton
              isActive={isWorkoutActive}
              onPress={handlePress}
              isLoading={isSaving}
            />

            <Modal
              animationType="fade"
              transparent={true}
              visible={imageModalVisible}
              onRequestClose={() => setImageModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <Pressable
                  style={styles.modalBackground}
                  onPress={() => setImageModalVisible(false)}
                />
                <View style={styles.modalContent}>
                  <Image
                    source={{ uri: currentImage }}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                  <Pressable
                    style={styles.closeButton}
                    onPress={() => setImageModalVisible(false)}
                  >
                    <Ionicons name="close" size={24} color="white" />
                  </Pressable>
                </View>
              </View>
            </Modal>
          </Animated.View>
        ) : (
          <View style={styles.notFoundContainer}>
            <Ionicons name="sad-outline" size={40} color="#9ca3af" />
            <Text style={styles.notFoundText}>Rutina no encontrada</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 20,
    paddingTop: 50,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
  },
  loadingText: {
    color: "#e2e8f0",
    fontSize: 16,
  },
  routineContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    width: "100%",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    paddingBottom: 16,
  },
  routineName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: 8,
  },
  routineDescription: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 12,
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1e3a8a20",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  durationText: {
    color: "#3b82f6",
    fontSize: 12,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f8fafc",
    marginBottom: 16,
  },
  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    width: "100%",
  },
  exerciseCardWrapper: {
    flex: 1,
  },
  progressText: {
    color: "#3b82f6",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
  },
  error: {
    color: "#ef4444",
    fontSize: 16,
    textAlign: "center",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  notFoundText: {
    color: "#9ca3af",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: "90%",
    height: "70%",
    backgroundColor: "#1e293b",
    borderRadius: 16,
    overflow: "hidden",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
});

export default StrengthRoutine;
