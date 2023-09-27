import React, {useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppHorizontalMargin, AppStyles} from '../../../Utils/AppStyles';
import AppImageViewer from '../ProfileView/AppImageView';
import ProfilePlaceHolderComp from '../ProfileView/ProfilePlaceHolderComp';
import {USER_TYPE} from '../../../Utils/Strings';
import CommonDataManager from '../../../Utils/CommonManager';
const ProfileHeader = (props: any) => {
  return (
    <View style={styles.maincontainer}>
      <View style={styles.childCont}>
        {props?.profileType !== USER_TYPE.owner ? (
          <TouchableOpacity
            onPress={() => {
              props?.atBackPress();
            }}>
            <Image
              source={AppImages.Auth.backIcon}
              style={{
                tintColor: AppColors.white.white,
                marginEnd: normalized(10),
              }}
            />
          </TouchableOpacity>
        ) : null}

        {props?.data?.companyLogo?.length > 0 ? (
          <AppImageViewer
            source={{uri: props?.data?.companyLogo}}
            placeHolder={AppImages.bottomBar.Profile}
            style={{...styles.img, ...props.imgStyle}}
          />
        ) : (
          <ProfilePlaceHolderComp
            index={props.index}
            name={props?.data?.userName ? props?.data?.userName : 'Testing'}
            mainStyles={{...styles.img, ...props.imgStyle}}
            nameStyles={{
              fontSize: normalized(16),
              ...AppStyles.textMedium,
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            marginHorizontal: normalized(5),
          }}>
          <Text style={styles.userNameTxt}>
            {CommonDataManager.getSharedInstance().capitalizeFirstLetter(
              props?.data?.userName,
            )}
          </Text>
          <Text numberOfLines={2} style={styles.des}>
            {props?.data?.companyType}
          </Text>
        </View>
      </View>
      {props?.atRightBtn ? (
        props?.profileType == USER_TYPE.owner ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props?.atRightBtn();
            }}>
            <Image source={AppImages.Common.Setting} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.followBtn}
            onPress={() => {
              props?.atRightBtn();
            }}>
            <Text style={styles.followBtnTxt}>
              {props?.isFollow ? `Following` : `Follow`}
            </Text>
          </TouchableOpacity>
        )
      ) : (
        <View />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: AppColors.red.mainColor,
    height: normalized(120),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: AppHorizontalMargin,
    borderBottomLeftRadius: normalized(25),
    borderBottomRightRadius: normalized(25),
  },
  childCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    color: '#1E1E1F',
    fontSize: normalized(18),
    ...AppStyles.textMedium,
  },
  line: {
    height: 0.5,
    backgroundColor: AppColors.white.white,
    marginTop: hv(5),
  },
  rightTxt: {
    fontSize: normalized(14),
    color: AppColors.black.black,
  },
  img: {
    height: normalized(55),
    width: normalized(55),
    borderRadius: normalized(55 / 2),
  },
  followBtnTxt: {
    fontSize: normalized(12),
    ...AppStyles.textMedium,
    color: AppColors.red.mainColor,
  },
  followBtn: {
    backgroundColor: AppColors.white.white,
    paddingHorizontal: normalized(10),
    paddingVertical: normalized(8),
    borderRadius: normalized(5),
  },
  des: {
    fontSize: normalized(12),
    ...AppStyles.textRegular,
    color: AppColors.white.white,
  },
  userNameTxt: {
    fontSize: normalized(16),
    ...AppStyles.textSemiBold,
    color: AppColors.white.white,
  },
});
export default ProfileHeader;
