import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Keyboard, Linking, Platform} from 'react-native';
import {normalized, ScreenProps} from './AppConstants';
import {AppStrings} from './Strings';
import { SocialTypeStrings } from './AppEnums';
import { appleLoginRequest, facebookLoginRequest, gmailLoginRequest } from './Social.d';
import { setIsAlertShow, setIsLoader, setUserData } from '../Redux/reducers/AppReducer';
import { loginRequest, userSignupRequest } from '../Network/Services/AuthServices';
import { saveUserData } from './AsyncStorage';
import { Routes } from './Routes';

export default class CommonDataManager {
  static shared: CommonDataManager;
  _translations = [];
  _currentLanguage = 'en';
  _screenStack: ScreenProps | null = null;
  selector: any = null;
  dispatch: any = null;
  containerDispatcher: any;
  _packageDetails: any;

  static getSharedInstance() {
    if (CommonDataManager.shared == null) {
      CommonDataManager.shared = new CommonDataManager();
      CommonDataManager.shared.setup();
    }
    return CommonDataManager.shared;
  }
  setContainerDispatcher = (dispatch: any) => {
    this.containerDispatcher = dispatch;
  };
  getContainerDispatcher = () => {
    return this.containerDispatcher;
  };
  redirectToUrl = async (url: string) => {
    try {
      await Linking.openURL(this.validateUrl(url));
    } catch (e) {
      console.log('Something wrong ', e);
    }
  };
  setup = async () => {
    try {
      this._translations = [];
      const localTranslaionsData = require('../Utils/translation.json');
      this._translations = localTranslaionsData;
    } catch (e) {}
  };
  setReduxReducer = (select: any, dispatch: any) => {
    this.selector = select;
    this.dispatch = dispatch;
  };

