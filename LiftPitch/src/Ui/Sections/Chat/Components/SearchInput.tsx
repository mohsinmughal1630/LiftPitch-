import React from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import {
  AppColors,
  AppFonts,
  AppImages,
  hv,
  normalized,
} from '../../../../utils/AppConstants';

interface Props {
  containerStyle?: any;
  onGetAddress?: any;
  onChangeTxt?: any;
  value?: any;
  placeHolder: any;
  placeHolderColor?: any;
  onPressLastIcon?: any;
}

const SearchInput = (props: Props) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <TextInput
        style={styles.input}
        onChangeText={props.onChangeTxt}
        value={props.value}
        placeholder={props.placeHolder}
        placeholderTextColor={props.placeHolderColor}
      />

      <Image
        source={AppImages.Auth.searchImg}
        style={styles.imageStyle}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: AppColors.gray.grayLight,
    height: normalized(50),
    borderRadius: 4,
  },
  imageStyle: {
    tintColor: AppColors.gray.gray,
  },
  input: {
    width: '87%',
    height: normalized(48),
    fontFamily: AppFonts.Regular,
    fontSize: 14,
  },
});

export default SearchInput;
