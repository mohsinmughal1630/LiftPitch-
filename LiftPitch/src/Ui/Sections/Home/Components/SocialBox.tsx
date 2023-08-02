import React from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AppStyles} from '../../../../Utils/AppStyles';
import {
  AppColors,
  AppImages,
  shareOptionsList,
} from '../../../../Utils/AppConstants';

interface Props {
  onOptionClick: (val: string) => void;
}

const SocialBox = (props: Props) => {
  const rotationDegree = useSharedValue(180);
  const optionsHeight = useSharedValue(0);
  const opacityOffset = useSharedValue(0);
  const toggleOptions = () => {
    if (rotationDegree.value == 180) {
      rotationDegree.value = withTiming(0);
      optionsHeight.value = withTiming(100);
      opacityOffset.value = withTiming(1);
    } else {
      rotationDegree.value = withTiming(180);
      optionsHeight.value = withTiming(0);
      opacityOffset.value = withTiming(0);
    }
  };
  const optionsStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotationDegree.value}deg`,
        },
      ],
    };
  });
  const optionsHeightStyles = useAnimatedStyle(() => {
    return {
      height: optionsHeight.value,
      opacity: opacityOffset.value,
    };
  });
  return (
    <View style={styles.mainStyles}>
      <Animated.View style={[styles.listBox, optionsHeightStyles]}>
        {shareOptionsList.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => props.onOptionClick(item.type)}>
              <View style={styles.singleShareBox}>
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={styles.singleShareIcon}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </Animated.View>
      <TouchableWithoutFeedback onPress={toggleOptions}>
        <View style={styles.mainDropDownBox}>
          <Animated.Image
            source={AppImages.Common.DropDownIcon}
            resizeMode="contain"
            style={[styles.mainDropDownImg, optionsStyles]}></Animated.Image>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SocialBox;

const styles = StyleSheet.create({
  mainStyles: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  mainDropDownBox: {
    backgroundColor: AppColors.red.mainColor,
    ...AppStyles.centeredCommon,
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
  mainDropDownImg: {
    height: 20,
    width: 20,
    tintColor: AppColors.white.white,
  },
  listBox: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  singleShareBox: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: AppColors.red.mainColor,
    ...AppStyles.centeredCommon,
  },
  singleShareIcon: {
    height: 15,
    width: 15,
    tintColor: AppColors.white.white,
  },
});
