import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppColors, normalized } from '../../../../Utils/AppConstants';
const SocialBtn = (props: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props?.atPress();
      }}
      style={[styles.mainBtn, props.containerStyle]}>
      <Image source={props?.icon} />
      <Text style={styles.label}>{props?.label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: normalized(60),
    width: normalized(160),
    borderRadius: normalized(12),
    backgroundColor: AppColors.white.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  label: {
    fontSize: normalized(13),
    fontWeight: '500',
    color: AppColors.black.black,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default SocialBtn;
