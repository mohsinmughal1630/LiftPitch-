import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AppColors,
  AppImages,
  ScreenProps,
  ScreenSize,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import { AppHorizontalMargin, AppStyles } from '../../../../Utils/AppStyles';
import SocialBtn from '../Components/SocialBtn';
import CustomFilledBtn from '../../../Components/CustomButtom/CustomButton';
import SimpleInput from '../../../Components/CustomInput/SimpleInput';
import CustomSwitch from '../../../Components/CustomSwitch/CustomSwitch';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsAlertShow,
  setIsLoader,
  setIsPersisterUser,
  setUpdateFBToken,
  setUserData,
} from '../../../../Redux/reducers/AppReducer';
import { Routes } from '../../../../Utils/Routes';
import { saveUserData } from '../../../../Utils/AsyncStorage';
import { AppStrings } from '../../../../Utils/Strings';
import CommonDataManager from '../../../../Utils/CommonManager';
import { AppRootStore } from '../../../../Redux/store/AppStore';
import {
  loginRequest,
  userSignupRequest,
} from '../../../../Network/Services/AuthServices';
import { SocialTypeStrings } from '../../../../Utils/AppEnums';
import ThreadManager from '../../../../ChatModule/ThreadManger';
const LoginScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const { isNetConnected, isPersisterUser } = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passRef: any = useRef();
  //error=====>
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  //error===>
  const focusNextField = (inputRef: any) => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  };

  const onLoginButton = async () => {
    if (!email) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: 'Please enter an Email',
        }),
      );
      return;
    }
    if (!CommonDataManager.getSharedInstance().isEmailValid(email)) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Validation.invalidEmailError,
        }),
      );
      return;
    }
    if (!password) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: 'Please enter Password',
        }),
      );
      return;
    }
    if (!isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      return;
    }
    const paramsObj = { email, password };
    dispatch(setIsLoader(true));
    await loginRequest(paramsObj, response => {
      dispatch(setIsLoader(false));
      if (response?.status) {
        dispatch(setUserData(response?.data));
        if (isPersisterUser) {
          saveUserData(response?.data);
          dispatch(setUpdateFBToken(true));
        }
      } else {
        let errorMessage = response?.message
          ? response?.message
          : 'Something went wrong';
        dispatch(
          setIsAlertShow({
            value: true,
            message: errorMessage,
          }),
        );
      }
    }).catch(() => {
      dispatch(setIsLoader(false));
    });
  };

  const socialBtnClicked = async (socialType: string) => {
    Keyboard.dismiss();
    dispatch(setIsLoader(true));
    let socialParams = await CommonDataManager.getSharedInstance()
      .socialCallRequest(isNetConnected, socialType)
      .catch(e => {
        dispatch(setIsLoader(false));
        console.log('Er ', e);
      });
    if (socialParams) {
      const paramsObj = {
        email: socialParams.email,
        password: socialParams.token,
      };
      await loginRequest(paramsObj, async response => {
        if (response?.status) {
          dispatch(setUserData(response?.data));
          if (isPersisterUser) {
            await saveUserData(response?.data);
            dispatch(setUpdateFBToken(true));
          }
        } else {
          let errorMessage = response?.message
            ? response?.message
            : 'Something went wrong';
          if (errorMessage == 'User not found against this Email.') {
            const fullname =
              (socialParams?.first_name ? socialParams.first_name : '') +
              (socialParams?.last_name ? ` ${socialParams.last_name}` : '');
            const paramsObj = {
              userName: fullname,
              email: socialParams?.email,
              password: socialParams?.token,
              companyName: null,
              companyRegNo: null,
              companyType: null,
              companyLocation: null,
              companyLogo: '',
            };
            dispatch(setIsLoader(true));
            await userSignupRequest(paramsObj, response => {
              dispatch(setIsLoader(false));
              if (response?.status) {
                dispatch(setUserData(response?.data));
                if (isPersisterUser) {
                  saveUserData(response?.data);
                  dispatch(setUpdateFBToken(true));
                }
              } else {
                let errorMessage = response?.message
                  ? response?.message
                  : 'Something went wrong';
                dispatch(
                  setIsAlertShow({
                    value: true,
                    message: errorMessage,
                  }),
                );
              }
            }).catch(() => dispatch(setIsLoader(false)));
            return;
          }
          dispatch(
            setIsAlertShow({
              value: true,
              message: errorMessage,
            }),
          );
        }
        dispatch(setIsLoader(false));
      }).catch(() => dispatch(setIsLoader(false)));
      dispatch(setIsLoader(false));
    } else {
      dispatch(setIsLoader(false));
      console.log('Some problem getting social data');
    }
  };

  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(35) : hv(30)}>
        <ScrollView
          style={styles.containerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.childContainer}>
            <Image source={AppImages.Auth.logo} style={styles.logoStyle} />
            <Text style={styles.topDesTxt}>
              Log in to continue your journey.
            </Text>

            <SimpleInput
              onSubmitEditing={() => focusNextField(passRef)}
              returnKeyType={'next'}
              placeHold={'Email'}
              container={styles.inputMainCont}
              textInputStyle={{ width: normalized(270) }}
              showLastIcon={false}
              showFirstIcon={true}
              rightIcon={AppImages.Auth.Message}
              setValue={(txt: any) => {
                setEmailErrorMsg('');
                setEmail(txt);
              }}
              value={email}
              secureEntry={false}
              errorMsg={emailErrorMsg}
            />

            <SimpleInput
              ref={passRef}
              placeHold={'Password'}
              container={styles.inputMainCont}
              textInputStyle={{ width: normalized(270) }}
              showLastIcon={true}
              showFirstIcon={true}
              rightIcon={AppImages.Auth.Password}
              setValue={(passTxt: any) => {
                if (passTxt.includes(' ')) {
                  setPassword(passTxt.trim());
                } else {
                  setPasswordErrorMsg('');
                  setPassword(passTxt);
                }
              }}
              value={password}
              secureEntry={true}
              errorMsg={passwordErrorMsg}
            />
            <View style={styles.secondCont}>
              <View style={styles.switchCon}>
                <CustomSwitch
                  value={isPersisterUser}
                  onToggle={val => dispatch(setIsPersisterUser(val))}
                />
                <Text style={styles.remembTxt}>Remember Me</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgetPasTxt}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <CustomFilledBtn label={'Sign in'} onPressBtn={onLoginButton} />
            <View style={styles.signInWithTxt}>
              <View style={styles.simpleLine} />
              <Text style={styles.signInTxt}>Sign in with</Text>
              <View style={styles.simpleLine} />
            </View>
            <View style={styles.socialCont}>
              {/* <SocialBtn
                label={'FACEBOOK'}
                icon={AppImages.Auth.fbIcon}
                atPress={() => { }}
              /> */}
              <SocialBtn
                label={'GOOGLE'}
                icon={AppImages.Auth.google}
                atPress={() => CommonDataManager.getSharedInstance().commonSocialLoginRequest(SocialTypeStrings.google, isNetConnected, isPersisterUser, props.navigation)}
              />
            </View>
            <Text style={styles.bottomTxt}>
              Don’t have an account?{' '}
              <Text
                onPress={() => {
                  props?.navigation.navigate(Routes.Auth.signUp);
                }}
                style={styles.signUpBtn}>
                {' '}
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoStyle: {
    marginTop: normalized(80),
    alignSelf: 'center',
  },
  topDesTxt: {
    color: '#8391A1',
    fontSize: normalized(13),
    fontWeight: '400',
    marginTop: normalized(10),
    marginBottom: normalized(40),
    alignSelf: 'center',
  },
  inputMainCont: {
    width: '92%',
    marginTop: 15,
  },
  secondCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: normalized(30),
    marginHorizontal: AppHorizontalMargin,
  },
  switchCon: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  remembTxt: {
    marginStart: normalized(10),
    fontSize: normalized(12),
    fontWeight: '400',
    color: AppColors.black.black,
  },
  forgetPasTxt: {
    fontSize: normalized(14),
    fontWeight: '400',
    color: AppColors.black.black,
  },
  signInWithTxt: {
    marginVertical: normalized(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: AppHorizontalMargin,
  },
  simpleLine: {
    height: normalized(0.4),
    backgroundColor: '#8391A1',
    width: normalized(110),
  },
  signInTxt: {
    fontSize: normalized(13),
    fontWeight: '400',
    color: '#8391A1',
    marginHorizontal: normalized(15),
  },

  socialCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: AppHorizontalMargin,
    alignSelf: 'center'
  },
  bottomTxt: {
    fontSize: normalized(13),
    fontWeight: '500',
    color: AppColors.black.black,
    alignSelf: 'center',
    marginTop: normalized(80),
  },
  signUpBtn: {
    fontSize: normalized(13),
    fontWeight: '500',
    color: '#7E2A70',
    alignSelf: 'center',
    marginTop: normalized(80),
  },
});
export default LoginScreen;
