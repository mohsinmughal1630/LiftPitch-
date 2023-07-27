import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  Dimensions,
  Linking,
  Platform,
  StatusBar,
  Share,
} from 'react-native';
import {
  AppImages,
  normalized,
  ScreenProps,
} from './AppConstants';
import {
  AppStrings,
  AsyncKeyStrings,
  ReceivedLinkType,
  TeamMemberJoiningStatus,
  TeamNodeUrlTypes,
} from './Strings';
import {
  setAlertObj,
  setCardClickedFromHome,
  setFetchUpdatedUser,
  setIsComingFromTeam,
  setIsTagScanning,
  setLoader,
  setMoveToParams,
  setMoveToScreen,
  setNotificationObj,
  setPackagePlan,
  setScannedTeamDetails,
  setSecretId,
  setShowToast,
  setTab,
  setTeamId,
  setUserData,
  setUserFunctionAvailability,
  toggleDrawer,
} from '../Redux/reducers/AppReducer';
import {
  getUpdatedUserRequest,
  logOutRequest,
} from '../Network/Services/UserServices';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import {
  registerDeviceForNotificationsRequest,
  saveNfcIdRequest,
  checkNfcIdRequest,
  getTeamNodeDetailsRequest,
  getSharedCardDataRequest,
} from '../Network/Services/GeneralServices';
import {notifications} from 'react-native-firebase-push-notifications';
import DeviceInfo from 'react-native-device-info';
import {ActiveFunctionTypeStrings, SocialTypeStrings, qrFunctionTypes} from './AppEnums';
import {
  appleLoginRequest,
  facebookLoginRequest,
  gmailLoginRequest,
} from './Social.d';
import {AppStyles} from './AppStyles';
import {NFC_PREVIEW_BASE_URL} from '../Network/Urls';
import {parsePhoneNumber} from 'libphonenumber-js';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {Routes} from './Routes';
import {useNavigation} from '@react-navigation/native';
import { getAllPackagesListRequest } from '../Network/Services/PurchaseServices';
import * as RootNavigation from '../Navigation/RootNavigation';
import moment from 'moment';

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

  setupPackageDetails = async () => {
    try {
      // const packageData: JSON = require('./packageDetails.json');
      const res = await getAllPackagesListRequest();
      // console.log('res => ', res.data);
      this._packageDetails = res.data || []
    } catch (e) {}
  };

  getPackageInfo = (packageId: string, featureName: string) => {
    console.log(`packages length ${this._packageDetails.length}`)
    const packageInfo = this._packageDetails.find(
      (item: any) => item.id === packageId
    );
    if (packageInfo && packageInfo[featureName]) {
      return packageInfo[featureName];
    } else {
      return false;
    }
  };
  
  // featureName can be taken from askedFeatureList in AppEnums
  // featureType can be taken from availableFunctionsList in AppEnums
  
  isFeatureEnabled = (packagePlan: any, userFunctionAvailability: any, featureName: string, featureType: string | undefined = undefined) => { // featureType will be null in case of asking for enabling functionalities
    if (!this._packageDetails || !featureName) {
      return false;
    }
    // console.log("packagePlan: ", packagePlan);
    // console.log("featureType: ", featureType);
    // console.log("userFunctionAvailability: ", userFunctionAvailability);
    // console.log('user data => ', this.selector.AppReducer.userData);
    const packageId = packagePlan.id;
    const limit = this.getPackageInfo(packageId, featureName);
    if (featureType) {
      return limit == 'unlimited' ? true : limit > userFunctionAvailability[featureType]
    } else {
      return limit
    }
  };

  // getTranslation = (language: any, screen: any, labelString: string) => {
  //   var lbl = '';
  //   var languageDic = this._translations[language];
  //   var mainScreen = languageDic[screen];
  //   if (mainScreen !== undefined) {
  //     var translatedLabel = mainScreen[labelString];
  //     if (translatedLabel !== undefined) {
  //       lbl = translatedLabel;
  //     }
  //   }
  //   return lbl;
  // };
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

  logoutUserRequest = async (isNetConnected: boolean) => {
    try {
      this.dispatch(setLoader(true));
      let response = await logOutRequest(isNetConnected);
      if (response.success) {
        console.log('Logging out');
        await this.logoutUser();
      } else {
        this.dispatch(
          setAlertObj({
            title: AppStrings.Network.errorTitle,
            message: response?.message,
          }),
        );
      }
    } catch (e) {
      console.log('Error logging out');
    } finally {
      this.dispatch(setLoader(false));
    }
  };

  logoutUser = async () => {
    await AsyncStorage.removeItem(AsyncKeyStrings.Auth.userToken);
    await AsyncStorage.removeItem(AsyncKeyStrings.Auth.userdata);
    this.dispatch(setUserData(null));
    this.dispatch(setSecretId(null));
    this.dispatch(setTeamId(null));
    this.dispatch(toggleDrawer(false));
    this.dispatch(setTab(0));
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

  parseFlagCode = (code: string, number: string) => {
    if (!code || !number) {
      return null;
    }
    try {
      const fullNumber = parsePhoneNumber(
        `${this.addPlusToNumber(code)}${this.removePlusFromNumber(number)}`,
      );
      return fullNumber?.country?.toLowerCase();
    } catch (e) {
      console.log('Parsing Err ', e);
      return null;
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

  getTeamSecretData = async () => {
    try {
      let teamData: any = await AsyncStorage.getItem(
        AsyncKeyStrings.Teams.secretData,
      );
      if (teamData) {
        teamData = JSON.parse(teamData);
        this.dispatch(setTeamId(teamData.teamId));
        this.dispatch(setSecretId(teamData.secretId));
      }
    } catch (e) {
      console.log('Error ', e);
      return null;
    }
  };
  setTeamSecretData = async (
    secretId: string | null,
    teamId: string | null,
  ) => {
    try {
      let obj = {
        secretId: secretId,
        teamId: teamId,
      };
      await AsyncStorage.setItem(
        AsyncKeyStrings.Teams.secretData,
        JSON.stringify(obj),
      );
    } catch (e) {
      console.log('Error storing userdata', e);
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

  getUpdatedUser = async (internetCheck: boolean, teamId: string | null) => {
    const res: any = await getUpdatedUserRequest(internetCheck).finally(() =>
      this.dispatch(setFetchUpdatedUser(null)),
    );
    console.log("res (getUpdatedUser): ", res);
    if (res.success) {
      await this.saveUserData(res.data);
      this.dispatch(setUserData(res.data));
      
      this.setPackageLocally(
        res.data, 
        teamId,
      );
    } else {
      console.log('Error fetching user ', res?.message);
    }
  };

  onShareIntent = async (str: string) => {
    str = this.validateUrl(str);
    let obj: any =
      Platform.OS == 'android'
        ? {
            message: str,
          }
        : {
            url: str,
          };
    try {
      const result = await Share.share(obj);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('result.activityType ', result.activityType);
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Card share dismissed');
      }
    } catch (error: any) {
      this.dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: error?.message
            ? error?.message
            : AppStrings.Network.somethingWrong,
        }),
      );
    }
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

  // getDynamicHeight = () => {
  //   const {height} = Dimensions.get('window');
  //   const 
  //   const mainHeight =
  //     height -
  //     this.selector.AppReducer.safeArea.top -
  //     this.selector.AppReducer.safeArea.bottom -
  //     (Platform.Version < 30 ? StatusBar?.currentHeight : 0);
  //   return mainHeight;
  // };

  getCardWindowHeight = () => {
    let statusHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 0;
    let diff =
      Dimensions.get('screen').height - Dimensions.get('window').height;
    const isPoco = Platform?.constants?.Brand?.toLowerCase() == 'poco';
    if (diff <= 50 && !isPoco) {
      return Dimensions.get('window').height - (diff - statusHeight - 3);
    }
    return Dimensions.get('window').height;
  };

  getListerFooterStyles = () => {
    const notchOrAndroid =
      this.selector.AppReducer.isNotchDevice || Platform.OS == 'android';
    const functionBtnSize = normalized(notchOrAndroid ? 80 : 70);
    return {
      ...AppStyles.listFooterBtn,
      marginBottom: functionBtnSize / 2 + 15,
    };
  };

  // NFC Methods
  isNfcSupported = async () => {
    const deviceIsSupported = await NfcManager.isSupported();
    return deviceIsSupported;
  };
  isNfcEnabled = async () => {
    const isNfcEnabled = await NfcManager.isEnabled();
    return isNfcEnabled;
  };

  // Cleanup
  cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() =>
      console.log('err on cancel'),
    );
  };

  // Save ID for NFC First
  saveNfcFirst = async (id: string, teamId: string | null) => {
    const body = {
      nfc_uuid: id,
    };
    this.dispatch(setLoader(true));
    const res = await saveNfcIdRequest(
      this.selector.AppReducer.isNetConnected,
      body,
      teamId,
    ).finally(() => {
      this.dispatch(setLoader(false));
      this.dispatch(setFetchUpdatedUser(new Date().toISOString()));
    });
    if (res.success) {
      return true;
    } else {
      this.dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message:
            res.message == AppStrings.NFC.nfcAlreadyRegistered
              ? 'There is already an account associate with this tag. Please try different one!'
              : res.message,
        }),
      );
      return false;
    }
  };

  // Check if NFC ID is valid or not
  checkNfcFirst = async (id: string, teamId: string | null) => {
    this.dispatch(setLoader(true));
    const res = await checkNfcIdRequest(
      this.selector.AppReducer.isNetConnected,
      id,
      teamId,
    ).finally(() => {
      this.dispatch(setLoader(false));
    });
    if (res.success) {
      return true;
    } else {
      this.dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message:
            res.message == AppStrings.NFC.nfcAlreadyRegistered
              ? 'There is already an account associate with this tag. Please try different one!'
              : res.message,
        }),
      );
      return false;
    }
  };

  // add baseUrl to UUID before saving to NFC
  makeUrlFromUid = (userUid: string | null) => {
    return NFC_PREVIEW_BASE_URL + userUid;
  };

  // getting user UUID from url of nfc
  parseUidFromUrl = (url: string) => {
    if (url?.includes(NFC_PREVIEW_BASE_URL)) {
      return url.split('/')[url.split('/').length - 1];
    } else {
      return url;
    }
  };

  // Write NFC
  writeNfcData = async (text: string | null, teamId: string | null) => {
    if (text == null) {
      console.log('User data UUID is undefined');
    }
    if (text?.trim() == '') {
      this.dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: 'Value cannot be empty',
        }),
      );
      return;
    }
    this.dispatch(setIsTagScanning(true));
    await NfcManager.start();
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag: any = await NfcManager.getTag();
      const checkIdRes = await this.checkNfcFirst(tag.id, teamId);
      if (!checkIdRes) {
        this.cleanUp();
        return null;
      }
      text = this.makeUrlFromUid(text);
      // Conversion from String to URI For IOS Only
      let bytes = Ndef.encodeMessage([Ndef.uriRecord(text)]);
      if (bytes) {
        const res = await NfcManager.ndefHandler.writeNdefMessage(bytes);
      } else {
        console.log('No bytes');
      }
      const saveIdRes: any = await this.saveNfcFirst(tag.id, teamId);
      if (saveIdRes) {
        return true;
      }
    } catch (e) {
      console.log('Error writing ', e);
      if (e?.toString().includes('transceive fail')) {
        return AppStrings.NFC.writeFail;
      } else {
        return null;
      }
    } finally {
      this.cleanUp();
      setTimeout(() => {
        this.dispatch(setIsTagScanning(false));
      }, 500);
    }
  };

  // read NFC Data
  readNfcData = async () => {
    try {
      await NfcManager.start();
      await NfcManager.requestTechnology(NfcTech.Ndef);
      let text = '';
      // Decoding for IOS goes here
      let tag: any = null;
      tag = await NfcManager.getTag();
      tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();
      const firstNdef = tag.ndefMessage[0];
      const uri = Ndef.uri.decodePayload(firstNdef.payload);
      text = uri;
      return this.parseUidFromUrl(text);
    } catch (er) {
      console.log('err reading ', JSON.stringify(er));
      return null;
    } finally {
      this.cleanUp();
    }
  };

  getFirebaseToken = async () => {
    try {
      let token = await notifications.getToken();
      return token;
    } catch (e) {
      console.log('Error while getting firebase token', e);
      return null;
    }
  };

  setNotification = (obj: any) => {
    if (obj.data?.title == 'silent_user_action') {
      // console.log('Platform ', Platform.OS, 'obj.data?.body ', obj.data?.body?.user_id)
      const parsedBody = JSON.parse(obj.data?.body);
      // console.log('this is parsed body - obj.data?.body ', parsedBody?.user_id);
      this.dispatch(setUserFunctionAvailability(parsedBody));
      return;
    }
    if (obj?.data?.body && obj?.data?.title) {
      this.dispatch(
        setNotificationObj({
          title: obj?.data?.title,
          message: obj?.data?.body,
        }),
      );
    }
  };

  registerDeviceForNotifications = async (userId: any) => {
    try {
      const firebaseToken = await this.getFirebaseToken();
      if (!firebaseToken) {
        console.log('Firebase token not found');
        return;
      }
      const deviceId = await DeviceInfo.getUniqueId();
      let body = {
        device_uuid: deviceId,
        device_push_token: firebaseToken,
        device_type: Platform.OS,
        user_id: userId,
        os_version: Platform.Version,
      };
      const res = await registerDeviceForNotificationsRequest(
        this.selector.AppReducer.isNetConnected,
        body,
      );
      if (res.success) {
        console.log('Device registered successfully');
      } else {
        console.log('Err =>', res.message);
      }
    } catch (e) {
      console.log('Err device register', e);
    }
  };

  createContactInfoArray = (resObj: any) => {
    let generalInfo: any = [];
    if (resObj?.address) {
      generalInfo.push({
        id: 1,
        pic: AppImages.Settings.location,
        txt: CommonDataManager.getSharedInstance().capitalizeFirstLetter(
          resObj.address,
        ),
        locObj: {
          lat: resObj?.lat,
          lng: resObj?.lng,
        },
      });
    }
    if (resObj?.phone_number && resObj?.country_phone) {
      generalInfo.push({
        id: 2,
        pic: AppImages.Settings.phone,
        txt: `${CommonDataManager.getSharedInstance().addPlusToNumber(
          resObj.country_phone,
        )} ${CommonDataManager.getSharedInstance().removePlusFromNumber(
          resObj.phone_number,
        )}`,
      });
    }
    if (resObj?.email) {
      generalInfo.push({
        id: 3,
        pic: AppImages.Settings.email,
        txt: resObj.email,
      });
    }
    return generalInfo;
  };

  createSocialInfoSocialArray = (obj: any) => {
    let socialList: any = [];
    if (obj?.facebook_url) {
      socialList.push({
        id: 1,
        image: AppImages.ContactUs.facebookIcon,
        url: obj?.facebook_url,
      });
    }
    if (obj?.twitter_url) {
      socialList.push({
        id: 2,
        image: AppImages.ContactUs.twitterIcon,
        url: obj?.twitter_url,
      });
    }
    if (obj?.linkdin_url) {
      socialList.push({
        id: 3,
        image: AppImages.ContactUs.linkedInIcon,
        url: obj?.linkdin_url,
      });
    }
    if (obj?.instagram_url) {
      socialList.push({
        id: 4,
        image: AppImages.ContactUs.instagramIcon,
        url: obj?.instagram_url,
      });
    }
    if (obj?.tiktok_url) {
      socialList.push({
        id: 4,
        image: AppImages.ContactUs.tiktokIcon,
        url: obj?.tiktok_url,
      });
    }
    return socialList;
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
          setAlertObj({
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
          setAlertObj({
            title: AppStrings.Network.errorTitle,
            message: response?.message,
          }),
        );
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
          first_name: CommonDataManager.getSharedInstance().truncateString(
            response.data?.fullName?.givenName,
          ),
          last_name: CommonDataManager.getSharedInstance().truncateString(
            response.data?.fullName?.familyName,
          ),
          email: response.data?.email ? response.data?.email : '',
        };
      } else {
        this.dispatch(
          setAlertObj({
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

  isCardValid = (errorCard: any, index: number) => {
    if (index == 0) {
      return !errorCard.cardType;
    }
    let flag = true;
    Object.keys(errorCard)?.map(item => {
      if (errorCard[item] == true) {
        flag = false;
      }
    });
    return flag;
  };

  getUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  isScannedCardTypeValid = (cardType: string) => {
    return cardType == qrFunctionTypes.card || 
    cardType == qrFunctionTypes.contact || 
    cardType == qrFunctionTypes.cashApp || 
    cardType == qrFunctionTypes.venmo || 
    cardType == qrFunctionTypes.customPayment || 
    cardType == qrFunctionTypes.customUrl || 
    cardType == qrFunctionTypes.emergencyContact || 
    cardType == qrFunctionTypes.fileUpload
  }

  // checkContactPermission = async () => {
  //   if (Platform.OS == 'android') {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //     );
  //     console.log('granted ', granted);
  //     if (granted == 'granted') {
  //       return true;
  //     } else if (granted === 'never_ask_again') {
  //       return false;
  //     } else {
  //       console.log('Some error ');
  //     }
  //   } else {
  //     // IOS
  //     Contacts.checkPermission().then(permission => {
  //       if (permission === 'undefined') {
  //         Contacts.requestPermission().then(permission => {
  //           console.log('This is inner contacts permission => ', permission);
  //           if (permission == 'authorized') {
  //             return true;
  //           }
  //         });
  //       }
  //       if (permission === 'authorized') {
  //         return true;
  //       }
  //       if (permission === 'denied') {
  //         return false;
  //       }
  //     });
  //   }
  // };

  // saveContactLocally = async () => {
  //   if (!this.checkContactPermission) {
  //     console.log('Permission for contacts not given');
  //     return;
  //   }
  //   var newPerson = {
  //     emailAddresses: [
  //       {
  //         label: 'work',
  //         email: 'mrniet@example.com',
  //       },
  //     ],
  //     displayName: 'Friedrich Nietzsche',
  //   };

  //   Contacts.openContactForm(newPerson)
  //     .then(contact => {
  //       console.log('Contact should be saved');
  //     })
  //     .catch(e => console.log('Error opening form ', e));
  // };

  handleVcfContact = async (url: string) => {
    try {
      const tempDirPath = `${RNFS.TemporaryDirectoryPath}/vcf`;
      await RNFS.mkdir(tempDirPath);
      const filename = url.substring(url.lastIndexOf('/') + 1);
      const fileOptions = {
        fromUrl: url,
        toFile: `${tempDirPath}/${filename}`,
      };
      const downloadResult = await RNFS.downloadFile(fileOptions).promise;
      if (downloadResult.statusCode === 200) {
        const localFilePath = `${tempDirPath}/${filename}`;
        await FileViewer.open(`file://${localFilePath}`, {
          showOpenWithDialog: true,
        }).catch(error => {
          console.log('Err ', error);
        });
      } else {
        console.log('Failed to download the VCF file.');
      }
    } catch (error) {
      console.log('Error while saving VCF file:', error);
    }
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

  redirectToLocation = async (
    city = '',
    state = '',
    country = '',
    addressLabel = '',
  ) => {
    if (!city && !country && !state) {
      console.log('Location not defined');
      return;
    }
    let addressStr = '';
    if (city) {
      addressStr = addressStr + city.trim();
    }
    if (state) {
      addressStr = addressStr + `,+${state.trim()}`;
    }
    if (country) {
      addressStr = addressStr + `,+${country.trim()}`;
    }
    await Linking.openURL(
      `https://www.google.com/maps/place/${addressStr}`,
    ).catch(e => console.log('Error opening Link ', e));
  };

  manageSecretId = async (
    userObj: any,
    teamId: string | null = null,
    roleToSet: 'user' | 'member' = 'user',
  ) => {
    if (!userObj) {
      console.log('Unfortunately, userdata is undefined.');
      return;
    }
    const isSingleItemWithTeamIdOnly: boolean =
      userObj?.secret_code?.length == 1 &&
      userObj?.secret_code?.findIndex((item: any) => item?.team_id) !== -1;
    // console.log('isSingleItemWithTeamIdOnly ==> ', isSingleItemWithTeamIdOnly);
    if (roleToSet == 'user' && !isSingleItemWithTeamIdOnly) {
      const foundSecretObj = userObj?.secret_code?.find(
        (item: any) => !item?.team_id,
      );
      // console.log('foundSecretObj user ===> ', foundSecretObj);
      if (foundSecretObj) {
        await this.setTeamSecretData(foundSecretObj?.secret_code, null);
        this.dispatch(setSecretId(foundSecretObj?.secret_code));
        this.dispatch(setTeamId(null));
      }
    } else {
      const foundSecretObj = userObj?.secret_code?.find(
        (item: any) => item?.team_id,
      );
      // console.log(' userObj?.secret_code ==== ', userObj?.secret_code);
      // console.log('foundSecretObj memer ===> ', foundSecretObj);
      if (foundSecretObj) {
        await this.setTeamSecretData(
          foundSecretObj?.secret_code,
          foundSecretObj?.team_id,
        );
        this.dispatch(setSecretId(foundSecretObj?.secret_code));
        this.dispatch(setTeamId(foundSecretObj?.team_id));
      }
    }
    // calling package plan setter
    this.setPackageLocally(userObj, teamId);
  };

  showTeamToggle = (userObj: any) => {
    if (!userObj) {
      return false;
    }
    if (
      userObj?.secret_code &&
      userObj.secret_code?.length > 1 &&
      userObj?.secret_code?.findIndex((item: any) => item.team_id) !== -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  manageUrlWithTeamId = (url: string, teamId: any) => {
    if (!teamId) {
      return url;
    } else {
      return url + `?team_id=${teamId}`;
    }
  };

  manageBodyWithTeamId = (body: any, teamId: any) => {
    if (!teamId) {
      return body;
    } else {
      return {
        ...body,
        team_id: teamId,
      };
    }
  };

  compareSingleFunction = (activeFunction: string, currentFunction: string) => {
    return currentFunction == ActiveFunctionTypeStrings.payment
      ? activeFunction == ActiveFunctionTypeStrings.venmo ||
          activeFunction == ActiveFunctionTypeStrings.cash_app ||
          activeFunction == ActiveFunctionTypeStrings.custom_payment
      : activeFunction == currentFunction;
  };

  // Check if the function is ON or OFF
  getSingleFunctionStatus = (
    userObj: any,
    teamId: any,
    functionName: string,
  ) => {
    const activeFunctionList: Array<any> = userObj?.user_active_function;
    if (activeFunctionList?.length == 0) {
      return false;
    }
    if (!teamId) {
      const userFunction = activeFunctionList.find(
        (item: any) => !item.team_id,
      );
      return this.compareSingleFunction(userFunction?.name, functionName);
    } else {
      const teamFunction = activeFunctionList.find(
        (item: any) => item.team_id == teamId,
      );
      return this.compareSingleFunction(teamFunction?.name, functionName);
    }
  };

  // Check if any nfc is active
  userHasActiveNfc = (userObj: any, teamId: any) => {
    const activeNfcList: Array<any> = userObj?.user_active_nfc;
    if (activeNfcList?.length == 0) {
      return false;
    }
    if (!teamId) {
      const userActiveNfc = activeNfcList.find((item: any) => !item.team_id);
      return userActiveNfc?.total_nfc > 0;
    } else {
      const teamActiveNfc = activeNfcList.find(
        (item: any) => item.team_id == teamId,
      );
      return teamActiveNfc?.total_nfc > 0;
    }
  };

  getTeamDetails = (userObj: any, teamId: string | null) => {
    if (!teamId) {
      return null;
    } else {
      const connectedTeams: Array<any> = userObj?.connected_teams;
      return connectedTeams.find((item: any) => item.id == teamId);
    }
  };

  getLinkUrlType = (url: string) => {
    return url?.toLowerCase()?.includes('/nfc/')
      ? ReceivedLinkType.nfc
      : url?.toLowerCase()?.includes('/signup?uuid')
      ? ReceivedLinkType.newMember
      : url?.toLowerCase()?.includes('/alreadymember?uuid')
      ? ReceivedLinkType.alreadyMember
      : null;
  };

  extractParamsFromUrl = (url: string) => {
    let urlParams: any = url.split('?')[1];
    urlParams = urlParams.split('&');
    let paramsObj: any = {};
    urlParams.forEach((str: any) => {
      const strArr = str.split('=');
      paramsObj[`${strArr[0]}`] = strArr[1];
    });
    return paramsObj;
  };

  shouldMemberJoinTeam = (userObj: any, teamId: null | string) => {
    const teamMembers: Array<any> = userObj?.team_members;
    // const foundTeam = teamMembers.find((el: any) => el.team_id == teamId);
    const foundTeam = teamMembers.find((el: any) => el.team_id);
    return (
      foundTeam?.check_status?.toLowerCase() == TeamMemberJoiningStatus.active
    );
  };

  getNameInitials = (str: string) => {
    if (!str) {
      return '-';
    }
    const arr = str.split(' ');
    if (arr.length == 0) {
      return '-';
    } else {
      let str2 = '';
      arr.slice(0, 2).map(el => {
        str2 = str2 + el.charAt(0).toUpperCase();
      });
      return str2.trim();
    }
  };

  getScannedTeamResult = async (
    isNetConnected: boolean,
    type: string,
    id: string,
    isUserNotLoggedIn = true,
    navigation = null,
  ) => {
    this.dispatch(setLoader(true));
    const response = await getTeamNodeDetailsRequest(
      isNetConnected,
      type,
      id,
    ).finally(() => this.dispatch(setLoader(false)));
    if (response.success) {
      this.dispatch(
        setScannedTeamDetails({
          team: {
            id: response.data.team?.id,
            name: response.data.team?.name,
            status: response.data.team?.status,
          },
          team_members: response.data.team_members.map((item: any) => {
            const {
              team_member: {user},
            } = item;
            return {
              ...user,
              hierarchy_tree_id: item.hierarchy_tree_id,
            };
          }),
        }),
      );
      this.dispatch(
        setMoveToScreen(
          isUserNotLoggedIn ? Routes.Teams.teamNodes : Routes.Auth.login,
        ),
      );
      this.dispatch(
        setMoveToParams({
          nodeDetails: response.data?.node,
        }),
      );
      this.dispatch(setIsComingFromTeam(true));
      this.dispatch(setTab(2));
      if (this.selector.AppReducer.currentTab == 2) {
        const nav = useNavigation();
        this.resetToScreen(nav, Routes.DrawerStack.main);
      }
      return true;
    } else {
      this.dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: response?.message,
        }),
      );
      return false;
    }
  };

  extractCardType = (url: string, type: 'cardType' | 'cardId') => {
    let urlArr = url?.split('/');
    let n = type == 'cardType' ? 2 : 1; // decide either to get last index item or 2nd last
    if (urlArr[urlArr.length - n]) {
      return urlArr[urlArr.length - n];
    } else {
      return '';
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

  setPackageLocally = (userObj: any, teamId: any) => {
    // console.log('setPackageLocally running: ', userObj)
    // console.log('active info: ', userObj?.user_action_info)
    let foundPackage: any;
    let activeActionsInfo: any;
    if (teamId) {      
      foundPackage = userObj?.package_details?.find((item: any) => item.team_id)
      activeActionsInfo = userObj?.user_action_info?.find((item: any) => item.team_id)
    } else {      
      foundPackage = userObj?.package_details?.find((item: any) => !item.team_id)
      activeActionsInfo = userObj?.user_action_info?.find((item: any) => !item.team_id)
    }
    // console.log("foundPackage: ", foundPackage);
    // console.log("this._packageDetails: ", this._packageDetails);
    if (foundPackage && this._packageDetails) {
      this.dispatch(setPackagePlan({
        ...foundPackage,
        name: this._packageDetails.find((el: any) => el.id == foundPackage.package_id)?.package_name,
        id: foundPackage.package_id
      }));
    }
    // console.log("activeActionsInfo: ", activeActionsInfo);
    if (activeActionsInfo) {
      this.dispatch(setUserFunctionAvailability(activeActionsInfo));
    }
  }

  updateUserAvailableFunctions = (availableUserFunctions: any, functionType: 'total_cards' | 'total_payments' | 'total_emergency_contacts' | 'total_custom_urls' | 'total_file_uploads' | 'total_connections', actionType: 'add' | 'delete') => {
    let updatedCount = availableUserFunctions[`${functionType}`];
    if (actionType == 'add') {
      updatedCount = updatedCount + 1;
    } else {
      updatedCount = updatedCount == 0 ? 0 : updatedCount - 1;
    }
    this.dispatch(setUserFunctionAvailability({
      ...availableUserFunctions,
      [`${functionType}`]: updatedCount
    }))
  }

  openLinkInBrowser = (url: string) => {
    setTimeout(async () => {
      await Linking.openURL(
        this.validateUrl(url),
      )
        .catch(e => console.log('err ', e))
        .finally(() => this.dispatch(setTab(2)));
    }, 1500);
  };

  handleScannedCardRequest = async (isNetConnected: boolean, url: string, currentTab: number| null = null) => {
    let cardType = this.extractCardType(
      url,
      'cardType',
    );
    let cardId = this.extractCardType(
      url,
      'cardId',
    );
    if (
      cardType == TeamNodeUrlTypes.node ||
      cardType == TeamNodeUrlTypes.team
    ) {
      const res = await this.getScannedTeamResult(isNetConnected, cardType, cardId)
        .catch(e => {
          console.log('Err - getScannedTeamResult - ', e);
          return false;
        });
      if (!res) {
        setTimeout(() => {
          this.dispatch(setTab(2));
        }, 500);
      }
      return;
    }
    if (
      this.isScannedCardTypeValid(cardType)
    ) {
      this.dispatch(setLoader(true));
      const res = await getSharedCardDataRequest(
        isNetConnected,
        cardType,
        cardId,
      ).finally(() => this.dispatch(setLoader(false)));
      if (res.success) {
        let screenName;
        let obj: any;
        if (
          res.data?.function_type == ActiveFunctionTypeStrings.card ||
          res.data?.contactCard
        ) {
          obj = {
            cardObj: res.data,
            fromRead: true,
          };
          if (res.data?.contactCard) {
            // Checking if its a contact or a card
            obj['cardObj'] = res.data.contactCard;
            obj['contactId'] = res.data.id;
            obj['contactUid'] = res.data.uuid;
            obj['fromContact'] = true;
          }
          screenName = Routes.Function.cardPreviewScreen;
          setTimeout(() => {
            this.dispatch(setTab(2));
          }, 500);
        } else if (
          res.data?.function_type == ActiveFunctionTypeStrings.emergency_contact
        ) {
          obj = {
            emergencyContact: res.data,
            fromRead: true,
          };
          screenName = Routes.Function.newEmergContactScreen;
          setTimeout(() => {
            this.dispatch(setTab(2));
          }, 500);
        } else {
          this.openLinkInBrowser(res.data?.url_path);
        }
        if (obj && screenName) {
          this.dispatch(setMoveToParams(obj));
          this.dispatch(setMoveToScreen(screenName));
          this.dispatch(setCardClickedFromHome(true));
          if (currentTab == 2) {
            RootNavigation.reset(Routes.DrawerStack.main)
          }
        } else {
          console.log('card is of some other type');
        }
      } else {
        this.dispatch(
          setAlertObj({
            title: AppStrings.Network.errorTitle,
            message: res?.message,
          }),
        );
      }
    } else if (this.isValidUrl(url)) {
      this.openLinkInBrowser(url);
    } else {
      this.dispatch(setShowToast('URL is not valid'));
      this.dispatch(setTab(2));
    }
  } 
}
