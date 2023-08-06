import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppColors, normalized} from '../../../Utils/AppConstants';
const HeaderTab = (props: any) => {
  return (
    <View style={[styles.mainContainer, props?.mainStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          props?.atSelectTab(0);
        }}>
        <Text
          style={props?.selectTab == 0 ? styles.tabTxtSelected : styles.tabTxt}>
          {props?.tabTxt1}
        </Text>
      </TouchableOpacity>
      <View style={styles.simpleLine} />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          props?.atSelectTab(1);
        }}>
        <Text
          style={props?.selectTab == 1 ? styles.tabTxtSelected : styles.tabTxt}>
          {props?.tabTxt2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTxt: {
    fontSize: normalized(14),
    fontWeight: '500',
    color: AppColors.black.black,
    alignSelf: 'center',
    textAlign: 'center',
  },
  tabTxtSelected: {
    fontSize: normalized(16),
    fontWeight: '700',
    color: AppColors.black.black,
    alignSelf: 'center',
    textAlign: 'center',
  },
  simpleLine: {
    height: normalized(15),
    width: normalized(2),
    backgroundColor: AppColors.grey.towerGrey,
    marginHorizontal: normalized(20),
  },
});

export default HeaderTab;
