import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExerciseCard from "../../../components/workout/ExerciseCard";

const ExercisesListScreen = ({ navigation }) => {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const exercisesConfig = [
    {
      id: "ejercicio1",
      icon: "barbell",
      image: "https://i.pinimg.com/474x/82/1b/20/821b20858c969fe48cd2c6a7d243ab22.jpg",
      series: 4,
      reps: 8,
      muscleGroup: "brazos",
      exerciseType: "fuerza",
      name: "Press de Banca"
    },
    {
      id: "ejercicio2",
      icon: "body",
      image: "https://static.strengthlevel.com/images/exercises/military-press/military-press-800.jpg",
      series: 3,
      reps: 10,
      muscleGroup: "brazos",
      exerciseType: "resistencia",
      name: "Press Militar"
    },
    {
      id: "ejercicio3",
      icon: "fitness",
      image: "https://www.feda.net/wp-content/uploads/2019/02/dip.jpg",
      series: 3,
      reps: 12,
      muscleGroup: "pecho",
      exerciseType: "fuerza",
      name: "Fondos"
    },
    {
      id: "ejercicio4",
      icon: "fitness",
      image: "https://static.strengthlevel.com/images/exercises/dumbbell-lateral-raise/dumbbell-lateral-raise-800.jpg",
      series: 3,
      reps: 15,
      muscleGroup: "hombros",
      exerciseType: "resistencia",
      name: "Elevaciones Laterales"
    },
    {
      id: "ejercicio5",
      icon: "fitness",
      image: "https://static.strengthlevel.com/images/exercises/seated-dumbbell-tricep-extension/seated-dumbbell-tricep-extension-800.jpg",
      series: 3,
      reps: 12,
      muscleGroup: "brazos",
      exerciseType: "resistencia",
      name: "Extensiones de Tríceps"
    },
    {
      id: "ejercicio6",
      icon: "barbell",
      image: "https://www.runningcorrer.com.ar/wprunning/wp-content/uploads/2022/03/ejercicios-sentadillas.webp",
      series: 4,
      reps: 12,
      muscleGroup: "piernas",
      exerciseType: "flexibilidad",
      name: "Sentadillas"
    },
    {
      id: "ejercicio7",
      icon: "body",
      image: "https://www.ilovefit.org/wp-content/uploads/2017/07/flexiones.jpg",
      series: 3,
      reps: 12,
      muscleGroup: "brazos",
      exerciseType: "fuerza",
      name: "Flexiones"
    },
    {
      id: "ejercicio8",
      icon: "fitness",
      image: "https://www.fisioterapiaconmueve.com/wp-content/uploads/2023/04/dominadas.jpg",
      series: 3,
      reps: 10,
      muscleGroup: "espalda",
      exerciseType: "resistencia",
      name: "Dominadas"
    },
    {
      id: "ejercicio9",
      icon: "fitness",
      image: "https://static.strengthlevel.com/images/exercises/deficit-deadlift/deficit-deadlift-800.jpg",
      series: 4,
      reps: 10,
      muscleGroup: "hombros",
      exerciseType: "resistencia",
      name: "Peso Muerto"
    },
    {
      id: "ejercicio10",
      icon: "fitness",
      image: "https://bulevip.com/blog/wp-content/uploads/2024/10/tenica-plank.jpg",
      series: 3,
      reps: 30,
      muscleGroup: "brazos",
      exerciseType: "resistencia",
      name: "Plancha"
    },
    {
      id: "ejercicio11",
      icon: "fitness",
      image: "https://phantom-telva.uecdn.es/b40c0befaa878ad45ac38270ecab95e3/resize/828/f/jpg/assets/multimedia/imagenes/2021/02/26/16143187500035.jpg",
      series: 3,
      reps: 10,
      muscleGroup: "espalda",
      exerciseType: "flexibilidad",
      name: "Remo con Mancuernas"
    },
     {
    id: "ejercicio12",
    icon: "barbell",
    image: "https://static.strengthlevel.com/images/exercises/squat/squat-800.jpg",
    series: 5,
    reps: 5,
    muscleGroup: "piernas",
    exerciseType: "resistencia",
    name: "Sentadillas"
  },
  {
    id: "ejercicio13",
    icon: "body",
    image: "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-800.jpg",
    series: 5,
    reps: 5,
    muscleGroup: "pecho",
    exerciseType: "fuerza",
    name: "Press de Banca"
  },
  {
    id: "ejercicio14",
    icon: "fitness",
    image: "https://static.strengthlevel.com/images/exercises/stiff-leg-deadlift/stiff-leg-deadlift-800.jpg",
    series: 5,
    reps: 5,
    muscleGroup: "espalda",
    exerciseType: "resistencia",
    name: "Peso Muerto Piernas Rígidas"
  },
  {
    id: "ejercicio15",
    icon: "fitness",
    image: "https://static.strengthlevel.com/images/exercises/military-press/military-press-800.jpg",
    series: 5,
    reps: 5,
    muscleGroup: "hombros",
    exerciseType: "resistencia",
    name: "Press Militar"
  },
  {
    id: "ejercicio16",
    icon: "fitness",
    image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/11/barbell-row-benefits.jpg",
    series: 5,
    reps: 5,
    muscleGroup: "espalda",
    exerciseType: "fuerza",
    name: "Remo con Barra"
  },
   {
    id: "ejercicio17",
    icon: "barbell",
    image: "https://static.strengthlevel.com/images/exercises/bodyweight-squat/bodyweight-squat-800.jpg",
    series: 3,
    reps: 12,
    muscleGroup: "piernas",
    exerciseType: "resistencia",
    name: "Sentadillas sin peso"
  },
  {
    id: "ejercicio18",
    icon: "body",
    image: "https://liftmanual.com/wp-content/uploads/2023/04/kneeling-push-up.jpg",
    series: 3,
    reps: 8,
    muscleGroup: "brazos",
    exerciseType: "fuerza",
    name: "Flexiones de rodillas"
  },
  {
    id: "ejercicio19",
    icon: "fitness",
    image: "https://www.wellcentro.com/wp-content/uploads/2019/11/plancha-abdominal-1.jpg",
    series: 3,
    reps: 30,
    muscleGroup: "pecho",
    exerciseType: "resistencia",
    name: "Plancha abdominal"
  },
  {
    id: "ejercicio20",
    icon: "fitness",
    image: "https://static.strengthlevel.com/images/exercises/glute-bridge/glute-bridge-800.jpg",
    series: 3,
    reps: 12,
    muscleGroup: "piernas",
    exerciseType: "flexibilidad",
    name: "Puente de glúteos"
  },
  {
    id: "ejercicio21",
    icon: "fitness",
    image: "https://static.strengthlevel.com/images/exercises/inverted-row/inverted-row-800.jpg",
    series: 3,
    reps: 8,
    muscleGroup: "espalda",
    exerciseType: "resistencia",
    name: "Remo invertido"
  },
  {
    id: "ejercicio22",
    icon: "barbell",
    image: "https://www.elindependiente.com/wp-content/uploads/2024/05/captura-de-pantalla-2024-05-21-a-las-182231.png",
    series: 8,
    reps: 10,
    muscleGroup: "piernas",
    exerciseType: "cardio",
    name: "Burpees"
  },
  {
    id: "ejercicio23",
    icon: "body",
    image: "https://s2.abcstatics.com/media/bienestar/2020/04/08/jumping-jack-2-k8hE--510x349@abc.jpeg",
    series: 8,
    reps: 10,
    muscleGroup: "piernas",
    exerciseType: "cardio",
    name: "Jumping Jacks"
  },
  {
    id: "ejercicio24",
    icon: "fitness",
    image: "https://t3.ftcdn.net/jpg/04/85/26/50/360_F_485265082_XHMjXuKYEnxlI5ybgKr6rfAJSqR33WRA.jpg",
    series: 8,
    reps: 10,
    muscleGroup: "piernas",
    exerciseType: "cardio",
    name: "Mountain Climbers"
  },
  {
    id: "ejercicio25",
    icon: "fitness",
    image: "https://static.vecteezy.com/system/resources/previews/008/635/521/non_2x/woman-doing-jump-squats-exercise-flat-illustration-isolated-on-white-background-vector.jpg",
    series: 8,
    reps: 10,
    muscleGroup: "piernas",
    exerciseType: "cardio",
    name: "Jump Squats"
  },
  {
    id: "ejercicio26",
    icon: "fitness",
    image: "https://i.pinimg.com/564x/a2/e7/e2/a2e7e2fb70013dac2054b5e0c17bd5f6.jpg",
    series: 8,
    reps: 10,
    muscleGroup: "piernas",
    exerciseType: "resistencia",
    name: "High Knees"
  },
  {
    id: "ejercicio27",
    icon: "barbell",
    image: "https://static.strengthlevel.com/images/exercises/crunches/crunches-800.jpg",
    series: 3,
    reps: 15,
    muscleGroup: "abdomen",
    exerciseType: "resistencia",
    name: "Abdominales tradicionales"
  },
  {
    id: "ejercicio28",
    icon: "body",
    image: "https://static.strengthlevel.com/images/exercises/lying-leg-raise/lying-leg-raise-800.jpg",
    series: 3,
    reps: 12,
    muscleGroup: "abdomen",
    exerciseType: "resistencia",
    name: "Elevaciones de piernas"
  },
  {
    id: "ejercicio29",
    icon: "fitness",
    image: "https://liftmanual.com/wp-content/uploads/2023/04/russian-twist.jpg",
    series: 3,
    reps: 20,
    muscleGroup: "abdomen",
    exerciseType: "fuerza",
    name: "Russian Twist"
  },
  {
    id: "ejercicio30",
    icon: "fitness",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZQi0Nx42uHU6Ex4ix3ZclI_5gXhWPvYZDSi580Dm7g_KwRaopz8Aeq-6Mlbm5pXFlNaA-uEbh2jWDSYMl6vRcxmmJpbVNNXXeKo4J_Yjbup4Xys0Y1-_FTsZ9rNNfcoHJqteVaNHRLr8/s1600/plancha-lateral.jpg",
    series: 3,
    reps: 30,
    muscleGroup: "abdomen",
    exerciseType: "resistencia",
    name: "Plancha lateral"
  },
  {
    id: "ejercicio31",
    icon: "fitness",
    image: "https://static.strengthlevel.com/images/exercises/bicycle-crunch/bicycle-crunch-800.jpg",
    series: 3,
    reps: 20,
    muscleGroup: "abdomen",
    exerciseType: "fuerza",
    name: "Bicicleta abdominal"
  },
    {
    id: "ejercicio32",
    icon: "barbell",
    image: "https://static.strengthlevel.com/images/exercises/pull-ups/pull-ups-800.jpg",
    series: 4,
    reps: 8,
    muscleGroup: "espalda",
    exerciseType: "resistencia",
    name: "Dominadas"
  },
  {
    id: "ejercicio33",
    icon: "body",
    image: "https://static.strengthlevel.com/images/exercises/dips/dips-800.jpg",
    series: 3,
    reps: 10,
    muscleGroup: "pecho",
    exerciseType: "fuerza",
    name: "Fondos en paralelas"
  },
  {
    id: "ejercicio34",
    icon: "fitness",
    image: "https://static.strengthlevel.com/images/exercises/pistol-squat/pistol-squat-800.jpg",
    series: 3,
    reps: 12,
    muscleGroup: "piernas",
    exerciseType: "flexibilidad",
    name: "Sentadilla pistol"
  },
  {
    id: "ejercicio35",
    icon: "fitness",
    image: "https://i.pinimg.com/736x/6a/10/88/6a1088ce52211491912ed45a0463178e.jpg",
    series: 3,
    reps: 5,
    muscleGroup: "espalda",
    exerciseType: "flexibilidad",
    name: "Front Lever"
  },
  {
    id: "ejercicio36",
    icon: "fitness",
    image: "https://calistenia.es/wp-content/uploads/2024/02/imagen-51.png",
    series: 3,
    reps: 5,
    muscleGroup: "brazos",
    exerciseType: "resistencia",
    name: "Planche"
  }
  ];

  const groupByMuscleGroup = () => {
    const grouped = {};
    exercisesConfig.forEach(exercise => {
      if (!grouped[exercise.muscleGroup]) {
        grouped[exercise.muscleGroup] = [];
      }
      grouped[exercise.muscleGroup].push(exercise);
    });
    return grouped;
  };

  const groupedExercises = groupByMuscleGroup();

  const handleExercisePress = (imageUrl) => {
    setCurrentImage(imageUrl);
    setImageModalVisible(true);
  };

  return (
    <View style={styles.centeredContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.routineContainer}>
          <View style={styles.header}>
            <Text style={styles.routineName}>Lista Completa de Ejercicios</Text>
            <Text style={styles.routineDescription}>
              Todos los ejercicios disponibles organizados por grupo muscular
            </Text>
          </View>

          {Object.entries(groupedExercises).map(([muscleGroup, exercises]) => (
            <View key={muscleGroup}>
              <Text style={styles.sectionTitle}>
                {muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)}
              </Text>
              
              {exercises.map((exercise) => (
                <View key={exercise.id} style={styles.exerciseContainer}>
                  <View style={styles.exerciseCardWrapper}>
                    <ExerciseCard
                      icon={exercise.icon}
                      name={exercise.name}
                      series={exercise.series}
                      reps={exercise.reps}
                      onPress={() => handleExercisePress(exercise.image)}
                    />
                  </View>
                </View>
              ))}
            </View>
          ))}

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
        </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f8fafc",
    marginBottom: 16,
    marginTop: 20,
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

export default ExercisesListScreen;