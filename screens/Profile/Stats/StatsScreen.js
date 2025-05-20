import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { getSessionsByMonth, getSessionsByDay, getWorkoutSessions } from "../../../utils/workoutStorage"; 
import { useTheme } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;

const StatsScreen = ({ navigation, route }) => {
   const { colors } = useTheme();
  const [monthlyData, setMonthlyData] = useState(Array(12).fill(0));
  const [dailyData, setDailyData] = useState(Array(7).fill(0));
  const [muscleGroupsData, setMuscleGroupsData] = useState({});
  const [exerciseTypesData, setExerciseTypesData] = useState({});
  const [loading, setLoading] = useState(true);

    const chartColors = {
    pecho: '#FF6384',
    piernas: '#36A2EB',
    espalda: '#FFCE56',
    brazos: '#4BC0C0',
    hombros: '#9966FF',
    fuerza: '#FF6384',
    resistencia: '#36A2EB',
    flexibilidad: '#FFCE56',
    cardio: '#4BC0C0'
  };

  const loadStats = async () => {
    setLoading(true);
    try {
      const [byMonth, byDay, sessions] = await Promise.all([
        getSessionsByMonth(),
        getSessionsByDay(),
        getWorkoutSessions()
      ]);
      
      setMonthlyData(byMonth);
      setDailyData(byDay);

      const muscles = {};
      const types = {};
      
      sessions.forEach(session => {
        Object.entries(session.muscleGroups || {}).forEach(([muscle, count]) => {
          muscles[muscle] = (muscles[muscle] || 0) + count;
        });
        
        Object.entries(session.exerciseTypes || {}).forEach(([type, count]) => {
          types[type] = (types[type] || 0) + count;
        });
      });
      
      setMuscleGroupsData(muscles);
      setExerciseTypesData(types);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMuscleGroupsChartData = () => {
  const colors = {
    pecho: '#FF6384',
    piernas: '#36A2EB',
    espalda: '#FFCE56',
    brazos: '#4BC0C0',
    hombros: '#9966FF',
    abdomen: '#FF9F40',
  };

  if (!muscleGroupsData || Object.keys(muscleGroupsData).length === 0) {
    return [
      {
        name: "Sin datos",
        population: 1,
        color: "#CCCCCC",
        legendFontColor: "#FFFFFF",
        legendFontSize: 15
      }
    ];
  }

  return Object.entries(muscleGroupsData)
    .filter(([_, count]) => count > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      population: value,
      color: colors[name.toLowerCase()] || `#${Math.floor(Math.random()*16777215).toString(16)}`,
      legendFontColor: "#FFFFFF",  
      legendFontSize: 12,
      labelColor: "#FFFFFF"       
    }));
};

 const getExerciseTypesChartData = () => {
    const types = ["fuerza", "resistencia", "flexibilidad", "cardio"];
    
    if (!exerciseTypesData || Object.keys(exerciseTypesData).length === 0) {
      return {
        labels: types.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
        data: types.map(() => 0.25)
      };
    }
    
    const total = Object.values(exerciseTypesData).reduce((sum, val) => sum + val, 0) || 1;
    
    return {
      labels: types.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
      data: types.map(t => (exerciseTypesData[t] || 0) / total),
      colors: types.map(t => chartColors[t])
    };
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadStats);
    loadStats(); 
    
    return unsubscribe;
  }, [navigation, route.params?.refresh]);

  const sharedChartConfig = {
    backgroundColor: "#000",
    backgroundGradientFrom: "#1a1a1a",
    backgroundGradientTo: "#2d2d2d",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForLabels: {
      fontSize: 10,
      fontWeight: "bold",
      dx: -5,
    },
    style: {
      borderRadius: 16,
      marginLeft: -15,
    },
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      horizontal={false}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Estadísticas</Text>
      </View>

      {/* Gráfico de Sesiones por Mes */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Sesiones por mes</Text>
        <LineChart
          data={{
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            datasets: [{
              data: monthlyData,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            }],
          }}
          width={screenWidth - 10}
          height={220}
          chartConfig={{
            ...sharedChartConfig,
            propsForLabels: {
              ...sharedChartConfig.propsForLabels,
              fontSize: 8,
            },
          }}
          bezier
          withHorizontalLabels={true}
          withVerticalLabels={true}
          style={[styles.chart, { marginLeft: -20 }]}
        />
      </View>

      {/* Gráfico de Sesiones por Día */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Sesiones por día</Text>
        <BarChart
          data={{
            labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
            datasets: [{
              data: dailyData,
            }],
          }}
          width={screenWidth - 15}
          height={220}
          chartConfig={{
            ...sharedChartConfig,
            barPercentage: 0.4,
            fillShadowGradient: "#007AFF",
            propsForLabels: {
              ...sharedChartConfig.propsForLabels,
              dx: -1,
            },
          }}
          verticalLabelRotation={0}
          fromZero
          style={[styles.chart, { marginLeft: -25 }]}
          showValuesOnTopOfBars={true}
        />
      </View>

     {/* Gráfico de Distribución de ejercicios */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Distribución de ejercicios</Text>
        <PieChart
          data={getMuscleGroupsChartData()}
          width={screenWidth - 32}
          height={220}
          chartConfig={sharedChartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          center={[10, 10]}
          absolute
          style={styles.chart}
          avoidFalseZero
        />
      </View>

      {/* Gráfico de Progreso general */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Progreso general</Text>
        <ProgressChart
          data={getExerciseTypesChartData()}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            ...sharedChartConfig,
            color: (opacity = 1, index) => [
              `rgba(255, 99, 132, ${opacity})`,
              `rgba(54, 162, 235, ${opacity})`,
              `rgba(255, 206, 86, ${opacity})`,
              `rgba(75, 192, 192, ${opacity})`
            ][index],
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  chartContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    overflow: "visible",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  chart: {
    borderRadius: 12,
    overflow: "visible",
  },
});

export default StatsScreen;
