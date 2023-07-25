import CommonDataManager from '../../Utils/CommonManager';
import Api from '../Api';
import {VENMO_URL} from '../Urls';

export const getVenmoListRequest = async (internetCheck: boolean, teamId: any) => {
  const urlForApiCall = CommonDataManager.getSharedInstance().manageUrlWithTeamId(VENMO_URL, teamId);;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const createVenmoRequest = async (
  internetCheck: boolean,
  params: any,
  teamId: any
) => {
  const urlForApiCall = VENMO_URL;
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

export const updateVenmoRequest = async (
  internetCheck: boolean,
  id: number,
  params: any,
  teamId: any
) => {
  const urlForApiCall = `${VENMO_URL}/${id}`;
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

export const deleteVenmoRequest = async (
  internetCheck: boolean,
  id: number,
) => {
  const urlForApiCall = `${VENMO_URL}/${id}`;
  const method = 'DELETE';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};
