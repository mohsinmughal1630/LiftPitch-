import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AppColors, hv, normalized} from '../../../Utils/AppConstants';

interface Props {
  value: boolean;
  onToggle: (val: boolean) => void;
  switchStyle?: any;
  outerContainerStyle?: ViewStyle;
}

const switchWidth = normalized(50);

const AppSwitch = (props: Props) => {
  const switchOffset = useSharedValue(
    props.value ? switchWidth / 2 - normalized(10) : 0,
  );
  useEffect(() => {
    changeSwitch();
  }, [props.value]);
  const changeSwitch = () => {
    switchOffset.value = withTiming(
      props.value ? switchWidth / 2 - normalized(10) : 0,
    );
  };
  const swtichMoveStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: switchOffset.value,
        },
      ],
    };
  });
  return (
    <TouchableWithoutFeedback onPress={() => props.onToggle(!props.value)}>
      <View style={props.outerContainerStyle}>
        <View
          style={[
            styles.main,
            {
              backgroundColor: props.value
                ? AppColors.primaryGreen
                : AppColors.dark.darkLevel1,
            },
          ]}>
          <Animated.View style={[styles.switchStyle, swtichMoveStyle]} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default AppSwitch;

const styles = StyleSheet.create({
  main: {
    width: switchWidth - normalized(10),
    height: switchWidth / 2,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: normalized(2),
  },
  switchStyle: {
    width: switchWidth / 2 - normalized(4),
    backgroundColor: AppColors.white.white,
    height: switchWidth / 2 - normalized(4),
    borderRadius: normalized(15),
  },
});
