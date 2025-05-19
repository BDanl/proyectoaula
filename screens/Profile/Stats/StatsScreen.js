import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;


const StatsScreen = ({ navigation }) => {
  // Configuración común mejorada
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
      dx: -5, // Desplazamiento horizontal de labels
    },
    style: {
      borderRadius: 16,
      marginLeft: -15, // Compensación izquierda
    },
  };

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
            labels: [
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Sep",
              "Oct",
              "Nov",
              "Dic",
            ],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43, 50, 60, 70, 80, 90, 100],
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              },
            ],
          }}
          width={screenWidth - 10} // Ajuste fino del ancho
          height={220}
          chartConfig={{
            ...sharedChartConfig,
            propsForLabels: {
              ...sharedChartConfig.propsForLabels,
              fontSize: 8, // Tamaño reducido para caber todos
            },
          }}
          bezier
          withHorizontalLabels={true}
          withVerticalLabels={true}
          style={[styles.chart, { marginLeft: -20 }]} // Mayor compensación
        />
      </View>

      {/* Gráfico de Sesiones por Día - AJUSTE DE ANCHO */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Sesiones por día</Text>
        <BarChart
          data={{
            labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
            datasets: [
              {
                data: [15, 20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={screenWidth - 15}
          height={220}
          chartConfig={{
            ...sharedChartConfig,
            barPercentage: 0.4, // Barras más delgadas
            fillShadowGradient: "#007AFF",
            propsForLabels: {
              ...sharedChartConfig.propsForLabels,
              dx: -1, // Mayor desplazamiento izquierdo
            },
          }}
          verticalLabelRotation={0} // Labels horizontales
          fromZero
          style={[styles.chart, { marginLeft: -25 }]} // Compensación adicional
          showValuesOnTopOfBars={true}
        />
      </View>

      {/* Resto de gráficos (se mantienen igual) */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Distribución de ejercicios</Text>
        <PieChart
          data={[
            {
              name: "Pecho",
              population: 25,
              color: "#FF6384",
              legendFontColor: "#FFF", // Color blanco para mejor contraste
              legendFontSize: 12, // Tamaño aumentado
            },
            {
              name: "Piernas",
              population: 20,
              color: "#36A2EB",
              legendFontColor: "#FFF",
              legendFontSize: 12,
            },
            {
              name: "Espalda",
              population: 30,
              color: "#FFCE56",
              legendFontColor: "#FFF",
              legendFontSize: 12,
            },
            {
              name: "Brazos",
              population: 15,
              color: "#4BC0C0",
              legendFontColor: "#FFF",
              legendFontSize: 12,
            },
          ]}
          width={screenWidth - 32}
          height={220} // Altura aumentada
          chartConfig={{
            ...sharedChartConfig,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0" // Eliminamos padding izquierdo
          center={[10, 10]} // Ajuste de posición central
          absolute
          style={styles.chart}
          avoidFalseZero
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Progreso general</Text>
        <ProgressChart
          data={{
            labels: ["Fuerza", "Resistencia", "Flexibilidad", "Cardio"],
            data: [0.7, 0.5, 0.3, 0.8],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            ...sharedChartConfig,
            color: (opacity = 1, index) =>
              [
                `rgba(255, 99, 132, ${opacity})`,
                `rgba(54, 162, 235, ${opacity})`,
                `rgba(255, 206, 86, ${opacity})`,
                `rgba(75, 192, 192, ${opacity})`,
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
    overflow: "visible", // Permite que los labels se extiendan
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
