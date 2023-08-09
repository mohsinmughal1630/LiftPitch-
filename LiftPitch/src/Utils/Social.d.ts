import React from 'react';
import {Platform} from 'react-native';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
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

export const appleLoginRequest = async (internetValue: boolean) => {
  let obj;
  if (!internetValue) {
    obj = {
      message: AppStrings.Network.internetError,
      data: null,
      success: false,
    };
  }
  const appleAuthRequestResponse = await appleAuth
    .performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })
    .catch(e => {
      obj = {
        message: JSON.stringify(e),
        data: null,
        success: false,
      };
    });

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth
    .getCredentialStateForUser(appleAuthRequestResponse.user)
    .catch(e => {
      obj = {
        message: JSON.stringify(e),
        data: null,
        success: false,
      };
    });
  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
    obj = {
      message: AppStrings.Permissions.success,
      data: appleAuthRequestResponse,
      success: true,
    };
  }
  return obj;
};