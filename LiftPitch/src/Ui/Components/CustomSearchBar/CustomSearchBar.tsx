import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppColors, AppImages, normalized} from '../../../Utils/AppConstants';
import {AppHorizontalMargin, AppStyles} from '../../../Utils/AppStyles';
const CustomSearchBar = (props: any) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.mainContainer, props?.mainStyle]}
      onPress={() => {
        props?.atPress();
      }}>
      <Image
        source={AppImages.Common.HeaderSearch}
        resizeMode="contain"
        style={styles.sendImg}
      />

      <Text
        style={[
          styles.input,
          {
            marginStart: normalized(13),
            color: AppColors.grey.dimGrey,
            alignSelf: 'center',
          },
        ]}>
        {props?.placeHolder}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.white.white,
    paddingHorizontal: normalized(10),
    flexDirection: 'row',
    width: '100%',
    borderRadius: normalized(10),
    borderWidth: 1,
    borderColor: AppColors.grey.simple,
    alignItems: 'center',
    padding: AppHorizontalMargin,
  },
  input: {
    color: AppColors.black.black,
    fontSize: normalized(14),
    flex: 1,
    height: '100%',
    ...AppStyles.textRegular,
  },
  sendImgBox: {
    paddingHorizontal: normalized(10),
  },
  sendImg: {
    height: 20,
    width: 20,
  },
  voiceBox: {
    height: 45,
    width: 30,
    ...AppStyles.centeredCommon,
  },
  voiceImg: {
    height: 25,
    width: 25,
  },
  attachmentImg: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
});
