import CommonDataManager from '../../Utils/CommonManager';
import Api from '../Api';
import {CASH_APP_URL} from '../Urls';

export const getCashAppListRequest = async (internetCheck: boolean, teamId: any) => {
  const urlForApiCall = CommonDataManager.getSharedInstance().manageUrlWithTeamId(CASH_APP_URL, teamId);
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const createCashAppRequest = async (
  internetCheck: boolean,
  params: any,
  teamId: any
) => {
  const urlForApiCall = CASH_APP_URL;
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

export const updateCashAppRequest = async (
  internetCheck: boolean,
  id: number,
  params: any,
  teamId: any
) => {
  const urlForApiCall = `${CASH_APP_URL}/${id}`;
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

export const deleteCashAppRequest = async (
  internetCheck: boolean,
  id: number,
) => {
  const urlForApiCall = `${CASH_APP_URL}/${id}`;
  const method = 'DELETE';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};
