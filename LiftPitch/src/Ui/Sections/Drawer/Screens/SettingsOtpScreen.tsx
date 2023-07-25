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
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkOtpRequest,
  forgetPasswordRequest,
} from '../../../../Network/Services/UserServices';
import {setAlertObj, setLoader} from '../../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import {
  AppColors,
  hv,
  isSmallDevice,
  normalized,
  ScreenProps,
  ScreenSize,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import CommonDataManager from '../../../../Utils/CommonManager';
import {Routes} from '../../../../Utils/Routes';
import {AppStrings} from '../../../../Utils/Strings';
import RoundButton from '../../../Components/Button/RoundButton';
import RoundInput from '../../../Components/CustomInput/RoundInput';
import AppHeader from '../../../Components/Header/AppHeader';

const SettingsOtpScreen = (props: ScreenProps) => {
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
    const res = await checkOtpRequest(isNetConnected, apiBody);
    if (res.success) {
      props.navigation.navigate(Routes.Settings.settingsNewPassScreen, {
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
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title="Forget Password"
        isBack={true}
        onBack={() => {
          props.navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always"
          bounces={false}>
          <View style={styles.subContainer}>
            <RoundInput
              title="Enter Code"
              placeholder="123456"
              containerStyle={{
                width: '84%',
              }}
              value={otpCode}
              onChangeText={e => {
                setOtpCode(e);
                setCodeError(e.length < 6 ? true : false);
              }}
              maxLength={6}
              keyboardType="number-pad"
              isError={codeError}
            />
            <Text style={styles.miniSubHeading}>
              We've sent you an email with verification code. Please enter code
              to continue.
            </Text>
            <RoundButton
              title="Submit"
              onPress={submitClicked}
              containerStyle={{
                marginTop: hv(20),
                marginLeft: normalized(4),
                width: '84%',
              }}
              isDisabled={otpCode?.trim()?.length < 6}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SettingsOtpScreen;

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
  },
});
