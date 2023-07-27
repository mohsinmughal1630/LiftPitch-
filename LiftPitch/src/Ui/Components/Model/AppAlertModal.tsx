import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {
  AppColors,
  hv,
  isSmallDevice,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import RoundButton from '../Button/RoundButton';
import {setAlertObj} from '../../../Redux/reducers/AppReducer';
const {width, height} = Dimensions.get('window');
const AppAlertModal = () => {
  const dispatch = useDispatch();
  const {alertObj}: any = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const viewOffset = useSharedValue(height);
  useEffect(() => {
    viewOffset.value = withTiming(0, {
      duration: 500,
    });
    const alertTimeout = setTimeout(() => {
      closeModal();
    }, 8000);
    return () => clearTimeout(alertTimeout);
  }, []);
  const boxMoveStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: viewOffset.value,
        },
      ],
    };
  });
  const closeModal = () => {
    viewOffset.value = withTiming(height, {
      duration: 500,
    });
    setTimeout(() => {
      dispatch(setAlertObj(null));
    }, 500);
  };
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={AppColors.transparentColor}
      />
      <Animated.View style={[styles.popup, boxMoveStyle]}>
        <Text style={styles.title}>{alertObj?.title}</Text>
        <Text numberOfLines={4} style={styles.message}>
          {alertObj?.message}
        </Text>
        <RoundButton
          title="OK"
          onPress={closeModal}
          containerStyle={{
            marginTop: hv(30),
            marginBottom: hv(30),
          }}
          btnStyle={{
            height: isSmallDevice ? hv(60) : hv(50),
          }}
        />
      </Animated.View>
    </View>
  );
};

export default AppAlertModal;

const styles = StyleSheet.create({
  main: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AppColors.transparentColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: AppColors.white.white,
    alignItems: 'center',
    width: width * 0.7,
    borderRadius: 15,
    paddingHorizontal: normalized(10),
  },
  title: {
    ...AppStyles.textSemiBold,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(18),
    marginTop: hv(30),
  },
  message: {
    ...AppStyles.textRegular,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(14),
    textAlign: 'center',
  },
});
