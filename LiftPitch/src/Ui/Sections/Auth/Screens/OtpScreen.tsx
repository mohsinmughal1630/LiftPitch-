import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {checkOtpRequest} from '../../../../Network/Services/UserServices';
import {setAlertObj, setLoader} from '../../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../../Redux/store/AppStore';
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
import {AppStrings} from '../../../../Utils/Strings';
import LabelButton from '../../../Components/Button/LabelButton';
import RoundButton from '../../../Components/Button/RoundButton';
import RoundInput from '../../../Components/CustomInput/RoundInput';

const OtpScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [otpCode, setOtpCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [showError, setShowError] = useState(false);

  const submitClicked = async () => {
    Keyboard.dismiss();
    setShowError(true);
    if (CommonDataManager.getSharedInstance().isFieldEmpty(otpCode)) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.otpCodeEmptyError,
        }),
      );
      setCodeError(true);
      return;
    }
    let apiBody = {
      email: props.route.params?.recoveryEmail,
      code: otpCode,
    };
    dispatch(setLoader(true));
    const res = await checkOtpRequest(isNetConnected, apiBody).finally(() =>
      dispatch(setLoader(false)),
    );
    if (res.success) {
      props.navigation.navigate(Routes.Auth.newPassword, {
        recoveryEmail: props.route.params?.recoveryEmail,
        otpCode: otpCode,
      });
    } else {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: res?.message,
        }),
      );
    }
  };
  return (
    <SafeAreaView
      style={{
        ...AppStyles.MainStyle,
        backgroundColor: AppColors.dark.darkLevel7,
      }}>
      <View style={styles.headingView}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          activeOpacity={1}
          style={styles.backView}>
          <Image
            source={AppImages.Drawer.BackIcon}
            style={styles.backImg}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Forget Password</Text>
        <Text style={styles.subHeading}>Submit verification code</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.container}
        bounces={false}>
        <View style={styles.subContainer}>
          <RoundInput
            title="Enter Code"
            placeholder="123456"
            containerStyle={{
              marginTop: hv(25),
              width: '84%',
            }}
            value={otpCode}
            onChangeText={e => {
              setOtpCode(e);
              // if (showError) {
              setCodeError(e.length < 6 && e !== '' ? true : false);
              // }
            }}
            maxLength={6}
            keyboardType="number-pad"
            isError={codeError}
          />
          <Text style={styles.miniSubHeading}>
            We've sent you an email with verification code. Please enter code to
            continue.
          </Text>
          <RoundButton
            title="Submit"
            onPress={submitClicked}
            containerStyle={{
              marginTop: hv(20),
              marginLeft: normalized(4),
              width: '84%',
            }}
            isDisabled={otpCode.length < 6}
          />
          <LabelButton
            title="Back to Sign In"
            containerStyle={{
              marginTop: hv(30),
            }}
            fontSize={
              Platform.OS == 'ios' && !isSmallDevice
                ? normalized(17)
                : normalized(16)
            }
            onPress={() => {
              props.navigation.navigate(Routes.Auth.login);
            }}
            textStyle={
              {
                // ...AppStyles.textMedium,
              }
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headingView: {
    alignItems: 'center',
    marginVertical: isSmallDevice ? hv(10) : 0,
    marginTop: isSmallDevice ? hv(10) : Platform.OS == 'ios' ? -5 : 0,
    marginBottom: hv(10),
    width: '100%',
  },
  heading: {
    color: AppColors.white.white,
    fontSize: normalized(22),
    ...AppStyles.textSemiBold,
  },
  subHeading: {
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(16),
    // marginVertical: hv(20),
    marginTop: hv(10),
    marginBottom: hv(30),
    ...AppStyles.textRegular,
    maxWidth: '80%',
    textAlign: 'center',
  },
  miniSubHeading: {
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(14),
    // marginVertical: hv(10),
    marginTop: hv(29),
    marginBottom: hv(20),
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
});
