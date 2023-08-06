import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncKeyStrings } from './Strings';


export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(AsyncKeyStrings.Auth.userdata);
    let data = jsonValue != null ? JSON.parse(jsonValue) : null;
    return data;
  } catch (e) {
    console.log('asyncstorage error');
    return false;
  }
};

export const saveUserData = async (data: any) => {
  try {
    await AsyncStorage.setItem(
      AsyncKeyStrings.Auth.userdata,
      JSON.stringify(data),
    );
  } catch (e) {
    console.log('Error storing userdata', e);
  }
};

export const getUserToken = async () => {
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

export const saveUserToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(AsyncKeyStrings.Auth.userToken, token);
  } catch (e) {
    console.log('Error storing usertoken', e);
  }
};

export const clearAppData = async (key:any) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed');
  } catch (exception) {
    console.log(exception);
  }
};