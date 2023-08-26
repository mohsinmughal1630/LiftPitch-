import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppColors, hv, normalized} from '../../../../utils/AppConstants';

const NoMoreChat = props => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.message}>{props?.message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.grey.grey,
    height: normalized(30),
    alignItems: 'center',
  },
  message: {
    color: AppColors.grey.grey,
    justifyContent: 'center',
  },
});
export default NoMoreChat;
