import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { AppColors, AppImages, normalized } from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';
const CustomSearchBar = (props: any) => {
  return (
    <View style={[styles.mainContainer, props?.mainStyle]}>
      <Image
        source={AppImages.Common.HeaderSearch}
        resizeMode="contain"
        style={styles.sendImg}
      />
      <TextInput
        placeholder={props?.placeHolder}
        placeholderTextColor={AppColors.grey.dimGrey}
        value={props?.value}
        onChangeText={(txt: any) => {
          props?.atChangeTxt(txt);
        }}
        style={[styles.input, { marginLeft: 10 }]}
      />
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.white.white,
    height: normalized(55),
    paddingHorizontal: normalized(10),
    ...AppStyles.horiCommon,
    width: '100%',
    borderRadius: normalized(10),
    borderWidth: 1,
    borderColor: AppColors.grey.simple,
  },
  input: {
    color: AppColors.black.black,
    fontSize: normalized(14),
    flex: 1,
    height: '100%',
    ...AppStyles.textRegular
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
