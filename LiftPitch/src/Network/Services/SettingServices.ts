import Api from '../Api';
import {ApiResponseHandler} from '../ApiResponseHandler';
import {
  APP_SETTINGS_URL,
  CONTACT_US_URL,
  FQA_LISTING_URL,
  NOTIFICATION_SETTINGS_URL,
  SETTING_PAGES_URL,
  TUTORIALS_URL,
} from '../Urls';

export const faqListRequest = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = FQA_LISTING_URL;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const settingPagesRequest = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = SETTING_PAGES_URL;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const getTutorialsListRequest = async (internetCheck: boolean) => {
  const urlForApiCall = TUTORIALS_URL;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const createContactUsRequest = async (
  internetCheck: boolean,
  params: any,
) => {
  const urlForApiCall = CONTACT_US_URL;
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

export const getSettingsContactInfoRequest = async (internetCheck: boolean) => {
  const urlForApiCall = APP_SETTINGS_URL;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const getNotificationSettingsRequest = async (
  internetCheck: boolean,
) => {
  const urlForApiCall = NOTIFICATION_SETTINGS_URL;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const updateNotificationSettingsRequest = async (
  internetCheck: boolean,
  params: any,
) => {
  const urlForApiCall = NOTIFICATION_SETTINGS_URL;
  const method = 'PUT';
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
