import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Keyboard, Linking, PermissionsAndroid, Platform } from 'react-native';
import { AppColors, normalized, ScreenProps } from './AppConstants';
import { AppStrings } from './Strings';
import { SocialTypeStrings } from './AppEnums';
import { appleLoginRequest, facebookLoginRequest, gmailLoginRequest } from './Social.d';
import { setIsAlertShow, setIsLoader, setUserData } from '../Redux/reducers/AppReducer';
import { loginRequest, userSignupRequest } from '../Network/Services/AuthServices';
import { saveUserData } from './AsyncStorage';
import { Routes } from './Routes';
import RNFS, { DownloadBeginCallbackResult, DownloadProgressCallbackResult } from "react-native-fs";
import Share from "react-native-share";
import Contacts from 'react-native-contacts';

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
    } catch (e) { }
  };
  setReduxReducer = (select: any, dispatch: any) => {
    this.selector = select;
    this.dispatch = dispatch;
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
          first_name: this.truncateString(response.data?.user?.givenName),
          last_name: this.truncateString(response.data?.user?.familyName),
          email: response.data?.user?.email,
        };
      } else if (response.message !== AppStrings.Permissions.cancelled) {
        Alert.alert('Error', response?.message);
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
        Alert.alert('Error', response?.message);
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
        Alert.alert('Error', response?.message);
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
  // remove empty lines at the end and start of a string
  removeEmptyLines = (str: any) => {
    if (!str) return '';
    str = str.trim();
    return str.replace(/^\s+|\s+$/g, '');
  };

  generateRandomColor = (index: any) => {
    const colorIndex = index % 5;
    const allColors = [
      AppColors.primaryPurple,
      AppColors.red.warning,
      AppColors.red.mainColor,
      AppColors.black.simpleLight,
      AppColors.black.brown,
    ];
    return allColors[colorIndex];
  };

  capitalizeFirstLetterFromSentence = (txt = '') => {
    if (txt?.length > 0) {
      const arr = txt.split(' ');
      return arr.length == 0
        ? '-'
        : arr.length == 1
          ? txt.charAt(0).toUpperCase()
          : arr[0].charAt(0).toUpperCase() + arr[1].charAt(0).toUpperCase();
    } else {
      return '';
    }
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

  convertRemoteVideoToBase64 = async (videoUrl: string, onProgress: (obj: DownloadProgressCallbackResult) => void, onComplete: (url: string) => void) => {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/video.mp4`;
    try {
      const options = {
        fromUrl: videoUrl,
        toFile: downloadDest,
        discretionary: true,
        begin: () => { }, // onBegin: (res: DownloadBeginCallbackResult) => void,
        progress: onProgress,
      };

      const response = RNFS.downloadFile(options);
      console.log("response: ", response);

      response.promise.then(async result => {
        console.log("result: ", result);
        if (result.statusCode === 200) {
          console.log('Video downloaded successfully:', downloadDest);
          // const base64String = await RNFS.readFile(downloadDest, "base64");
          onComplete(downloadDest);
        } else {
          console.error('Error downloading video:', result.statusCode);
        }
      }).catch(error => {
        console.error('Error while downloading video:', error);
      });
    } catch (error) {
      console.error('Error in downloadVideo function:', error);
    }
  }


  shareVideo = async (videoUrl: string) => {
    try {
      const filePath = Platform.OS == 'ios' ? videoUrl : `content://${videoUrl}`;
      let shareOptions = {
        title: "Check out my video",
        message: "Check out my video!",
        url: filePath,
        type: 'video/mp4',
        subject: "Check out my video!"
      };
      setTimeout(() => {
        Share.open(shareOptions)
          .then((res: any) => console.log('res:', res))
          .catch((err: any) => console.log('err', err));
      }, 1500);
      // };
      // })
    } catch (e) {
      console.log('Error sharing video ', e)
    }
  }


  fetchDeviceContacts = async (userId: string, onErr: () => void, onSuccess: (list: Array<any>) => void) => {
    try {
      if (Platform.OS == 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );
        console.log('granted ', granted);
        if (granted == 'granted') {
          const result = await this.fetchContacts(userId);
          onSuccess(result);
        } else if (granted === 'never_ask_again') {
          onErr();
        } else {
          console.log('Some error ');
        }
      } else {
        // IOS
        Contacts.checkPermission().then(async permission => {
          if (permission === 'undefined') {
            await Contacts.requestPermission().then(async permission => {
              if (permission == 'authorized') {
                const result = await this.fetchContacts(userId);
                onSuccess(result);
              }
            });
          }
          if (permission === 'authorized') {
            const result = await this.fetchContacts(userId);
            onSuccess(result);
          }
          if (permission === 'denied') {
            onErr();
          }
        });
      }
    } catch (e) {
      console.log('Some er ', e);
    }
  };

  // normalizePhoneNumber(phoneNumber: any) {
  //   const number = typeof phoneNumber == 'string' ? phoneNumber : phoneNumber.number;
  //   const numericPhoneNumber = number.replace(/\D/g, '');
  //   return numericPhoneNumber;
  // }

  // isMatchingContact = (contactsList: Array<any>, userPhone: string) => {
  //   const result = contactsList.find(contact => {
  //     for (const phoneNumber of contact.phoneNumbers) {
  //       const normalizedPhoneNumber = this.normalizePhoneNumber(phoneNumber);
  //       const normalizedUserPhoneNumber = this.normalizePhoneNumber(userPhone).slice(3);
  //       if (normalizedPhoneNumber.includes(normalizedUserPhoneNumber)) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   })
  //   return result ? true : false;
  // };

  fetchContacts = async (userId: string) => {
    try {
      const allContacts: Array<any> = await Contacts.getAll()
      if (allContacts) {
        const filteredContacts = allContacts.filter(
          (el: any) =>
            (el.givenName || el.displayName) && el.phoneNumbers?.length > 0,
        );
        return filteredContacts;
        // const sortedList = filteredContacts.sort((a, b) => {
        //   const getName = (obj: any) => {
        //     return obj?.givenName ? obj.givenName : obj.displayName;
        //   };
        //   const getFirstChar = (name: string) => {
        //     return name.charAt(0);
        //   };
        //   return getFirstChar(getName(a)) > getFirstChar(getName(b));
        // });
        // const allFirebaseUsers = await getAllUsers(userId);
        // let filteredUsersList = allFirebaseUsers.filter(user => this.isMatchingContact(allContacts, user.phone))
        // return filteredUsersList;
      } else {
        return [];
      }
    } catch (e) {
      console.log('error reading contacts ', e);
      return [];
    }
  };

}
