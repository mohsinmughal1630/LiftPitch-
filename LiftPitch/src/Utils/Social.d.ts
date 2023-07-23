import React from 'react';
import {Platform} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import CommonDataManager from './CommonManager';
import {AppStrings} from './Strings';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

const os = Platform.OS;
const osVersion = Platform.Version;

export const gmailLoginRequest = async (internetValue: any) => {
  try {
    if (!internetValue) {
      return {
        message: AppStrings.Network.internetError,
        data: null,
        success: false,
      };
    }
    await GoogleSignin.hasPlayServices();
    const logout = await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();
    return {
      message: AppStrings.Permissions.success,
      data: userInfo,
      success: true,
    };
  } catch (error: any) {
    console.log('Error Login => ', error);
    return {
      message:
        error.code === statusCodes.SIGN_IN_CANCELLED
          ? AppStrings.Permissions.cancelled
          : error?.message
          ? error?.message
          : JSON.stringify(error),
      data: null,
      success: false,
    };
  }
};

export const facebookLoginRequest = async (internetValue: any) => {
  let obj;
  try {
    if (!internetValue) {
      obj = {
        message: AppStrings.Network.internetError,
        data: null,
        success: false,
      };
    }
    await LoginManager.logOut();
    if (Platform.OS === 'android') {
      await LoginManager.setLoginBehavior('web_only');
    }
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      console.log('Login cancelled');
      obj = {
        message: AppStrings.Permissions.cancelled,
        data: null,
        success: false,
      };
    } else {
      await AccessToken.getCurrentAccessToken().then(async data => {
        if (data?.accessToken) {
          const fullFbResponse = await axios.get(
            'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' +
              data.accessToken,
          );
          if (fullFbResponse.status == 200) {
            obj = {
              message: AppStrings.Permissions.success,
              data: fullFbResponse.data,
              success: true,
            };
          } else {
            obj = {
              message: 'Error fetching data from facebook',
              data: null,
              success: false,
            };
          }
        } else {
          obj = {
            message: 'Access token for your account not found.',
            data: null,
            success: false,
          };
        }
      });
    }
  } catch (error) {
    console.log('Login fail with error: ' + error);
    obj = {
      message: error?.toString(),
      data: null,
      success: false,
    };
  }
  return obj;
};
