import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {setNotificationObj} from '../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
  ScreenSize,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';

const heightConstant = ScreenSize.height;

const NotificationPopup = () => {
  const dispatch = useDispatch();
  const postionOffset = useSharedValue(-heightConstant);
  const {notificationObj}: any = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  useEffect(() => {
    movePopup();
    setTimeout(() => {
      movePopup(true);
    }, 3000);
  }, []);

  const movePopup = (close = false) => {
    if (close) {
      postionOffset.value = withTiming(-heightConstant);
      setTimeout(() => {
        dispatch(setNotificationObj(null));
      }, 500);
    } else {
      postionOffset.value = withTiming(0);
    }
  };

  const boxStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: postionOffset.value,
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.parentBox, boxStyles]}>
      <SafeAreaView />
      <View style={styles.mainBox}>
        <View style={styles.logoContainer}>
          <Image
            source={AppImages.Common.RoundAppIcon}
            style={styles.logoImg}
          />
          <Text style={styles.logoTxt}>NFC</Text>
        </View>
        <Text numberOfLines={1} style={styles.title}>
          {notificationObj ? notificationObj?.title : '-'}
        </Text>
        <Text numberOfLines={3} style={styles.body}>
          {notificationObj ? notificationObj?.message : '-'}
        </Text>
      </View>
    </Animated.View>
  );
};

export default NotificationPopup;

const styles = StyleSheet.create({
  parentBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    ...AppStyles.shadowCommon,
  },
  mainBox: {
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(20),
    marginHorizontal: normalized(20),
    ...AppStyles.shadowCommon,
    overflow: 'hidden',
    paddingHorizontal: normalized(20),
    paddingVertical: hv(20),
    marginTop: 2,
    zIndex: 10,
  },
  title: {
    ...AppStyles.textSemiBold,
    color: AppColors.dark.darkLevel6,
    fontSize: normalized(16),
  },
  body: {
    ...AppStyles.textRegular,
    color: AppColors.dark.darkLevel2,
    fontSize: normalized(14),
  },
  logoContainer: {
    ...AppStyles.horiCommon,
  },
  logoImg: {
    height: 15,
    width: 15,
  },
  logoTxt: {
    ...AppStyles.textRegular,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(14),
    marginLeft: normalized(5),
    marginTop: 2,
  },
});
