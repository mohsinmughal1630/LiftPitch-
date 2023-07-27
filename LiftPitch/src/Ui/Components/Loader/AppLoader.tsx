import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {AppColors} from '../../../Utils/AppConstants';

const AppLoader = () => {
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={AppColors.transparentColor}
      />
      <SafeAreaView />
      <View style={styles.loaderBox}>
        <ActivityIndicator color={AppColors.primaryGreen} size="large" />
      </View>
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  main: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AppColors.transparentColor,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loaderBox: {
    backgroundColor: AppColors.white.white,
    borderRadius: 20,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
