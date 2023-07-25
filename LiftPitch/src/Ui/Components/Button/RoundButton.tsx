import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  View,
  Image,
} from 'react-native';
import {
  AppColors,
  AppFonts,
  formFieldsHeight,
  isSmallDevice,
  normalized,
} from '../../../Utils/AppConstants';
import LinearGradient from 'react-native-linear-gradient';
import {AppStyles} from '../../../Utils/AppStyles';

interface Props {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  outlined?: boolean;
  titleStyle?: TextStyle;
  isDisabled?: boolean;
  btnStyle?: ViewStyle;
  isLightDisable?: boolean; // for color adjustment when button is disabled,
  icon?: any;
}

const RoundButton = (props: Props) => {
  const disabledBgColor = props.isLightDisable
    ? AppColors.dark.darkLevel4
    : AppColors.dark.darkLevel6;

  const colorsList = !props.outlined
    ? props.isDisabled
      ? [disabledBgColor, disabledBgColor]
      : [AppColors.green.primaryLightButton, AppColors.primaryGreen]
    : ['transparent', 'transparent'];
  const disabledTxtColor = props.isLightDisable
    ? AppColors.dark.darkLevel1
    : AppColors.dark.darkLevel3;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={1}
      style={props.containerStyle}
      disabled={props.isDisabled ? true : false}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.7, y: 0}}
        colors={colorsList}
        style={[
          styles.mainContainer,
          {
            backgroundColor: props.outlined
              ? 'tranparent'
              : props.isDisabled
              ? disabledBgColor
              : AppColors.primaryGreen,
            borderWidth: props.outlined ? 2 : 0,
          },
          props.btnStyle,
        ]}>
        <View style={AppStyles.horiCommon}>
          {props.icon && (
            <Image
              source={props.icon}
              resizeMode="contain"
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.title,
              {
                color: props.outlined
                  ? AppColors.primaryGreen
                  : props.isDisabled
                  ? disabledTxtColor
                  : AppColors.white.white,
              },
              props.titleStyle,
            ]}>
            {props.title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default RoundButton;

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
  icon: {
    height: 25,
    width: 30,
    tintColor: AppColors.white.white,
    marginRight: 6,
  },
});
