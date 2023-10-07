import React from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  normalized,
} from '../../../../Utils/AppConstants';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import {SettingScreenInfo} from '../../../../Utils/Strings';

const TermsNConditionScreen = (props: ScreenProps) => {
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader
        title={'Term & Conditions'}
        atBackPress={() => {
          props?.navigation.goBack();
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          marginHorizontal: AppHorizontalMargin,
        }}
        showsVerticalScrollIndicator={false}>
        <Image source={AppImages.Auth.logo} style={styles.imgStyle} />
        <Text style={styles.textStyle}>{SettingScreenInfo.terms}</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontSize: normalized(14),
    fontWeight: '500',
    color: AppColors.black.black,
    textAlign: 'center',
  },
  imgStyle: {
    marginVertical: normalized(30),
    alignSelf: 'center',
  },
});
export default TermsNConditionScreen;
