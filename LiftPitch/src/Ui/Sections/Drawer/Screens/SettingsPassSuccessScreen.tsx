import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  AppColors,
  AppImages,
  hv,
  isSmallDevice,
  normalized,
  ScreenProps,
  ScreenSize,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import LabelButton from '../../../Components/Button/LabelButton';
import AppHeader from '../../../Components/Header/AppHeader';
import {Routes} from '../../../../Utils/Routes';

const SettingsPassSuccessScreen = (props: ScreenProps) => {
  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader title="Forget Password" />
      <View style={styles.subContainer}>
        <View style={styles.tickContainer}>
          <Image
            source={AppImages.Cards.SingleDarkTick}
            resizeMode="contain"
            style={styles.tickImg}
          />
        </View>
        <Text style={styles.rowTitle}>Your Password is updated</Text>
        <Text style={styles.successText}>Successfully</Text>
      </View>
      <LabelButton
        title="Back to Settings"
        containerStyle={{
          marginVertical: hv(30),
          alignSelf: 'center',
        }}
        fontSize={
          Platform.OS == 'ios' && !isSmallDevice
            ? normalized(17)
            : normalized(16)
        }
        onPress={() => props.navigation.pop(7)}
      />
    </View>
  );
};

export default SettingsPassSuccessScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  miniSubHeading: {
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(14),
    marginTop: hv(29),
    marginBottom: hv(20),
    ...AppStyles.textRegular,
    maxWidth: '80%',
    textAlign: 'center',
  },
  subContainer: {
    marginTop: hv(40),
    alignItems: 'center',
    backgroundColor: AppColors.dark.darkLevel4,
    width: '90%',
    borderRadius: 15,
    paddingBottom: hv(50),
    paddingTop: hv(40),
    borderColor: AppColors.dark.darkLevel3,
    borderWidth: 1,
    alignSelf: 'center',
  },
  tickContainer: {
    backgroundColor: AppColors.primaryGreen,
    height: normalized(120),
    width: normalized(120),
    borderRadius: normalized(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hv(40),
  },
  tickImg: {
    height: normalized(60),
    width: normalized(60),
    tintColor: AppColors.white.white,
  },
  rowTitle: {
    ...AppStyles.textSemiBold,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(16),
    alignSelf: 'center',
    textAlign: 'center',
  },
  successText: {
    alignSelf: 'center',
    color: AppColors.primaryGreen,
    fontSize: normalized(18),
    marginTop: hv(10),
    ...AppStyles.textBold,
  },
});
