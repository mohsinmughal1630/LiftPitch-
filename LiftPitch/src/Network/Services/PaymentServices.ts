import CommonDataManager from '../../Utils/CommonManager';
import Api from '../Api';
import {PAYMENT_URL} from '../Urls';

export const getPaymentListRequest = async (internetCheck: boolean, teamId: any) => {
  const urlForApiCall = CommonDataManager.getSharedInstance().manageUrlWithTeamId(PAYMENT_URL, teamId);
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const createPaymentRequest = async (
  internetCheck: boolean,
  params: any,
  teamId: any
) => {
  const urlForApiCall = PAYMENT_URL;
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

export const updatePaymentRequest = async (
  internetCheck: boolean,
  id: number,
  params: any,
  teamId: any
) => {
  const urlForApiCall = `${PAYMENT_URL}/${id}`;
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

export const deletePaymentRequest = async (
  internetCheck: boolean,
  id: number,
) => {
  const urlForApiCall = `${PAYMENT_URL}/${id}`;
  const method = 'DELETE';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};
