import React, {useEffect, useRef, useState} from 'react';
import {
  AppColors,
  AppImages,
  ILocation,
  ScreenProps,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {
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
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import {uploadMedia} from '../../../../Network/Services/GeneralServices';
import {
  setIsAlertShow,
  setIsLoader,
  setUserData,
} from '../../../../Redux/reducers/AppReducer';
import CommonDataManager from '../../../../Utils/CommonManager';
import {AppStrings} from '../../../../Utils/Strings';
import LoadingImage from '../../../Components/LoadingImage';
import SimpleInput from '../../../Components/CustomInput/SimpleInput';
import PressableInput from '../../../Components/CustomInput/PressableInput';
import CustomFilledBtn from '../../../Components/CustomButtom/CustomButton';
import AppImagePicker from '../../../Components/CustomModal/AppImagePicker';
import LocationPickerModal from '../../../Components/CustomModal/LocationPickerModal';
import {updateUserProfileReq} from '../../../../Network/Services/ProfileServices';
import {saveUserData} from '../../../../Utils/AsyncStorage';
const UpdateProfileSccreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected, userData} = useSelector(
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
  useEffect(() => {
    if (userData) {
      setImgUrl(userData?.companyLogo);
      setCompName(userData?.companyName);
      setLocationObj(userData?.companyLocation);
      setRNumber(userData?.companyRegNo);
      setCompType(userData?.companyType);
      setUserName(userData?.userName);
      setEmail(userData?.email);
    }
  }, []);

  const uploadImageToFirebase = async (uri: string, onComplete: any) => {
    await uploadMedia(uri, (url: string | null) => {
      onComplete(url);
    }).finally(() => {});
  };

  const onUpdateProfileFun = async () => {
    if (!imgUrl) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: 'Please select your profile Picture',
        }),
      );

      return;
    }
    if (!compName) {
      setCompNameError('Please enter Company Name');
      return;
    }
    if (CommonDataManager.getSharedInstance().hasNumber(compName)) {
      setCompNameError('Company name cannot contain numbers');
      return;
    }
    if (!locationObj?.address) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: 'Please select location',
        }),
      );
      return;
    }
    if (!compRNumber) {
      setCompRNumberError('Please enter Company Number');
      return;
    }
    if (!compType) {
      setCompTypeError('Please select Business Type');
      return;
    }
    if (!userName) {
      setUserNameError('Please enter username');
      return;
    }
    if (!email) {
      setEmailError('Please enter Email');
      return;
    }
    if (!CommonDataManager.getSharedInstance().isEmailValid(email)) {
      setEmailError(AppStrings.Validation.invalidEmailError);
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

    const paramsObj: any = {
      userName: userName.toLowerCase(),
      email: email?.toLocaleLowerCase(),
      password: password,
      companyName: compName,
      companyRegNo: compRNumber,
      companyType: compType,
      companyLocation: locationObj,
    };
    dispatch(setIsLoader(true));
    if (imgUrl.includes('https://')) {
      paramsObj['companyLogo'] = imgUrl;
      updateProfileReq(paramsObj);
    } else {
      await uploadImageToFirebase(imgUrl, async (result: any) => {
        if (result) {
          paramsObj['companyLogo'] = result;
        }
        updateProfileReq(paramsObj);
      });
    }
  };
  const updateProfileReq = async (payload: any) => {
    let newObj: any = {...userData, ...payload};
    await updateUserProfileReq(newObj)
      .then(() => {
        saveUserData(newObj);
        dispatch(setUserData(newObj));
        dispatch(
          setIsAlertShow({
            value: true,
            message: AppStrings.Network.profileUpdateSuccessfully,
          }),
        );
        props?.navigation?.goBack();
      })
      .catch((e: any) => {
        console.log('error------>', e);
      })
      .finally(() => {
        dispatch(setIsLoader(false));
      });
  };

  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <CustomHeader
        title={'Edit Profile'}
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
            returnKeyType={'next'}
            placeHold={'Your Email'}
            container={styles.inputMainCont}
            textInputStyle={{width: normalized(270)}}
            setValue={(txt: any) => {
              setEmailError('');
              setEmail(txt);
            }}
            isDisable={true}
            value={email}
            secureEntry={false}
            errorMsg={emailError}
          />

          <View style={styles.termCont}>
            <CustomFilledBtn label={'Update'} onPressBtn={onUpdateProfileFun} />
          </View>
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
    ...AppStyles.textRegular,
    alignSelf: 'center',
    marginVertical: normalized(10),
  },
  inputMainCont: {
    width: '100%',
    marginTop: 15,
  },
  bottomTxt: {
    fontSize: normalized(13),
    ...AppStyles.textMedium,
    color: AppColors.black.black,
    alignSelf: 'center',
    marginVertical: normalized(20),
  },
  signUpBtn: {
    fontSize: normalized(13),
    ...AppStyles.textMedium,
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
    ...AppStyles.textRegular,
    color: AppColors.black.black,
    marginStart: normalized(5),
  },
  socialCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
});
export default UpdateProfileSccreen;
