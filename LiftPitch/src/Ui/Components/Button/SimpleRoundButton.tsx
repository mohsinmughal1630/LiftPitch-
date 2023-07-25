import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  View,
} from 'react-native';
import {
  AppColors,
  AppFonts,
  formFieldsHeight,
  isSmallDevice,
  normalized,
} from '../../../Utils/AppConstants';

interface Props {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  outlined?: boolean;
  titleStyle?: TextStyle;
  isDisabled?: boolean;
  btnStyle?: ViewStyle;
}

const SimpleRoundButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={1}
      style={props.containerStyle}
      disabled={props.isDisabled ? true : false}>
      <View
        style={[
          styles.mainContainer,
          {
            backgroundColor: props.outlined
              ? 'tranparent'
              : props.isDisabled
              ? AppColors.dark.darkLevel6
              : AppColors.primaryGreen,
            borderWidth: props.outlined ? 2 : 0,
          },
          props.btnStyle,
        ]}>
        <Text
          style={[
            styles.title,
            {
              color: props.outlined
                ? AppColors.primaryGreen
                : props.isDisabled
                ? AppColors.dark.darkLevel3
                : AppColors.white.white,
            },
            props.titleStyle,
          ]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SimpleRoundButton;

const styles = StyleSheet.create({
  mainContainer: {
    height: formFieldsHeight,
    minWidth: normalized(150),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalized(10),
    borderRadius: 40,
    borderColor: AppColors.primaryGreen,
  },
  title: {
    fontSize:
      Platform.OS == 'ios' && !isSmallDevice ? normalized(17) : normalized(16),
    fontFamily: AppFonts.SemiBold,
  },
});
