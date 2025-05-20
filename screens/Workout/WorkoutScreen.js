import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import ExploreRoutinesCard from "../../components/workout/ExploreRoutinesCard";
import NewRoutineCard from "../../components/workout/NewRoutineCard";
import MuscleDistributionChart from "../../components/workout/MuscleDistributionChart";
import { getWorkoutSessions } from "../../utils/workoutStorage";

const WorkoutScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); 
  const [muscleGroupsData, setMuscleGroupsData] = useState({});
  const [refreshKey, setRefreshKey] = useState(0); 

  const loadMuscleDistribution = async () => {
    try {
      const sessions = await getWorkoutSessions();
      const muscles = {};
      
      sessions.forEach(session => {
        Object.entries(session.muscleGroups || {}).forEach(([muscle, count]) => {
          muscles[muscle] = (muscles[muscle] || 0) + count;
        });
      });
      
      setMuscleGroupsData(muscles);
    } catch (error) {
      console.error('Error loading muscle distribution:', error);
    }
  };

  useEffect(() => {
    if (isFocused) { 
      loadMuscleDistribution();
    }
  }, [isFocused, refreshKey]); 

 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshKey(prev => prev + 1); 
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Rutinas</Text>
        <View style={styles.cardRow}>
          <NewRoutineCard />
          <ExploreRoutinesCard />
        </View>
        <View style={{ marginTop: 80 }}>
        <MuscleDistributionChart 
          muscleGroupsData={muscleGroupsData} 
          key={refreshKey} 
        />
        <Text style={{ color: "white", textAlign: "center", marginBottom: 10 }}>
          Distribución de grupos musculares trabajados por sesión finalizada.
        </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 150,
    paddingBottom: 30,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
});

export default WorkoutScreen;