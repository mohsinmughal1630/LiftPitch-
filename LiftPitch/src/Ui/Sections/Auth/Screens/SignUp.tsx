import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  AppColors,
  AppImages,
  ILocation,
  ScreenProps,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import SimpleInput from '../../../Components/CustomInput/SimpleInput';
import CustomFilledBtn from '../../../Components/CustomButtom/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoader, setUserData} from '../../../../Redux/reducers/AppReducer';
import {Routes} from '../../../../Utils/Routes';
import CommonDataManager from '../../../../Utils/CommonManager';
import AppImagePicker from '../../../Components/CustomModal/AppImagePicker';
import {saveUserData} from '../../../../Utils/AsyncStorage';
import {AppStrings} from '../../../../Utils/Strings';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import LocationPickerModal from '../../../Components/CustomModal/LocationPickerModal';
import PressableInput from '../../../Components/CustomInput/PressableInput';
import {userSignupRequest} from '../../../../Network/Services/AuthServices';
import LoadingImage from '../../../Components/LoadingImage';

const SignUp = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected, isPersisterUser} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [openImage, setOpenImage] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [compName, setCompName] = useState('');
  const [compRNumber, setRNumber] = useState('');
  const [compType, setCompType] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [locationObj, setLocationObj] = useState<null | ILocation>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const compRNRef = useRef();
  const compTypeRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cPAsswordRef = useRef();

  //error====>
  const [compNameError, setCompNameError] = useState('');
  const [compRNumberError, setCompRNumberError] = useState('');
  const [compTypeError, setCompTypeError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  const focusNextField = (inputRef: any) => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  };

  const onRegisterPress = async () => {
    if (
      !email ||
      !password ||
      !cPassword ||
      !compName ||
      !compRNumber ||
      !compType ||
      !userName ||
      !locationObj
    ) {
      Alert.alert('Error', AppStrings.Validation.fieldsEmptyError);
      return;
    }
    if (CommonDataManager.getSharedInstance().hasNumber(compName)) {
      Alert.alert('Error', 'Company name cannot contain numbers');
      return;
    }
    if (!CommonDataManager.getSharedInstance().isEmailValid(email)) {
      Alert.alert('Error', AppStrings.Validation.invalidEmailError);
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password should be at least 8 characters long');
      return;
    }
    if (password !== cPassword) {
      Alert.alert('Error', AppStrings.Validation.passwordNotMatchError);
      return;
    }
    if (!isChecked) {
      Alert.alert('Error', 'Please accept the terms and conditions first');
      return;
    }
    if (!isNetConnected) {
      Alert.alert('Error', AppStrings.Network.internetError);
      return;
    }
    const paramsObj = {
      userName,
      email,
      password,
      companyName: compName,
      companyRegNo: compRNumber,
      companyType: compType,
      companyLocation: locationObj,
      companyLogo: imgUrl,
    };
    dispatch(setIsLoader(true));
    await userSignupRequest(paramsObj, response => {
      console.log('This is response => ', JSON.stringify(response));
      dispatch(setIsLoader(false));
      if (response) {
        CommonDataManager.getSharedInstance().showPopUpWithOk(
          'Success',
          'User successfully registered',
          () => {
            dispatch(setUserData(response));
            if (isPersisterUser) {
              saveUserData(response);
            }
          },
        );
      } else {
        console.log('User not registered');
      }
    }).catch(() => dispatch(setIsLoader(false)));
  };

  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader
        title={'Create Account'}
        atBackPress={() => {
          props?.navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(35) : hv(30)}>
        <ScrollView
          style={styles.containerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={{alignSelf: 'center'}}>
            {imgUrl ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setOpenImage(true);
                }}>
                <LoadingImage
                  source={{uri: imgUrl}}
                  viewStyle={styles.imageCont}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.imageCont}
                activeOpacity={1}
                onPress={() => {
                  setOpenImage(true);
                }}>
                <Image
                  source={AppImages.Auth.Camera}
                  resizeMode="contain"
                  style={{
                    height: '30%',
                    width: '30%',
                  }}
                />
              </TouchableOpacity>
            )}
            <Text style={styles.uploadTxt}>Upload Logo</Text>
          </View>
          <SimpleInput
            onSubmitEditing={() => setShowLocationModal(true)}
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
          <PressableInput
            value={locationObj?.address}
            container={styles.inputMainCont}
            onPress={() => setShowLocationModal(true)}
            onClear={() => setLocationObj(null)}
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
            onSubmitEditing={() => focusNextField(emailRef)}
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
            ref={emailRef}
            onSubmitEditing={() => focusNextField(passwordRef)}
            returnKeyType={'next'}
            placeHold={'Your Email'}
            container={styles.inputMainCont}
            textInputStyle={{width: normalized(270)}}
            setValue={(txt: any) => {
              setEmailError('');
              setEmail(txt);
            }}
            value={email}
            secureEntry={false}
            errorMsg={emailError}
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
            <TouchableWithoutFeedback onPress={() => setIsChecked(!isChecked)}>
              <View style={styles.checkCont}>
                {isChecked && (
                  <Image
                    source={AppImages.Common.TickIconMini}
                    resizeMode="contain"
                    style={{
                      height: normalized(12),
                      width: normalized(12),
                    }}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.termsTxt}>
              Yes I agree to terms & conditions{' '}
            </Text>
          </View>
          <CustomFilledBtn
            label={'Create Account'}
            onPressBtn={onRegisterPress}
          />
          <Text style={styles.bottomTxt}>
            Already have an account?{' '}
            <Text
              onPress={() => {
                props?.navigation.navigate(Routes.Auth.login);
              }}
              style={styles.signUpBtn}>
              {' '}
              Sign in
            </Text>
          </Text>
        </ScrollView>
        {openImage ? (
          <AppImagePicker
            onClose={() => {
              setOpenImage(false);
            }}
            onImageSelect={(url: string | null) => {
              setOpenImage(false);
              if (url) {
                setImgUrl(url);
              }
            }}
          />
        ) : null}
      </KeyboardAvoidingView>
      {showLocationModal && (
        <LocationPickerModal
          onSelectLocation={loc => {
            setLocationObj(loc);
            setTimeout(() => {
              focusNextField(compRNRef);
            }, 500);
          }}
          onClose={() => setShowLocationModal(false)}
        />
      )}
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
    height: normalized(20),
    width: normalized(20),
    borderWidth: 1,
    borderColor: '#E4DFDF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsTxt: {
    fontSize: normalized(14),
    fontWeight: '400',
    color: AppColors.black.black,
    marginStart: normalized(5),
  },
});

export default SignUp;
