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
  AppFonts,
  hv,
  isSmallDevice,
  normalized,
  ScreenProps,
  ScreenSize,
} from '../../../../Utils/AppConstants';
import RoundInput from '../../../Components/CustomInput/RoundInput';
import RoundButton from '../../../Components/Button/RoundButton';
import LabelButton from '../../../Components/Button/LabelButton';
import {Routes} from '../../../../Utils/Routes';
import SocialComponent from '../Components/SocialComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAlertObj,
  setLoader,
  setMoveToBindScreen,
  setTab,
  setTeamSignupData,
  setUserData,
} from '../../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import CommonDataManager from '../../../../Utils/CommonManager';
import {AppStrings} from '../../../../Utils/Strings';
import {
  signupRequest,
  socialLoginRequest,
} from '../../../../Network/Services/UserServices';

const SignUp = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected, teamSignupData} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(
    teamSignupData?.email ? teamSignupData.email : '',
  );
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email:
      teamSignupData?.email &&
      !CommonDataManager.getSharedInstance().isEmailValid(teamSignupData.email)
        ? true
        : false,
    password: false,
    cPassword: false,
  });
  const [showError, setShowError] = useState(false);

  const signupClicked = async () => {
    Keyboard.dismiss();
    setShowError(true);
    let body = {
      firstName,
      lastName,
      email,
      password,
      cPassword,
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
    if (!CommonDataManager.getSharedInstance().isPasswordValid(cPassword)) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.passwordLengthError,
        }),
      );
      setError({
        ...error,
        cPassword: true,
      });
      return;
    }
    if (password !== cPassword) {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Validation.passwordNotMatchError,
        }),
      );
      setError({
        ...error,
        password: true,
        cPassword: true,
      });
      return;
    }
    let apiBody: any = {
      first_name: CommonDataManager.getSharedInstance().truncateString(
        body.firstName,
      ),
      last_name: CommonDataManager.getSharedInstance().truncateString(
        body.lastName,
      ),
      email: body.email,
      password: body.password,
      confirm_password: body.cPassword,
    };
    if (teamSignupData) {
      apiBody['uuid'] = teamSignupData.uuid;
      apiBody['team_id'] = teamSignupData.team_id;
    }
    try {
      dispatch(setLoader(true));
      let response: any = await signupRequest(isNetConnected, apiBody);
      if (response.success) {
        await CommonDataManager.getSharedInstance().saveUserData(response.data);
        await CommonDataManager.getSharedInstance().saveUserToken(
          response.data?.token,
        );
        dispatch(setMoveToBindScreen(true));
        dispatch(setUserData(response.data));
        await CommonDataManager.getSharedInstance().manageSecretId(
          response.data,
        );
        await CommonDataManager.getSharedInstance().registerDeviceForNotifications(
          response.data?.id,
        );
      } else {
        dispatch(setTab(0));
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
        dispatch(setTab(0));
        dispatch(
          setAlertObj({
            title: AppStrings.Network.errorTitle,
            message: res?.message,
          }),
        );
      }
    } catch (e) {
      console.log('Error social sign up ', e);
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
    <View
      style={{
        ...AppStyles.MainStyle,
        backgroundColor: AppColors.dark.darkLevel7,
      }}>
      <SafeAreaView />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          flex: 1,
        }}>
        <View style={styles.headingView}>
          <Text style={styles.heading}>Sign Up</Text>
          <Text style={styles.subHeading}>Create your free account</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          bounces={false}
          contentContainerStyle={styles.container}>
          <View style={styles.subContainer}>
            <RoundInput
              title="First Name"
              placeholder="David"
              value={firstName}
              onChangeText={e => {
                setFirstName(e);
              }}
              containerStyle={{
                ...styles.inputFields,
                marginTop: hv(10),
              }}
              maxLength={25}
            />
            <RoundInput
              title="Last Name"
              placeholder="Carls"
              value={lastName}
              onChangeText={e => {
                setLastName(e);
              }}
              containerStyle={styles.inputFields}
              maxLength={25}
            />
            <RoundInput
              title="Email"
              placeholder="example@empl"
              value={email}
              onChangeText={e => {
                setEmail(e);
                setError({
                  ...error,
                  email:
                    CommonDataManager.getSharedInstance().isEmailValid(e) ||
                    e == ''
                      ? false
                      : true,
                });
              }}
              containerStyle={styles.inputFields}
              keyboardType="email-address"
              isError={error.email}
              maxLength={50}
              disabled={teamSignupData ? true : false}
            />
            <RoundInput
              title="Password"
              placeholder="*****"
              value={password}
              onChangeText={e => {
                setPassword(e);
                setError({
                  ...error,
                  password:
                    !CommonDataManager.getSharedInstance().isPasswordValid(e) &&
                    e !== ''
                      ? true
                      : cPassword !== '' && cPassword !== e
                      ? true
                      : false,
                  cPassword: cPassword !== '' && cPassword !== e ? true : false,
                });
              }}
              isPassword
              containerStyle={styles.inputFields}
              isError={error.password}
            />
            <RoundInput
              title="Confirm Password"
              placeholder="*****"
              value={cPassword}
              onChangeText={e => {
                setCPassword(e);
                setError({
                  ...error,
                  cPassword:
                    !CommonDataManager.getSharedInstance().isPasswordValid(e) &&
                    e !== ''
                      ? true
                      : password !== '' && password !== e
                      ? true
                      : false,
                  password: password !== '' && password !== e ? true : false,
                });
              }}
              isPassword
              containerStyle={styles.inputFields}
              isError={error.cPassword}
            />
            <RoundButton
              title="Create account"
              onPress={() => {
                dispatch(setTab(7));
                signupClicked();
              }}
              containerStyle={{
                marginTop: hv(35),
                width: '85%',
              }}
              isDisabled={
                CommonDataManager.getSharedInstance().isFieldEmpty(firstName) ||
                CommonDataManager.getSharedInstance().isFieldEmpty(lastName) ||
                !CommonDataManager.getSharedInstance().isEmailValid(email) ||
                !CommonDataManager.getSharedInstance().isPasswordValid(
                  password,
                ) ||
                !CommonDataManager.getSharedInstance().isPasswordValid(
                  cPassword,
                ) ||
                password !== cPassword
              }
            />
            <SocialComponent onIconPress={socialBtnClicked} />
          </View>
          <LabelButton
            title="Sign In Account"
            onPress={() => props.navigation.push(Routes.Auth.login)}
            containerStyle={{
              marginVertical: hv(30),
            }}
            fontSize={
              Platform.OS == 'ios' && !isSmallDevice
                ? normalized(17)
                : normalized(16)
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: hv(10),
  },
  headingView: {
    alignItems: 'center',
    marginVertical: hv(20),
  },
  heading: {
    color: AppColors.white.white,
    fontSize: normalized(32),
    ...AppStyles.textSemiBold,
  },
  subHeading: {
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(16),
    marginTop: hv(10),
    fontFamily: AppFonts.Regular,
  },
  subContainer: {
    alignItems: 'center',
    backgroundColor: AppColors.dark.darkLevel5,
    width: ScreenSize.width * 0.9,
    borderRadius: 15,
    paddingVertical: hv(20),
    minHeight: ScreenSize.height * 0.8,
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
  inputFields: {
    marginTop: hv(15),
    width: '85%',
  },
});

export default SignUp;
