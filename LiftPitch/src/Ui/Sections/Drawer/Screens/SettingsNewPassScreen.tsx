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
import {useDispatch, useSelector} from 'react-redux';
import {
  forgetPasswordRequest,
  resetPasswordRequest,
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

const SettingsNewPassScreen = (props: ScreenProps) => {
  const {recoveryEmail, otpCode}: any = props.route.params;
  const dispatch = useDispatch();
  const {isNetConnected} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [newPassword, setNewPassword] = useState('');
  const [cNewPassword, setCNewPassword] = useState('');

  const [error, setError] = useState({
    newPassword: false,
    cNewPassword: false,
  });
  const [showError, setShowError] = useState(false);
  const submitClicked = async () => {
    setShowError(true);
    let body = {
      newPassword: newPassword,
      cNewPassword: cNewPassword,
    };
    if (
      CommonDataManager.getSharedInstance().checkEmptyObj(
        body,
        (errorObj: any) => setError(errorObj),
      )
    ) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.fieldsEmptyError,
        }),
      );
      return;
    }
    if (!CommonDataManager.getSharedInstance().isPasswordValid(newPassword)) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.passwordLengthError,
        }),
      );
      setError({
        ...error,
        newPassword: true,
      });
      return;
    }
    if (!CommonDataManager.getSharedInstance().isPasswordValid(cNewPassword)) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.passwordLengthError,
        }),
      );
      setError({
        ...error,
        cNewPassword: true,
      });
      return;
    }
    let apiBody = {
      email: recoveryEmail,
      password: newPassword,
      confirm_password: cNewPassword,
      code: otpCode,
    };
    if (cNewPassword !== newPassword) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.passwordNotMatchError,
        }),
      );
      setError({
        ...error,
        cNewPassword: true,
      });
      return;
    }
    try {
      dispatch(setLoader(true));
      let response = await resetPasswordRequest(isNetConnected, apiBody);
      if (response.success) {
        props.navigation.push(Routes.Settings.settingsPassSuccessScreen);
      } else {
        dispatch(
          setAlertObj({
            title: AppStrings.Network.errorTitle,
            message: response?.message,
          }),
        );
      }
    } catch (e) {
      console.log('er reset password ', e);
    } finally {
      dispatch(setLoader(false));
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
          bounces={false}>
          <View style={styles.subContainer}>
            <RoundInput
              title="New Password"
              placeholder="*************"
              containerStyle={{
                width: '84%',
              }}
              isPassword
              value={newPassword}
              onChangeText={e => {
                setNewPassword(e);
                // if (showError) {
                setError({
                  ...error,
                  newPassword:
                    e.length < 8
                      ? true
                      : cNewPassword !== '' && cNewPassword !== e
                      ? true
                      : false,
                  cNewPassword:
                    cNewPassword !== '' && cNewPassword !== e ? true : false,
                });
                // }
              }}
              isError={error.newPassword}
            />
            <RoundInput
              title="Confirm Password"
              placeholder="*************"
              containerStyle={{
                marginTop: hv(20),
                width: '84%',
              }}
              value={cNewPassword}
              onChangeText={e => {
                setCNewPassword(e);
                // if (showError) {
                setError({
                  ...error,
                  cNewPassword:
                    e.length < 8
                      ? true
                      : newPassword !== '' && newPassword !== e
                      ? true
                      : false,
                  newPassword:
                    newPassword !== '' && newPassword !== e ? true : false,
                });
                // }
              }}
              isPassword
              isError={error.cNewPassword}
            />
            <RoundButton
              title="Send"
              onPress={submitClicked}
              containerStyle={{
                marginTop: hv(25),
                marginLeft: normalized(4),
                width: '84%',
              }}
              isDisabled={
                !CommonDataManager.getSharedInstance().isPasswordValid(
                  newPassword,
                ) ||
                !CommonDataManager.getSharedInstance().isPasswordValid(
                  cNewPassword,
                ) ||
                error.cNewPassword ||
                error.newPassword
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SettingsNewPassScreen;

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
