import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {
  AppColors,
  AppImages,
  ScreenSize,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import {LineChart} from 'react-native-chart-kit';

const barWidth = ScreenSize.width - normalized(60);
const barHeight = 200;

const CurveGraph = () => {
  const data = [10, 0, 30, 50, 60, 20, 50];
  const chartConfig = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(80, 33, 101, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View
      style={{
        marginTop: 20,
        width: barWidth,
      }}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          ...AppStyles.centeredCommon,
          zIndex: 1,
        }}>
        <Image
          source={AppImages.Common.PurpleShadowBg}
          style={{
            width: 250,
            height: 250,
            borderRadius: 40,
          }}
        />
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: normalized(14),
          ...AppStyles.textBold,
          marginBottom: 20,
        }}>
        Weekly Challenge
      </Text>
      <LineChart
        data={{
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              data: data,
              strokeWidth: 6,
            },
          ],
        }}
        width={barWidth}
        height={barHeight}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        bezier
        withDots={false}
      />
    </View>
  );
};

export default CurveGraph;
