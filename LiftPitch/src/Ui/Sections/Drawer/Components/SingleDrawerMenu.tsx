import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import {
  AppColors,
  hv,
  normalized,
  AppImages,
  isSmallDevice,
} from '../../../../Utils/AppConstants';
import LinearGradient from 'react-native-linear-gradient';
import {AppStyles} from '../../../../Utils/AppStyles';

interface Props {
  onPress: () => void;
  title: any;
  image: any;
  containerStyle?: any;
  selected: boolean;
}

const SingleDrawerMenu = (props: Props) => {
  const colorsList = props.selected
    ? [AppColors.green.primaryLight, AppColors.primaryGreen]
    : ['transparent', 'transparent'];
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.7, y: 0}}
        colors={colorsList}
        style={[
          styles.main,
          props.selected && styles.shadowStyle,
          props.containerStyle,
        ]}>
        <View
          style={{
            width: normalized(50),
            height: normalized(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={props.image}
            resizeMode="contain"
            style={{
              tintColor: props.selected
                ? AppColors.white.white
                : AppColors.dark.darkLevel1,
              width: normalized(18),
              height: normalized(18),
            }}
          />
        </View>
        <Text
          style={[
            styles.title,
            {
              color: props.selected
                ? AppColors.white.white
                : AppColors.dark.darkLevel1,
            },
          ]}>
          {props.title}
        </Text>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default SingleDrawerMenu;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    height: isSmallDevice ? hv(55) : hv(45),
    borderRadius: 25,
  },
  shadowStyle: {
    shadowColor: AppColors.green.primaryLight,
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 10,
  },
  title: {
    ...AppStyles.textSemiBold,
    color: AppColors.white.white,
  },
});
