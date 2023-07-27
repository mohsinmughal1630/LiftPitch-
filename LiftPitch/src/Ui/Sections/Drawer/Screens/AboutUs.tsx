import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {
  AppColors,
  AppImages,
  loremIpsumString,
  loremIpsumString2,
  normalized,
  ScreenProps,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import AppHeader from '../../../Components/Header/AppHeader';

const AboutUs = (props: ScreenProps) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: AppColors.white.white,
        flex: 1,
      }}>
      <AppHeader
        title="About Us"
        isBack={true}
        onBack={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.mainContainer}>
        <Image
          source={AppImages.AboutUs.aboutUsLogo}
          resizeMode="contain"
          style={styles.logoStyles}
        />
        <View style={styles.textContainer}>
          <Text style={styles.txtStyle}>{loremIpsumString2}</Text>
          <Text style={styles.dateStyle}>2022-2023</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AboutUs;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.dark.darkLevel5,
    flex: 1,
    paddingTop: normalized(40),
    width: '100%',
  },
  multiView: {},
  logoStyles: {
    marginTop: normalized(45),
    alignSelf: 'center',
    height: normalized(40),
    marginLeft: normalized(-10),
  },
  textContainer: {
    marginLeft: normalized(41),
    marginRight: normalized(42),
    marginTop: normalized(35),
  },
  txtStyle: {
    textAlign: 'center',
    color: AppColors.white.white,
    fontSize: normalized(14),
    ...AppStyles.textRegular,
  },
  dateStyle: {
    textAlign: 'center',
    color: AppColors.white.white,
    fontSize: normalized(14),
    ...AppStyles.textRegular,
    marginTop: normalized(10),
  },
});
