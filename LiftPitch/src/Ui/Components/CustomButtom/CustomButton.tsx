import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {AppColors, normalized} from '../../../Utils/AppConstants';

interface Props {
  label: string;
  mainContainer?: any;
  labelStyle?: any;
  onPressBtn: any;
}

const CustomFilledBtn = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (props?.onPressBtn) {
          props.onPressBtn();
        }
      }}
      style={{...styles.container, ...props.mainContainer}}>
      <Text style={{...styles.label, ...props.labelStyle}}>
        {props?.label.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#502165',
    width: normalized(340),
    height: normalized(55),
    borderRadius: normalized(12),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: normalized(16),
    color: AppColors.white.white,
  },
});

export default CustomFilledBtn;
