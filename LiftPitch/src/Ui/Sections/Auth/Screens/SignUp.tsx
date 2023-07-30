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
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import SimpleInput from '../../../Components/CustomInput/SimpleInput';
import CustomFilledBtn from '../../../Components/CustomButtom/CustomButton';
const SignUp = (props: ScreenProps) => {
  const [image, setImage] = useState<any>(null);
  const [compName, setCompName] = useState('');
  const [compAddress, setCompAddress] = useState('');
  const [compRNumber, setRNumber] = useState('');
  const [compType, setCompType] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const compAddressRef = useRef();
  const compRNRef = useRef();
  const compTypeRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const cPAsswordRef = useRef();

  //error====>
  const [compNameError, setCompNameError] = useState('');
  const [compAddressError, setCompAddressError] = useState('');
  const [compRNumberError, setCompRNumberError] = useState('');
  const [compTypeError, setCompTypeError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const focusNextField = (inputRef: any) => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  };

  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader title={'Create Account'} atBackPress={() => {}} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(35) : hv(30)}>
        <ScrollView
          style={styles.containerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={{alignSelf: 'center'}}>
            {image ? (
              <TouchableOpacity activeOpacity={1} style={styles.imageCont}>
                <Image source={image?.uri ? image?.uri : {uri: image}} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.imageCont} activeOpacity={1}>
                <Image source={AppImages.Auth.Camera} />
              </TouchableOpacity>
            )}
            <Text style={styles.uploadTxt}>Upload Logo</Text>
          </View>
          <SimpleInput
            onSubmitEditing={() => focusNextField(compAddressRef)}
            returnKeyType={'next'}
            placeHold={'Company Name'}
            container={styles.inputMainCont}
            textInputStyle={{width: normalized(270)}}
            setValue={(txt: any) => {
              setCompNameError('');
              setCompName(txt);
            }}
            value={compName}
            secureEntry={false}
            errorMsg={compNameError}
          />
          <SimpleInput
            ref={compAddressRef}
            onSubmitEditing={() => focusNextField(compRNRef)}
            returnKeyType={'next'}
            placeHold={'Company address'}
            container={styles.inputMainCont}
            textInputStyle={{width: normalized(270)}}
            setValue={(txt: any) => {
              setCompAddressError('');
              setCompAddress(txt);
            }}
            value={compAddress}
            secureEntry={false}
            errorMsg={compAddressError}
          />
          <SimpleInput
            ref={compRNRef}
            onSubmitEditing={() => focusNextField(compTypeRef)}
            returnKeyType={'next'}
            placeHold={'Company Registration Number '}
            container={styles.inputMainCont}
            textInputStyle={{width: normalized(270)}}
            setValue={(txt: any) => {
              setCompRNumberError('');
              setRNumber(txt);
            }}
            value={compRNumber}
            secureEntry={false}
            errorMsg={compRNumberError}
          />
          <SimpleInput
            ref={compTypeRef}
            onSubmitEditing={() => focusNextField(userNameRef)}
            returnKeyType={'next'}
            placeHold={'Business Type / Industry'}
            container={styles.inputMainCont}
            textInputStyle={{width: normalized(270)}}
            setValue={(txt: any) => {
              setCompTypeError('');
              setCompType(txt);
            }}
            value={compType}
            secureEntry={false}
            errorMsg={compTypeError}
          />
          <SimpleInput
            ref={userNameRef}
            onSubmitEditing={() => focusNextField(passwordRef)}
            returnKeyType={'next'}
            placeHold={'Your Name'}
            container={styles.inputMainCont}
            textInputStyle={{width: normalized(270)}}
            setValue={(txt: any) => {
              setUserNameError('');
              setUserName(txt);
            }}
            value={userName}
            secureEntry={false}
            errorMsg={userNameError}
          />

          <SimpleInput
            ref={passwordRef}
            onSubmitEditing={() => focusNextField(cPAsswordRef)}
            placeHold={'Password'}
            returnKeyType={'next'}
            container={styles.inputMainCont}
            textInputStyle={{width: normalized(270)}}
            setValue={(passTxt: any) => {
              if (passTxt.includes(' ')) {
                setPassword(passTxt.trim());
              } else {
                setPasswordError('');
                setPassword(passTxt);
              }
            }}
            value={password}
            secureEntry={true}
            errorMsg={passwordError}
          />
          <SimpleInput
            ref={cPAsswordRef}
            placeHold={'Confirm Password'}
            container={styles.inputMainCont}
            textInputStyle={{width: normalized(270)}}
            setValue={(passTxt: any) => {
              if (passTxt.includes(' ')) {
                setCPassword(passTxt.trim());
              } else {
                setPasswordError('');
                setCPassword(passTxt);
              }
            }}
            value={cPassword}
            secureEntry={true}
            errorMsg={passwordError}
          />
          <View style={styles.termCont}>
            <View style={styles.checkCont} />
            <Text style={styles.termsTxt}>
              Yes I agree to terms & conditions{' '}
            </Text>
          </View>
          <CustomFilledBtn label={'Create Account'} onPressBtn={() => {}} />
          <Text style={styles.bottomTxt}>
            Already have an account?{' '}
            <Text onPress={() => {}} style={styles.signUpBtn}>
              {' '}
              Sign in
            </Text>
          </Text>
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
  imageCont: {
    backgroundColor: '#959595',
    height: normalized(120),
    width: normalized(120),
    borderRadius: normalized(120 / 2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadTxt: {
    fontSize: normalized(14),
    color: '#8391A1',
    fontWeight: '400',
    alignSelf: 'center',
    marginVertical: normalized(10),
  },
  inputMainCont: {
    width: '100%',
    marginTop: 15,
  },
  bottomTxt: {
    fontSize: normalized(13),
    fontWeight: '500',
    color: AppColors.black.black,
    alignSelf: 'center',
    marginVertical: normalized(20),
  },
  signUpBtn: {
    fontSize: normalized(13),
    fontWeight: '500',
    color: '#7E2A70',
    alignSelf: 'center',
    marginVertical: normalized(20),
  },
  termCont: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalized(20),
  },
  checkCont: {
    borderRadius: normalized(5),
    height: normalized(25),
    width: normalized(25),
    borderWidth: 1,
    borderColor: '#E4DFDF',
  },
  termsTxt: {
    fontSize: normalized(14),
    fontWeight: '400',
    color: AppColors.black.black,
    marginStart: normalized(5),
  },
});

export default SignUp;
