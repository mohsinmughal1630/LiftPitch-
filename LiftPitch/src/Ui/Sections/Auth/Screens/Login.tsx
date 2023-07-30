import React, {useRef, useState} from 'react';
import {
  Image,
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
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import SocialBtn from '../Components/SocialBtn';
import CustomFilledBtn from '../../../Components/CustomButtom/CustomButton';
import SimpleInput from '../../../Components/CustomInput/SimpleInput';
import CustomSwitch from '../../../Components/CustomSwitch/CustomSwitch';
const LoginScreen = (props: ScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passRef: any = useRef();
  const [switchValue, setSwitchValue] = useState(true);
  //error=====>
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  //error===>
  const focusNextField = (inputRef: any) => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  };

  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <KeyboardAvoidingView
        style={{flex: 1}}
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
              textInputStyle={{width: normalized(270)}}
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
              textInputStyle={{width: normalized(270)}}
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
                <CustomSwitch value={switchValue} onToggle={setSwitchValue} />
                <Text style={styles.remembTxt}>Remember Me</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgetPasTxt}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <CustomFilledBtn label={'Sign in'} onPressBtn={() => {}} />
            <View style={styles.signInWithTxt}>
              <View style={styles.simpleLine} />
              <Text style={styles.signInTxt}>Sign in with</Text>
              <View style={styles.simpleLine} />
            </View>
            <View style={styles.socialCont}>
              <SocialBtn
                label={'FACEBOOK'}
                icon={AppImages.Auth.fbIcon}
                atPress={() => {}}
              />
              <SocialBtn
                label={'GOOGLE'}
                icon={AppImages.Auth.google}
                atPress={() => {}}
              />
            </View>
            <Text style={styles.bottomTxt}>
              Don’t have an account?{' '}
              <Text onPress={() => {}} style={styles.signUpBtn}>
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
    marginHorizontal: AppHorizontalMargin,
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
    width: '100%',
    marginTop: 15,
  },
  secondCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: normalized(30),
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
  },
  simpleLine: {
    height: normalized(0.4),
    backgroundColor: '#8391A1',
    width: normalized(130),
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
