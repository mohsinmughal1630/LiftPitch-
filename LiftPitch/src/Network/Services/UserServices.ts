import axios from 'axios';
import CommonDataManager from '../../Utils/CommonManager';
import Api from '../Api';
import {ApiResponseHandler} from '../ApiResponseHandler';
import {
  CHANGE_PASSWORD_URL,
  CHECK_OTP_URL,
  FORGET_PASSWORD_URL,
  GET_REFRESH_TOKEN,
  GET_USER_URL,
  LOGIN_URL,
  LOGOUT_URL,
  RESET_PASSWORD_URL,
  SIGNUP_URL,
  SOCIAL_LOGIN_URL,
  TEAM_SIGNUP_EXISTING_USER,
  UPDATE_PROFILE_STATUS_URL,
  UPDATE_USER_URL,
} from '../Urls';

export const loginRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  let response: ApiResponseHandler<T>;
  const urlForApiCall = LOGIN_URL;
  const method = 'POST';
  const sendToken = false;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    params,
  );
  return apiRequest;
};

export const socialLoginRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  let response: ApiResponseHandler<T>;
  const urlForApiCall = SOCIAL_LOGIN_URL;
  const method = 'POST';
  const sendToken = false;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    params,
  );
  return apiRequest;
};

export const signupRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = SIGNUP_URL;
  const method = 'POST';
  const sendToken = false;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    params,
  );
  return apiRequest;
};

export const forgetPasswordRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = FORGET_PASSWORD_URL;
  const method = 'POST';
  const sendToken = false;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    params,
  );
  return apiRequest;
};

export const resetPasswordRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = RESET_PASSWORD_URL;
  const method = 'POST';
  const sendToken = false;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    params,
  );
  return apiRequest;
};

export const changePasswordRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = CHANGE_PASSWORD_URL;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    params,
  );
  return apiRequest;
};

export const logOutRequest = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = LOGOUT_URL;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const getUpdatedUserRequest = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = GET_USER_URL;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const updateUserRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = UPDATE_USER_URL;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    params,
  );
  return apiRequest;
};

export const checkOtpRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = CHECK_OTP_URL;
  const method = 'POST';
  const sendToken = false;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    params,
  );
  return apiRequest;
};

export const refreshTokenRequest = async (internetCheck: boolean) => {
  const urlForApiCall = GET_REFRESH_TOKEN;
  const userToken = await CommonDataManager.getSharedInstance().getUserToken();
  let headers = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const tokenRes = await axios.get(urlForApiCall, headers).catch(e => {
    console.log('e', e);
    return null;
  });
  // console.log('token response ', tokenRes);
  if (tokenRes?.data?.success) {
    await CommonDataManager.getSharedInstance().saveUserToken(
      tokenRes?.data?.data,
    );
    return true;
  } else {
    return false;
  }
};

export const updateProfileStatusRequest = async (internetCheck: boolean) => {
  const urlForApiCall = UPDATE_PROFILE_STATUS_URL;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const signupTeamExistingUserRequest = async (
  internetCheck: boolean,
  params: any,
) => {
  const urlForApiCall = TEAM_SIGNUP_EXISTING_USER;
  const method = 'POST';
  const sendToken = false;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    params,
  );
  return apiRequest;
};
