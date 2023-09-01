import React, {useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppHorizontalMargin} from '../../../Utils/AppStyles';
const CustomHeader = (props: any) => {
  return (
    <>
      {props.showBorder ? (
        <View style={[styles.line, {marginTop: hv(7)}]} />
      ) : null}
      <View style={[styles.maincontainer, props?.mainStyle]}>
        <>
          {props?.atBackPress ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  props?.atBackPress();
                }}
                style={{
                  marginEnd: normalized(10),
                  paddingVertical: normalized(7),
                }}>
                <Image
                  source={AppImages.Auth.backIcon}
                  style={{tintColor: AppColors.black.black}}
                />
              </TouchableOpacity>
              <Text style={styles.title}>{props?.title}</Text>
            </View>
          ) : (
            <View style={{margin: 10}} />
          )}
          {props?.atBackPress ? null : (
            <Text style={styles.title}>{props?.title}</Text>
          )}
          {props.rightComponent ? (
            props.rightComponent()
          ) : props?.atRightBtn ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props?.atRightBtn();
              }}>
              {props?.rightTxt ? (
                <Text style={[styles.rightTxt, props?.rigthBtnStyle]}>
                  {props?.rightTxt}
                </Text>
              ) : (
                <></>
              )}
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </>
      </View>
      {props.showBorder ? <View style={styles.line} /> : null}
    </>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: AppColors.white.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: AppHorizontalMargin,
    alignItems: 'center',
    paddingVertical: hv(15),
  },
  title: {
    color: '#1E1E1F',
    fontSize: normalized(18),
    fontWeight: '500',
  },
  line: {
    height: 0.5,
    backgroundColor: AppColors.white.white,
    marginTop: hv(5),
  },
  rightTxt: {
    fontSize: normalized(14),
    color: AppColors.black.black,
    fontWeight: '500',
  },
});
export default CustomHeader;
