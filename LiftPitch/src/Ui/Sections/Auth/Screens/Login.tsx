import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {AppStyles} from '../../../../Utils/AppStyles';
import {
  AppColors,
  hv,
  isSmallDevice,
  normalized,
  ScreenProps,
  ScreenSize,
} from '../../../../Utils/AppConstants';
import RoundInput from '../../../Components/CustomInput/RoundInput';
import RoundButton from '../../../Components/Button/RoundButton';
import LabelButton from '../../../Components/Button/LabelButton';
import SocialComponent from '../Components/SocialComponent';
import {Routes} from '../../../../Utils/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAlertObj,
  setIsComingFromTeam,
  setLoader,
  setMoveToBindScreen,
  setMoveToParams,
  setMoveToScreen,
  setScannedTeamDetails,
  setTab,
  setTeamSignupData,
  setUserData,
} from '../../../../Redux/reducers/AppReducer';
import {
  loginRequest,
  socialLoginRequest,
} from '../../../../Network/Services/UserServices';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import CommonDataManager from '../../../../Utils/CommonManager';
import {AppStrings} from '../../../../Utils/Strings';

const Login = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected, teamSignupData, isComingFromTeam, moveToParams} =
    useSelector((state: AppRootStore) => state.AppReducer);
  const [email, setEmail] = useState(
    teamSignupData?.email ? teamSignupData.email : '',
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email:
      teamSignupData?.email &&
      !CommonDataManager.getSharedInstance().isEmailValid(teamSignupData.email)
        ? true
        : false,
    password: false,
  });
  const [showError, setShowError] = useState(false);

  const loginClicked = async () => {
    Keyboard.dismiss();
    setShowError(true);
    let body = {
      email: email,
      password: password,
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
    if (!CommonDataManager.getSharedInstance().isEmailValid(email)) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.invalidEmailError,
        }),
      );
      setError({
        ...error,
        email: true,
      });
      return;
    }
    if (!CommonDataManager.getSharedInstance().isPasswordValid(password)) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.passwordLengthError,
        }),
      );
      setError({
        ...error,
        password: true,
      });
      return;
    }
    try {
      dispatch(setLoader(true));
      let response: any = await loginRequest(isNetConnected, body);
      if (response.success) {
        if (isComingFromTeam && moveToParams) {
          dispatch(setMoveToScreen(Routes.Teams.teamNodes));
        }
        await CommonDataManager.getSharedInstance().saveUserData(response.data);
        await CommonDataManager.getSharedInstance().saveUserToken(
          response.data?.token,
        );
        dispatch(setUserData(response.data));
        await CommonDataManager.getSharedInstance().manageSecretId(
          response?.data,
        );
        await CommonDataManager.getSharedInstance().registerDeviceForNotifications(
          response.data?.id,
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
      console.log('er login ', e);
    } finally {
      dispatch(setLoader(false));
      dispatch(setTeamSignupData(null));
    }
  };

  const onSocialLogin = async (apiBody: any) => {
    dispatch(setLoader(true));
    try {
      const res: any = await socialLoginRequest(isNetConnected, apiBody);
      if (res.success) {
        if (!res.data?.is_profile) {
          dispatch(setTab(7));
          dispatch(setMoveToBindScreen(true));
        } else if (isComingFromTeam && moveToParams) {
          dispatch(setMoveToScreen(Routes.Teams.teamNodes));
        }
        await CommonDataManager.getSharedInstance().saveUserData(res.data);
        await CommonDataManager.getSharedInstance().saveUserToken(
          res.data?.token,
        );
        dispatch(setUserData(res.data));
        await CommonDataManager.getSharedInstance().manageSecretId(res.data);
        await CommonDataManager.getSharedInstance().registerDeviceForNotifications(
          res.data?.id,
        );
      } else {
        dispatch(
          setAlertObj({
            title: AppStrings.Network.errorTitle,
            message: res?.message,
          }),
        );
      }
    } catch (e) {
      console.log('Error social login ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const socialBtnClicked = async (socialType: string) => {
    Keyboard.dismiss();
    dispatch(setLoader(true));
    let socialParams = await CommonDataManager.getSharedInstance()
      .socialCallRequest(socialType)
      .catch(e => console.log('Er ', e))
      .finally(() => dispatch(setLoader(false)));
    if (socialParams) {
      onSocialLogin(socialParams);
    } else {
      console.log('Some problem getting social data');
    }
  };

  return (
    <SafeAreaView
      style={{
        ...AppStyles.MainStyle,
        backgroundColor: AppColors.dark.darkLevel7,
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
        }}>
        <View style={styles.headingView}>
          <Text style={styles.heading}>Sign In</Text>
          <Text style={styles.subHeading}>
            Please enter your credentials to login.
          </Text>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.container}>
          <View style={styles.subContainer}>
            <RoundInput
              title="Email"
              placeholder="example@empl"
              value={email}
              onChangeText={e => {
                setEmail(e);
                // if (showError) {
                setError({
                  ...error,
                  email:
                    CommonDataManager.getSharedInstance().isEmailValid(e) ||
                    e == ''
                      ? false
                      : true,
                });
                // }
              }}
              containerStyle={{
                marginTop: hv(20),
              }}
              keyboardType="email-address"
              isError={error.email}
              maxLength={50}
            />
            <RoundInput
              title="Password"
              placeholder="*****"
              value={password}
              onChangeText={e => {
                setPassword(e);
                // if (showError) {
                setError({
                  ...error,
                  password:
                    CommonDataManager.getSharedInstance().isPasswordValid(e) ||
                    e == ''
                      ? false
                      : true,
                });
                // }
              }}
              isPassword
              containerStyle={{
                marginTop: hv(25),
              }}
              isError={error.password}
            />
            <View
              style={{
                width: ScreenSize.width * 0.7,
                alignItems: 'flex-end',
                paddingVertical: hv(10),
              }}>
              <LabelButton
                title="Forgot Password"
                onPress={() =>
                  props.navigation.push(Routes.Auth.forgetPassword)
                }
                containerStyle={{
                  marginVertical: hv(10),
                }}
                textStyle={AppStyles.textRegular}
              />
            </View>
            <RoundButton
              title="Sign In"
              containerStyle={{marginLeft: normalized(4), width: '84%'}}
              onPress={loginClicked}
              isDisabled={
                !CommonDataManager.getSharedInstance().isPasswordValid(
                  password,
                ) || !CommonDataManager.getSharedInstance().isEmailValid(email)
              }
            />
            <SocialComponent onIconPress={socialBtnClicked} />
          </View>
          <LabelButton
            title="Create an Account"
            containerStyle={{
              marginVertical: hv(30),
            }}
            onPress={() => {
              dispatch(setTeamSignupData(null));
              if (isComingFromTeam) {
                dispatch(setIsComingFromTeam(false));
                dispatch(setMoveToParams(null));
                dispatch(setMoveToScreen(null));
                dispatch(setScannedTeamDetails(null));
              }
              props.navigation.push(Routes.Auth.signUp);
            }}
            fontSize={
              Platform.OS == 'ios' && !isSmallDevice
                ? normalized(17)
                : normalized(16)
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headingView: {
    alignItems: 'center',
    marginVertical: hv(20),
    marginBottom: hv(10),
  },
  heading: {
    color: AppColors.white.white,
    fontSize: normalized(32),
    ...AppStyles.textSemiBold,
  },
  subHeading: {
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(16),
    marginVertical: hv(10),
    ...AppStyles.textRegular,
    maxWidth: '70%',
    textAlign: 'center',
  },
  subContainer: {
    alignItems: 'center',
    backgroundColor: AppColors.dark.darkLevel5,
    width: '90%',
    borderRadius: 15,
    paddingVertical: hv(20),
    minHeight: ScreenSize.height * 0.6,
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
});

export default Login;
