import CommonDataManager from '../../Utils/CommonManager';
import Api from '../Api';
import {CUSTOM_URL} from '../Urls';

export const getCustomUrlsListRequest = async (internetCheck: boolean, teamId: any) => {
  const urlForApiCall = CommonDataManager.getSharedInstance().manageUrlWithTeamId(CUSTOM_URL, teamId);
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const deleteCustomUrlRequest = async (
  internetCheck: boolean,
  id: number,
) => {
  const urlForApiCall = `${CUSTOM_URL}/${id}`;
  const method = 'DELETE';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const createCustomUrlRequest = async (
  internetCheck: boolean,
  params: any,
  teamId:any
) => {
  const urlForApiCall = CUSTOM_URL;
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

export const updateCustomUrlRequest = async (
  internetCheck: boolean,
  id: number,
  params: any,
  teamId:any
) => {
  const urlForApiCall = `${CUSTOM_URL}/${id}`;
  const method = 'PUT';
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
