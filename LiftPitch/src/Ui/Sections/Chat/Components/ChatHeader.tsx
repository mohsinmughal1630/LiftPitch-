import React, { useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import { AppHorizontalMargin, AppStyles } from '../../../../Utils/AppStyles';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import ProfilePlaceHolderComp from '../../../Components/ProfileView/ProfilePlaceHolderComp';
const ChatHeader = (props: any) => {
  return (
    <>
      {/* {props.showBorder ? (
        <View style={[styles.line, {marginTop: hv(7)}]} />
      ) : null} */}
      <View style={[styles.maincontainer, props?.mainStyle]}>
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (props?.atBackPress) {
                  props?.atBackPress();
                }
              }}
              style={{
                paddingVertical: normalized(7),
              }}>
              <Image
                source={AppImages.Auth.backIcon}
                style={{ tintColor: AppColors.black.black }}
              />
            </TouchableOpacity>
            {props?.profile?.length > 0 ? (
              <AppImageViewer
                source={{ uri: props?.profile }}
                placeHolder={AppImages.bottomBar.Profile}
                style={{ ...styles.img, ...props.imgStyle }}
              />
            ) : (
              <ProfilePlaceHolderComp
                index={0}
                name={props?.title ? props?.title : 'Testing'}
                mainStyles={{ ...styles.img, ...props.imgStyle }}
                nameStyles={{
                  fontSize: normalized(16),
                  ...AppStyles.textMedium
                }}
              />
            )}
            <Text style={styles.title}>{props?.title}</Text>
          </View>

          {props?.atRightBtn ? (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                paddingHorizontal: normalized(8),
              }}
              onPress={() => {
                props?.atRightBtn();
              }}>
              {props?.rightTxt ? (
                <Text style={styles.rightTxt}>{props?.rightTxt}</Text>
              ) : (
                <Image
                  source={AppImages.Common.menuIcon}
                  style={{
                    tintColor: AppColors.black.black,
                  }}
                />
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
    paddingVertical: hv(10),
  },
  title: {
    color: '#1E1E1F',
    fontSize: normalized(18),
    ...AppStyles.textMedium
  },
  line: {
    height: 0.8,
    backgroundColor: '#E8E6EA',
    marginTop: hv(5),
  },
  rightTxt: {
    fontSize: normalized(14),
    color: AppColors.black.black,
    ...AppStyles.textRegular
  },
  img: {
    height: normalized(40),
    width: normalized(40),
    borderRadius: normalized(40 / 2),
    marginHorizontal: normalized(10),
  },
});
export default ChatHeader;
