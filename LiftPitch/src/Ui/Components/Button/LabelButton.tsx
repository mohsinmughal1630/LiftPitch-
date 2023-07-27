import React from 'react';
import {View, Text, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import {AppColors, AppFonts, hv, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';

interface Props {
  title: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  fontSize?: number;
  disabled?: boolean;
  textStyle?: TextStyle;
}

const LabelButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled ? props.disabled : false}
      activeOpacity={1}>
      <View style={[props.containerStyle]}>
        <Text
          style={{
            color: props.disabled
              ? AppColors.dark.darkLevel1
              : AppColors.primaryGreen,
            fontSize: props.fontSize ? props.fontSize : normalized(14),
            ...AppStyles.textSemiBold,
            ...props.textStyle,
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default LabelButton;
