import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  Dimensions,
  Linking,
  Platform,
  StatusBar,
  Share,
} from 'react-native';
import {AppImages, normalized, ScreenProps} from './AppConstants';
import {AppStrings, AsyncKeyStrings} from './Strings';
import {SocialTypeStrings} from './AppEnums';
import {facebookLoginRequest, gmailLoginRequest} from './Social.d';
import {setIsAlertShow, setIsLoader} from '../Redux/reducer/AppReducer';

export default class CommonDataManager {
  static shared: CommonDataManager;
  _translations = [];
  _currentLanguage = 'en';
  _screenStack: ScreenProps = null;
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

  setupPackageDetails = async (obj: JSON) => {
    try {
      if (!obj) {
        console.log('Cannot set empty json object');
        return;
      }
      this._packageDetails = obj;
    } catch (e) {}
  };

  getPackageInfo = (packageType: string, labelString: string) => {
    if (!packageType || !labelString || !this._packageDetails) {
      console.log('Found nothing against package details');
      return 0;
    }
    var packageDic = this._packageDetails[packageType];
    var foundValue = packageDic[labelString];
    if (foundValue) {
      return foundValue;
    } else {
      return 0;
    }
  };

  getTranslation = (language: any, screen: any, labelString: string) => {
    var lbl = '';
    var languageDic = this._translations[language];
    var mainScreen = languageDic[screen];
    if (mainScreen !== undefined) {
      var translatedLabel = mainScreen[labelString];
      if (translatedLabel !== undefined) {
        lbl = translatedLabel;
      }
    }
    return lbl;
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
      CommonDataManager.getSharedInstance().addPlusToNumber(code) == '+1' &&
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

  logoutUserRequest = async (isNetConnected: boolean) => {
    console.log('logout User API integrate Here====>');
  };

  logoutUser = async () => {
    console.log('louOut User------>');
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
  getUserData = async () => {
    try {
      let user = await AsyncStorage.getItem(AsyncKeyStrings.Auth.userdata);
      if (user) {
        return JSON.parse(user);
      } else {
        return null;
      }
    } catch (e) {
      console.log('Error ', e);
      return null;
    }
  };
  saveUserData = async (data: any) => {
    try {
      await AsyncStorage.setItem(
        AsyncKeyStrings.Auth.userdata,
        JSON.stringify(data),
      );
    } catch (e) {
      console.log('Error storing userdata', e);
    }
  };
  getUserToken = async () => {
    try {
      let t = await AsyncStorage.getItem(AsyncKeyStrings.Auth.userToken);
      if (t) {
        return t;
      } else {
        return null;
      }
    } catch (e) {
      console.log('Error', e);
      return null;
    }
  };
  saveUserToken = async (token: string) => {
    try {
      await AsyncStorage.setItem(AsyncKeyStrings.Auth.userToken, token);
    } catch (e) {
      console.log('Error storing usertoken', e);
    }
  };

  checkEmptyObj = (obj: any, setError: (data: any) => void) => {
    let errorObj = {};
    let isEmpty = false;
    Object.keys(obj).map(item => {
      if (obj[item].trim() == '') {
        errorObj = {
          ...errorObj,
          [item]: true,
        };
        isEmpty = true;
      } else {
        errorObj = {
          ...errorObj,
          [item]: false,
        };
      }
    });
    setError(errorObj);
    return isEmpty;
  };
  isFieldEmpty = (str: string) => {
    if (!str) {
      return true;
    }
    return str.trim() == '';
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

  combineFullNumber = (arr: any) => {
    let str = '';
    if (arr.length == 0) {
      return str;
    }
    arr.map((item: string) => {
      str = str + item;
    });
    return str.trim();
  };
  // Used while selecting contact from phone in create emergency screen. Fetching their names.
  combineFullName = (str: string) => {
    if (!str) {
      return {
        firstName: '',
        lastName: '',
      };
    }

    let newStringArray = str.split(' ');
    let firstNameStr = '';
    let lastNameStr = '';
    let totalWords = newStringArray.length;
    if (totalWords == 1) {
      return {
        firstName: newStringArray[0],
        lastName: '',
      };
    }
    if (totalWords == 2) {
      return {
        firstName: newStringArray[0],
        lastName: newStringArray[1],
      };
    }
    let midPoint = Math.round(totalWords / 2);
    newStringArray.slice(0, midPoint).map(el => {
      firstNameStr = firstNameStr + ' ' + el;
    });
    newStringArray.slice(midPoint, totalWords).map(el => {
      lastNameStr = lastNameStr + ' ' + el;
    });
    return {
      firstName: firstNameStr.trim(),
      lastName: lastNameStr.trim(),
    };
  };

  redirectToUrl = async (url: string) => {
    try {
      await Linking.openURL(this.validateUrl(url));
    } catch (e) {
      console.log('Something wrong ', e);
    }
  };

  socialCallRequest = async (socialType: string) => {
    const isNetConnected = this.selector.AppReducer.isNetConnected;
    let socialParams;
    if (socialType == SocialTypeStrings.google) {
      const response = await gmailLoginRequest(isNetConnected);
      console.log('This is gmail response => ', JSON.stringify(response));
      if (response.success) {
        console.log(
          'This is response from Google => ',
          JSON.stringify(response),
        );
        socialParams = {
          token: response.data?.user?.id,
          first_name: CommonDataManager.getSharedInstance().truncateString(
            response.data?.user?.givenName,
          ),
          last_name: CommonDataManager.getSharedInstance().truncateString(
            response.data?.user?.familyName,
          ),
          email: response.data?.user?.email,
        };
      } else if (response.message !== AppStrings.Permissions.cancelled) {
        this.dispatch(
          setIsAlertShow({
            value: true,
            title: AppStrings.Network.errorTitle,
            message: response?.message,
          }),
        );
      }
    }

    if (socialType == SocialTypeStrings.facebook) {
      const response: any = await facebookLoginRequest(isNetConnected);
      if (response.success) {
        socialParams = {
          token: response.data?.id,
          first_name: response.data?.first_name
            ? CommonDataManager.getSharedInstance().truncateString(
                response.data?.first_name,
              )
            : '',
          last_name: response.data?.last_name
            ? CommonDataManager.getSharedInstance().truncateString(
                response.data?.last_name,
              )
            : '',
          email: response.data?.email ? response.data?.email : '',
        };
      } else if (response.message !== AppStrings.Permissions.cancelled) {
        this.dispatch(
          setIsAlertShow({
            value: true,
            title: AppStrings.Network.errorTitle,
            message: response?.message,
          }),
        );
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

  getUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  getFirstNameCharacters = (name: string) => {
    if (!name) {
      return '';
    }
    return name.charAt(0).toUpperCase();
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
}
