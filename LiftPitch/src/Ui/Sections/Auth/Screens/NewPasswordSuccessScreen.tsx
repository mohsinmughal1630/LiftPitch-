import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import useBackButtonListener from '../../../../Hooks/useBackButtonListener';
import {
  AppColors,
  hv,
  normalized,
  ScreenProps,
  ScreenSize,
  AppImages,
  isSmallDevice,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import CommonDataManager from '../../../../Utils/CommonManager';
import {Routes} from '../../../../Utils/Routes';
import LabelButton from '../../../Components/Button/LabelButton';

const NewPasswordSuccessScreen = (props: ScreenProps) => {
  const backButtonPressed = () => {
    return true;
  };
  useBackButtonListener(backButtonPressed);

  return (
    <SafeAreaView
      style={{
        ...AppStyles.MainStyle,
        backgroundColor: AppColors.dark.darkLevel7,
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          flex: 1,
        }}>
        <View style={styles.headingView}>
          <Text style={styles.heading}>Forget Password</Text>
          <Text style={styles.subHeading}>Enter your new password</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          bounces={false}>
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
            title="Sign In Acccount"
            containerStyle={{
              marginVertical: hv(30),
            }}
            fontSize={
              Platform.OS == 'ios' && !isSmallDevice
                ? normalized(17)
                : normalized(16)
            }
            onPress={() =>
              CommonDataManager.getSharedInstance().resetToScreen(
                props.navigation,
                Routes.Auth.login,
              )
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPasswordSuccessScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headingView: {
    alignItems: 'center',
    marginVertical: isSmallDevice ? hv(10) : 0,
    marginBottom: hv(10),
    width: '100%',
    paddingTop: Platform.OS == 'android' || isSmallDevice ? hv(40) : hv(30),
  },
  heading: {
    color: AppColors.white.white,
    fontSize: normalized(22),
    ...AppStyles.textSemiBold,
  },
  subHeading: {
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(16),
    marginTop: hv(10),
    marginBottom: hv(30),
    ...AppStyles.textRegular,
    maxWidth: '80%',
    textAlign: 'center',
  },
  subContainer: {
    alignItems: 'center',
    backgroundColor: AppColors.dark.darkLevel5,
    width: '90%',
    borderRadius: 15,
    paddingVertical: hv(20),
    minHeight: ScreenSize.height * 0.5,
  },
  logoStyle: {
    alignSelf: 'center',
    marginBottom: hv(40),
  },
  inputSection: {
    marginHorizontal: normalized(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backView: {
    alignSelf: 'flex-start',
    marginLeft: normalized(5),
    justifyContent: 'center',
    alignItems: 'center',
    height: hv(50),
    width: normalized(60),
  },
  backImg: {
    height: hv(15),
    width: normalized(25),
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
    ...AppStyles.textMedium,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(16),
    alignSelf: 'center',
    textAlign: 'center',
  },
  successText: {
    alignSelf: 'center',
    color: AppColors.primaryGreen,
    fontSize: normalized(20),
    marginTop: isSmallDevice ? hv(6) : hv(3),
    ...AppStyles.textSemiBold,
  },
});
