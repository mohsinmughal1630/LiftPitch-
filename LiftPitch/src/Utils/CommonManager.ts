import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Platform} from 'react-native';
import {ScreenProps} from './AppConstants';
import {AppStrings} from './Strings';
import {ApiResponseHandler} from '../Network/ApiResponseHandler';
import KeyboardManager from 'react-native-keyboard-manager';
export default class CommonDataManager {
  static shared: CommonDataManager;
  _translations = [];
  _currentLanguage = 'en';
  _screenStack: ScreenProps = null;
  selector: any = null;
  dispatch: any = null;
  containerDispatcher;
  static getSharedInstance() {
    if (CommonDataManager.shared == null) {
      CommonDataManager.shared = new CommonDataManager();
      CommonDataManager.shared.setup();
    }
    return CommonDataManager.shared;
  }
  setContainerDispatcher = dispatch => {
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
  validateEmail = (email: string) => {
    let validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (validEmailRegex.test(email) == false) {
      return false;
    } else {
      return true;
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
        (users['email'] = allList[users.authId].email),
          (users['firstname'] = allList[users.authId].firstname),
          (users['lastname'] = allList[users.authId].lastname);
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
  logoutUser = async () => {
    return this._screenStack.navigation.reset({
      index: 0,
      routes: [{name: ScreenNames.Authentication.LoginScreen}],
    });
  };
  saveLang = async (index: number) => {
    let saveResult = await AsyncStorage.setItem('lang', JSON.stringify(index));
    return saveResult;
  };
  loadLang = async () => {
    let stringResult = await AsyncStorage.getItem('lang');
    if (stringResult) {
      return stringResult;
    } else {
      return null;
    }
  };
  disableIQ = () => {
    if (Platform.OS == 'ios') {
      KeyboardManager.setEnable(false);
    }
  };
  enableIQ = () => {
    if (Platform.OS == 'ios') {
      KeyboardManager.setEnable(true);
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
  isValidNumber = (inputtxt: string) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneno)) {
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
}
