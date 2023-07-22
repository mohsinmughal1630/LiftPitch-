import React from "react"
import { Platform } from "react-native"
import { appleAuth, appleAuthAndroid } from "@invertase/react-native-apple-authentication";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import axios from "axios";
import CommonDataManager from "./CommonManager";
import { AppStrings } from "./Strings";
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');

const os = Platform.OS
const osVersion = Platform.Version
export const fbLoginRequest = async (completionHanlder: (data: any) => void) => {
  console.log("Facebook login request")
  FBLoginManager.loginWithPermissions(["email", "public_profile"], function(error, data){
    if (!error) {
      completionHanlder(data)
    } else {
      console.log("Login error" + JSON.stringify(error));
     }
  })
}
export const getFbUserFullData = async(token : string,completionHanlder: (data: any) => void) => {
  console.log("new data call")
  let fullData = await axios.get('https://graph.facebook.com/v2.5/me?fields=name,email,first_name,last_name,picture,friends&access_token=' + token)
   completionHanlder(fullData)
}
export const getFbUserImage = async(userId : string,completionHanlder: (data: any) => void)=>{
  console.log(userId)
  let profilePic = await axios.get(`http://graph.facebook.com/${userId}/picture?type=large`)
  completionHanlder(profilePic.data)
}
export const appleLoginRequest = async (complete: (data: any) => void) => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
    complete(appleAuthRequestResponse)
  }
}
export const gmailLoginRequest = async (complete: (data: any) => void) => {
  try {
    await GoogleSignin.hasPlayServices();
    const logout = await GoogleSignin.signOut()
    const userInfo = await GoogleSignin.signIn();
    complete(userInfo)
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
      CommonDataManager.getSharedInstance().showPopUp(AppStrings.errorTitle,"There is something went wrong please try again")
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      CommonDataManager.getSharedInstance().showPopUp(AppStrings.errorTitle,"There is something went wrong please try again")
    } else {
      CommonDataManager.getSharedInstance().showPopUp(AppStrings.errorTitle,"There is something went wrong please try again")
    }
  }
};

