import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {setShowToast} from '../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {AppColors, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import CommonDataManager from '../../../Utils/CommonManager';

const ToastComp = () => {
  const timeOfAction = 700;
  const dispatch = useDispatch();
  const {showToast} = useSelector((state: AppRootStore) => state.AppReducer);
  useEffect(() => {
    changeView();
    const t = setTimeout(() => {
      changeView(true);
    }, timeOfAction + 2500);
    return () => clearTimeout(t);
  }, []);
  const opacityOffset = useSharedValue(0);
  const changeView = (close = false) => {
    if (close) {
      opacityOffset.value = withTiming(0, {
        duration: timeOfAction,
      });
      setTimeout(() => {
        dispatch(setShowToast(''));
      }, timeOfAction);
    } else {
      opacityOffset.value = withTiming(1, {
        duration: timeOfAction,
      });
    }
  };
  const viewStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityOffset.value,
    };
  });

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        justifyContent: 'flex-end',
        paddingBottom: 80,
        alignItems: 'center',
      }}>
      <Animated.View
        style={[
          {
            backgroundColor: AppColors.grey.toastColor,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: normalized(10),
            paddingVertical: 8,
            borderRadius: 8,
            zIndex: 15,
          },
          viewStyles,
        ]}>
        <Text
          style={{
            color: AppColors.white.white,
            ...AppStyles.textRegular,
            fontSize: normalized(12),
          }}>
          {CommonDataManager.getSharedInstance().capitalizeFirstLetter(
            showToast,
          )}
        </Text>
      </Animated.View>
    </View>
  );
};
export default ToastComp;
