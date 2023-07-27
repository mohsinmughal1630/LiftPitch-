import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppColors, hv, normalized} from '../../../../Utils/AppConstants';

interface Props {
  pic: any;
  txt: string;
  onPress: () => void;
}

const PersonalInfo = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.mainContainer}
      onPress={props.onPress}>
      <Image source={props.pic} style={styles.pic} resizeMode="contain" />
      <Text numberOfLines={2} style={styles.txt}>
        {props.txt}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 6,
    width: normalized(105),
    minHeight: hv(62),
    backgroundColor: AppColors.dark.darkLevel6,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 6,
    borderRadius: 10,
    borderColor: AppColors.dark.darkLevel3,
    borderWidth: 0.5,
  },
  pic: {
    tintColor: AppColors.dark.darkLevel1,
    marginVertical: hv(4),
    height: 15,
    width: 15,
  },
  txt: {
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(9),
    textAlign: 'center',
    marginVertical: hv(3),
    // top: hv(5),
  },
});
export default PersonalInfo;
