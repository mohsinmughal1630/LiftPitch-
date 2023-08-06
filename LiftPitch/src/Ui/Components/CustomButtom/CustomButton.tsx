import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {AppColors, normalized} from '../../../Utils/AppConstants';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  label: string;
  mainContainer?: any;
  labelStyle?: any;
  onPressBtn: any;
}

const CustomFilledBtn = (props: Props) => {
  const colorsList = [AppColors.gradient.dark, AppColors.gradient.light];
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (props?.onPressBtn) {
          props.onPressBtn();
        }
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.8}}
        colors={colorsList}
        style={[styles.container, props.mainContainer]}>
        <Text style={[styles.label, props.labelStyle]}>
          {props?.label.toUpperCase()}
        </Text>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
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
