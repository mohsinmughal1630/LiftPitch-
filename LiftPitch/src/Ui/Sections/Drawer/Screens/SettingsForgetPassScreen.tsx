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
import {forgetPasswordRequest} from '../../../../Network/Services/UserServices';
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

const SettingsForgetPassScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [showError, setShowError] = useState(false);
  const sendClicked = async () => {
    Keyboard.dismiss();
    setShowError(true);
    if (CommonDataManager.getSharedInstance().isFieldEmpty(recoveryEmail)) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.emailEmptyError,
        }),
      );
      setEmailError(true);
      return;
    }
    if (!CommonDataManager.getSharedInstance().isEmailValid(recoveryEmail)) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.invalidEmailError,
        }),
      );
      setEmailError(true);
      return;
    }
    let body = {
      email: recoveryEmail,
    };
    dispatch(setLoader(true));
    let response = await forgetPasswordRequest(isNetConnected, body).finally(
      () => dispatch(setLoader(false)),
    );
    if (response.success) {
      props.navigation.navigate(Routes.Settings.settingsOtpScreen, {
        recoveryEmail: recoveryEmail,
      });
    } else {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: response?.message,
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
              title="Recovery Email"
              placeholder="example@empl"
              containerStyle={{
                width: '84%',
              }}
              value={recoveryEmail}
              onChangeText={e => {
                setRecoveryEmail(e);
                // if (showError) {
                setEmailError(
                  CommonDataManager.getSharedInstance().isEmailValid(e)
                    ? false
                    : true,
                );
                // }
              }}
              keyboardType="email-address"
              isError={emailError}
            />
            <Text style={styles.miniSubHeading}>
              Enter your email address below and we'll send you a link to reset
              your password.
            </Text>
            <RoundButton
              title="Send"
              onPress={sendClicked}
              containerStyle={{
                marginTop: hv(20),
                marginLeft: normalized(4),
                width: '84%',
              }}
              isDisabled={
                !CommonDataManager.getSharedInstance().isEmailValid(
                  recoveryEmail,
                )
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SettingsForgetPassScreen;

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
    paddingBottom: isSmallDevice ? hv(60) : hv(50),
    paddingTop: isSmallDevice ? hv(50) : hv(40),
    borderColor: AppColors.dark.darkLevel3,
    borderWidth: 1,
  },
});
