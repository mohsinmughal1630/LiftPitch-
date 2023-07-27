import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Platform,
  Text,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTab} from '../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {
  AppColors,
  AppImages,
  bottomBarHeightConstant,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import CommonDataManager from '../../../Utils/CommonManager';

const MiddleFunctionComp = (props: any) => {
  const dispatch = useDispatch();
  const {isNotchDevice} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const notchOrAndroid = isNotchDevice || Platform.OS == 'android';
  const mainSize = normalized(notchOrAndroid ? 80 : 70);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.navigation.popToTop();
        dispatch(setTab(2));
      }}>
      <View
        style={[
          AppStyles.barStyle,
          {
            minHeight: normalized(40),
            minWidth: normalized(50),
            justifyContent: 'flex-end',
          },
        ]}>
        <View
          style={{
            height: hv(22),
            width: hv(22),
          }}>
          <Pressable
            onPress={() => {
              props.navigation.popToTop();
              dispatch(setTab(2));
            }}
            style={[
              styles.main,
              {
                width: mainSize,
                height: mainSize,
                position: 'absolute',
                right: -(mainSize - hv(22)) / 2,
                left: -(mainSize - hv(22)) / 2,
                bottom: 0.08 * bottomBarHeightConstant,
              },
            ]}>
            <View
              style={[
                AppStyles.barStyle,
                styles.innerIconView,
                {
                  width: normalized(notchOrAndroid ? 60 : 50),
                  height: normalized(notchOrAndroid ? 60 : 50),
                },
                styles.shadowStyle,
              ]}>
              <Image
                style={[
                  styles.img,
                  {
                    height: normalized(notchOrAndroid ? 25 : 22),
                    width: normalized(notchOrAndroid ? 25 : 22),
                  },
                ]}
                source={AppImages.Container.BottomBar.SoloFunctionIcon}
              />
            </View>
          </Pressable>
        </View>
        <Text style={props.isActive ? AppStyles.barText1 : AppStyles.barText}>
          {CommonDataManager.getSharedInstance().capitalizeFirstLetter(
            props.obj.title,
          )}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MiddleFunctionComp;

const styles = StyleSheet.create({
  main: {
    backgroundColor: AppColors.black.darkDeep,
    borderRadius: normalized(40),
    // marginTop: -hv(60),
    ...AppStyles.barStyle,
  },
  innerIconView: {
    borderRadius: normalized(30),
    backgroundColor: AppColors.primaryGreen,
  },
  shadowStyle: {
    shadowColor: AppColors.green.primaryLight,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.48,
    shadowRadius: 12.0,

    elevation: 20,
  },
  img: {
    ...AppStyles.barImageStyle,
    height: normalized(25),
    width: normalized(25),
    tintColor: AppColors.white.white,
  },
});
