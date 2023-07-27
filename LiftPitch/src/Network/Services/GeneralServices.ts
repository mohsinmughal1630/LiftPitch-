import CommonDataManager from '../../Utils/CommonManager';
import Api from '../Api';
import {ApiResponseHandler} from '../ApiResponseHandler';
import {
  CHANGE_CARD_STATUS_URL,
  CHANGE_FUNCTION_STATUS_URL,
  GET_ALL_CARDS_URL,
  GET_CARD_BIND_DATA,
  GET_CARD_VCF_URL,
  GET_NOTIFICATIONS_LIST_URL,
  GET_SHARED_CARD_DATA_URL,
  GET_TEAM_MEMBER_FUNCTIONS_URL,
  GET_TEAM_NODE_DETAILS_URL,
  IMAGE_UPLOAD_URL,
  REGISTED_DEVICE_URL,
  SAVE_CARD_BIND_DATA,
  SAVE_NFC_ID,
  UNLINK_NFC_URL,
} from '../Urls';

export const uploadImageRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  let response: ApiResponseHandler<T>;
  const urlForApiCall = IMAGE_UPLOAD_URL;
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

export const getAllCardsRequest = async (
  internetCheck: boolean,
  teamId: any,
) => {
  const urlForApiCall =
    CommonDataManager.getSharedInstance().manageUrlWithTeamId(
      GET_ALL_CARDS_URL,
      teamId,
    );
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const changeCardStatusRequest = async (
  internetCheck: boolean,
  params: any,
  teamId: any,
) => {
  const urlForApiCall = CHANGE_CARD_STATUS_URL;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    CommonDataManager.getSharedInstance().manageBodyWithTeamId(params, teamId),
  );
  return apiRequest;
};

export const changeFunctionStatusRequest = async (
  internetCheck: boolean,
  params: any,
  teamId: any,
) => {
  const urlForApiCall = CHANGE_FUNCTION_STATUS_URL;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    CommonDataManager.getSharedInstance().manageBodyWithTeamId(params, teamId),
  );
  return apiRequest;
};

export const getCardBindDataRequest = async (
  internetCheck: boolean,
  cardId: string,
) => {
  const urlForApiCall = GET_CARD_BIND_DATA + `/${cardId}`;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const saveCardBindDataRequest = async (
  internetCheck: boolean,
  params: any,
  teamId: any,
) => {
  const urlForApiCall = SAVE_CARD_BIND_DATA;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    CommonDataManager.getSharedInstance().manageBodyWithTeamId(params, teamId),
  );
  return apiRequest;
};

export const saveNfcIdRequest = async (
  internetCheck: boolean,
  params: any,
  teamId: string | null,
) => {
  const urlForApiCall = SAVE_NFC_ID;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    CommonDataManager.getSharedInstance().manageBodyWithTeamId(params, teamId),
  );
  return apiRequest;
};

export const deleteNfcIdRequest = async (
  internetCheck: boolean,
  nfc_id: string,
) => {
  const urlForApiCall = `${SAVE_NFC_ID}/${nfc_id}`;
  const method = 'DELETE';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const checkNfcIdRequest = async (
  internetCheck: boolean,
  nfc_id: string,
  teamId: string | null,
) => {
  const urlForApiCall = `${SAVE_NFC_ID}/${nfc_id}`;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    CommonDataManager.getSharedInstance().manageBodyWithTeamId({}, teamId),
  );
  return apiRequest;
};

export const unlinkNfcRequest = async (
  internetCheck: boolean,
  teamId: string | null,
) => {
  const urlForApiCall = UNLINK_NFC_URL;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    CommonDataManager.getSharedInstance().manageBodyWithTeamId({}, teamId),
  );
  return apiRequest;
};

export const getSharedCardDataRequest = async (
  internetCheck: boolean,
  cardType: string,
  cardId: string,
) => {
  const urlForApiCall = GET_SHARED_CARD_DATA_URL + cardType + `/${cardId}`;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const registerDeviceForNotificationsRequest = async (
  internetCheck: boolean,
  params: any,
) => {
  const urlForApiCall = REGISTED_DEVICE_URL;
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

export const getAllNotificationsListRequest = async (
  internetCheck: boolean,
) => {
  const urlForApiCall = GET_NOTIFICATIONS_LIST_URL;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const getCardVCFRequest = async (
  internetCheck: boolean,
  cardType: string,
  cardId: string,
  paramsObj: any,
) => {
  const urlForApiCall = GET_CARD_VCF_URL + `/${cardType}` + `/${cardId}`;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    paramsObj,
  );
  return apiRequest;
};

export const getTeamNodeDetailsRequest = async (internetCheck: boolean, nodeType: string, id: string) => {
  const urlForApiCall = `${GET_TEAM_NODE_DETAILS_URL}${nodeType == 'team' ? 'getHierarchyData' : 'nodeScan'}/${id}`;
  const method = 'GET';
  const sendToken = false;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
}

export const getTeamMemberFunctionsListRequest = async (
  internetCheck: boolean,
  params: any,
) => {
  const urlForApiCall = GET_TEAM_MEMBER_FUNCTIONS_URL;
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