import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const MuscleDistributionChart = ({ muscleGroupsData }) => {
  const getChartData = () => {
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
          legendFontSize: 12
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
        legendFontSize: 12
      }));
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 10 }}>
        Distribución de ejercicios
      </Text>
      <PieChart
        data={getChartData()}
        width={screenWidth - 40}
        height={200}
        chartConfig={{
          backgroundColor: "#000",
          backgroundGradientFrom: "#1a1a1a",
          backgroundGradientTo: "#2d2d2d",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 10]}
        absolute
        style={{
          borderRadius: 16,
          marginVertical: 8,
        }}
      />
    </View>
  );
};

export default MuscleDistributionChart;