  showPopUp = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: true},
    );
  };
  showPopUpWithOk = (title: string, message: string, onClick: () => void) => {
    Alert.alert(title, message, [{text: 'OK', onPress: () => onClick()}], {
      cancelable: false,
    });
  };
  showPopUpWithOkCancel = (
    title: string,
    message: string,
    onClick: () => void,
  ) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'Cancel', onPress: () => console.log('OK Pressed')},
        {text: 'OK', onPress: () => onClick()},
      ],
      {cancelable: true},
    );
  };
  showPopUpWithOkCancel1 = (
    title: string,
    message: string,
    ok: string = '',
    cancel: string = '',
    onClick: () => void,
  ) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: cancel == '' ? 'Cancel' : cancel,
          onPress: () => console.log('OK Pressed'),
        },
        {text: ok == '' ? 'OK' : ok, onPress: () => onClick()},
      ],
      {cancelable: true},
    );
  };
  showPopUpReset = (title: string, message: string, resetPress: () => void) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'Reset', onPress: () => resetPress()},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: true},
    );
  };
  isEmailValid = (email: string) => {
    if (!email) {
      return false;
    }
    let validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validEmailRegex.test(email.trim());
  };
  isPasswordValid = (password: string) => {
    return password?.trim()?.length >= 8;
  };
  isValidUrl = (url: string) => {
    const regex =
      /^((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?|[a-zA-Z]:\\[^\\\/\s]+(\\[^\\\/\s]+)*)$/i;
    return regex.test(url);
  };
  validateUrl = (url: string) => {
    if (url && !url?.toLowerCase()?.includes('http')) {
      return `https://${url}`;
    }
    return url;
  };
  // Accepts both with +1 numbers and without as well.
  formatUSNumber = (phoneNumberString: string) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return '';
  };

  getFormattedPhoneNumber = (
    code: string,
    phone: string,
    ignoreCode = false,
  ) => {
    if (!code || !phone) {
      return '';
    }
    let fullNumber = `${this.addPlusToNumber(code)}${phone}`;
    const customNumber = ignoreCode ? phone : fullNumber;
    if (
      this.addPlusToNumber(code) == '+1' &&
      phone.length >= 10
    ) {
      return this.formatUSNumber(customNumber);
    } else {
      return ignoreCode ? phone : `${this.addPlusToNumber(code)} ${phone}`;
    }
  };
  _setScreenStack = (props: ScreenProps) => {
    this._screenStack = props;
  };
  getAppleUser = async (params: any, setUser: (user: any) => void) => {
    let users = {
      email: params.email,
      firstname: params.firstname,
      lastname: params.lastname,
      authId: params.authId,
      authType: 'apple',
      isSocialType: true,
    };
    let list = await AsyncStorage.getItem('appleUserList');
    if (list) {
      let allList = JSON.parse(list);
      if (allList[users.authId]) {
        (users.email = allList[users.authId].email),
          (users.firstname = allList[users.authId].firstname),
          (users.lastname = allList[users.authId].lastname);
      } else {
        allList[users.authId] = users;
        await AsyncStorage.setItem('appleUserList', JSON.stringify(allList));
      }
    } else {
      let allList: any = {};
      allList[users.authId] = users;
      await AsyncStorage.setItem('appleUserList', JSON.stringify(allList));
    }
    setUser(users);
  };

  truncateString = (str: any) => {
    if (!str) {
      return '';
    }
    let newStringArray = str.split(' ');
    let combinedString = '';
    newStringArray.map((el: any) => {
      combinedString = combinedString + (el == '' ? '' : el.trim() + ' ');
    });
    return combinedString.trim();
  };

  socialCallRequest = async (isNetConnected: boolean, socialType: string) => {
    let socialParams;
    if (socialType == SocialTypeStrings.google) {
      const response = await gmailLoginRequest(isNetConnected);
      // console.log('This is gmail response => ', JSON.stringify(response));
      if (response.success) {
        // console.log(
        //   'This is response from Google => ',
        //   JSON.stringify(response),
        // );
        socialParams = {
          token: response.data?.user?.id,
          first_name: this.truncateString(
            response.data?.user?.givenName,
          ),
          last_name: this.truncateString(
            response.data?.user?.familyName,
          ),
          email: response.data?.user?.email,
        };
      } else if (response.message !== AppStrings.Permissions.cancelled) {
        Alert.alert('Error', response?.message)
      }
    }

    if (socialType == SocialTypeStrings.facebook) {
      const response: any = await facebookLoginRequest(isNetConnected);
      if (response.success) {
        socialParams = {
          token: response.data?.id,
          first_name: response.data?.first_name
            ? this.truncateString(
                response.data?.first_name,
              )
            : '',
          last_name: response.data?.last_name
            ? this.truncateString(
                response.data?.last_name,
              )
            : '',
          email: response.data?.email ? response.data?.email : '',
        };
      } else if (response.message !== AppStrings.Permissions.cancelled) {
        Alert.alert('Error', response?.message)
      }
    }

    if (socialType == SocialTypeStrings.apple) {
      const response: any = await appleLoginRequest(isNetConnected);
      if (response.success) {
        console.log(
          'This is response from Apple => ',
          JSON.stringify(response),
        );
        socialParams = {
          token: response.data?.user,
          first_name: this.truncateString(
            response.data?.fullName?.givenName,
          ),
          last_name: this.truncateString(
            response.data?.fullName?.familyName,
          ),
          email: response.data?.email ? response.data?.email : '',
        };
      } else {
        Alert.alert('Error', response?.message)
      }
    }

    if (socialParams) {
      return {
        ...socialParams,
        provider_type: socialType,
      };
    } else {
      return null;
    }
  };

  isUpper(str: string) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!()@#$%&?’*+,-./:";<=>^_`{|}~])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(str);
  }

  isNumber = (str: string) => {
    if (str == '') {
      return true;
    }
    const numberRegex = /^[0-9]+$/;
    if (numberRegex.test(str) == true) {
      return true;
    }
    return false;
  };

  isNumber2 = (str: string) => {
    if (str == '') {
      return true;
    }
    const numberRegex = /^[\d]+$/;
    return numberRegex.test(str);
  };

  isValidNumber = (phoneCode: string, phoneNumber: string) => {
    if (!phoneCode || !phoneNumber) {
      return false;
    }
    if (this.addPlusToNumber(phoneCode) == '+1') {
      return phoneNumber?.length > 9;
    }
    if (phoneNumber?.length <= 13 && phoneNumber?.length >= 8) {
      return true;
    } else {
      return false;
    }
  };

  hasNumber = (str: string) => {
    const regex = /\d/;
    return regex.test(str);
  };

  isValidUsNumber = (number: string) => {
    const secondRegex = /^(1-)?\d{3}-\d{3}-\d{4}$/;
    let inputtxt = '';
    let zeroFound = false;
    for (let i = 0; i < number.length; i++) {
      if (i === 0) {
        if (number.charAt(i) === '0') {
          zeroFound = true;
        } else {
          inputtxt = number;
          break;
        }
      } else if (i == 1) {
        if (number.charAt(i) === '0') {
        } else {
          inputtxt += number.charAt(i);
        }
      } else {
        inputtxt += number.charAt(i);
      }
    }
    if (zeroFound == true && !inputtxt.includes('-')) {
      return true;
    }
    if (inputtxt.length < 12) {
      if (inputtxt.includes('-')) {
        return false;
      } else {
        return true;
      }
    }
    if (secondRegex.test(inputtxt) == true) {
      return true;
    } else {
      return false;
    }
  };

  capitalizeFirstLetter = (str: any) => {
    if (!str) {
      return '';
    }
    let firstChar = str.charAt(0);
    return firstChar.toUpperCase() + str.slice(1);
  };
  getCountryFlagCode = (str: string) => {
    const flagString = str.split('-');
    if (flagString[1]) {
      return flagString[1];
    } else {
      return '';
    }
  };
  resetToScreen = (navigation: any, screenName: string, params?: any) => {
    let routeData: any = {
      name: screenName,
    };
    if (params) {
      routeData.params = params;
    }
    navigation.reset({
      index: 0,
      routes: [routeData],
    });
  };

  removePlusFromNumber = (str: any) => {
    if (!str) {
      return '';
    }
    if (str.includes('+')) {
      return str.slice(1);
    } else {
      return str;
    }
  };

  addPlusToNumber = (str: any) => {
    if (!str) {
      return '';
    }
    if (str.includes('+')) {
      return str;
    } else {
      return `+${str}`;
    }
  };

  getUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  getFirstNameCharacters = (name: string) => {
    if (!name) {
      return '';
    }
    return name.charAt(0).toUpperCase();
  };

  isCustomSocial = (name: string) => {
    return name?.toLowerCase() == 'custom';
  };

  generateIdForSocial = () => {
    return `ignoreId${this.getUniqueId()}`;
  };

  getResponiveFontSize = (str: string) => {
    if (!str) {
      return normalized(14);
    }
    return str.length < 25
      ? normalized(22)
      : str.length < 35
      ? normalized(20)
      : str.length < 40
      ? normalized(18)
      : str.length < 45
      ? normalized(16)
      : normalized(14);
  };

  openNativeMaps = (loc: any, addressLabel: string) => {
    try {
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const latLng = `${loc.lat},${loc.lng}`;
      const label = addressLabel ? addressLabel : 'Card Location';
      const url: any = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });
      Linking.openURL(url);
    } catch (e) {
      console.log('Error while opening map ', e);
    }
  };

  getCapitalizedNameInitials = (name: string) => {
    if (!name) {
      return '-';
    }
    const arr = name.split(' ');
    let str = '';
    arr.forEach(element => {
      str = str + this.capitalizeFirstLetter(element) + ' ';
    });
    return str.trim();
  };

  getFullNameFormatted = (fullObj: any) => {
    const fullname = fullObj?.name
      ? fullObj?.name
      : `${fullObj?.first_name + ' ' || ''}${fullObj?.last_name + ' ' || ''}`;
    return this.getCapitalizedNameInitials(fullname);
  };

  makeImageObj = (image: any) => {
    let obj: any = {};
    if (image) {
      obj['uri'] = image?.uri
        ? image?.uri
        : image?.sourceURL
        ? image?.sourceURL
        : image?.path;
      obj['name'] = image?.filename
        ? image?.filename
        : image?.fileName
        ? image?.fileName
        : image?.name
        ? image?.name
        : image?.path
        ? image?.path?.split('/')[image?.path?.split('/')?.length - 1]
        : image?.sourceURL?.split('/')[
            image?.sourceURL?.split('/')?.length - 1
          ];
      obj['type'] = image?.type ? image?.type : image.mime;
    }
    return obj;
  };

  commonSocialLoginRequest = async (socialType: string, isNetConnected: boolean, isPersisterUser: boolean, navigation: any) => {
    Keyboard.dismiss();
    this.dispatch(setIsLoader(true));
    let socialParams = await this.socialCallRequest(isNetConnected, socialType)
      .catch(e => {
        this.dispatch(setIsLoader(false))
        console.log('Er ', e)
      })
    if (socialParams) {
      const paramsObj = {
        email: socialParams.email,
        password: socialParams.token,
      };
      console.log("paramsObj: ", paramsObj);
      await loginRequest(paramsObj, async response => {
        console.log("response - loginRequest: ");
        console.log(response);
        if (response?.status) {
          this.dispatch(setUserData
            (response?.data));
          if (isPersisterUser) {
            await saveUserData(response?.data);
          }
        } else {
          this.dispatch(setIsLoader(false));
          let errorMessage = response?.message
            ? response?.message
            : 'Something went wrong';
          console.log("errorMessage: ", errorMessage);
          if (errorMessage == 'User not found against this Email.') {
            navigation.push(Routes.Auth.profileCompleteScreen, {
              socialParams: socialParams
            })
            return;
          }
          this.dispatch(
            setIsAlertShow({
              value: true,
              message: errorMessage,
            }),
          );
        }
        this.dispatch(setIsLoader(false));
      }).catch((e) => {
        console.log('Err ', e);
        this.dispatch(setIsLoader(false))
      })
    } else {
      console.log('here 23');
      this.dispatch(setIsLoader(false));
      console.log('Some problem getting social data');
    }
  };

}
