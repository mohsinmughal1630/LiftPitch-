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
import {resetPasswordRequest} from '../../../../Network/Services/UserServices';
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

const NewPassword = (props: ScreenProps) => {
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
    Keyboard.dismiss();
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
        // props.navigation.push(Routes.Auth.newPasswordSuccessScreen);
        CommonDataManager.getSharedInstance().resetToScreen(
          props.navigation,
          Routes.Auth.newPasswordSuccessScreen,
        );
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
          <Text style={styles.subHeading}>Enter your new password</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          bounces={false}>
          <View style={styles.subContainer}>
            <RoundInput
              title="New Password"
              placeholder="*************"
              containerStyle={{
                marginTop: hv(20),
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
                    e.length < 8 && e !== ''
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
                    (e.length < 8 || e !== newPassword) && e !== ''
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
              title="Submit"
              onPress={submitClicked}
              containerStyle={{
                marginTop: hv(20),
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
                newPassword !== cNewPassword
              }
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPassword;

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
    paddingVertical: isSmallDevice ? hv(30) : hv(20),
    paddingBottom: hv(30),
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
