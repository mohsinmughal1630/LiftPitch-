import CommonDataManager from '../../Utils/CommonManager';
import Api from '../Api';
import {GET_EMERGENCY_CONTACTS_URL} from '../Urls';

export const getEmergencyContactsListRequest = async (
  internetCheck: boolean,
  teamId: any
) => {
  const urlForApiCall = CommonDataManager.getSharedInstance().manageUrlWithTeamId(GET_EMERGENCY_CONTACTS_URL, teamId);
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const createEmergencyContactRequest = async (
  internetCheck: boolean,
  params: any,
  teamId:any
) => {
  const urlForApiCall = GET_EMERGENCY_CONTACTS_URL;
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

export const updateEmergencyContactRequest = async (
  internetCheck: boolean,
  id: number,
  params: any,
  teamId: any
) => {
  const urlForApiCall = `${GET_EMERGENCY_CONTACTS_URL}/${id}`;
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

export const deleteEmergencyContactRequest = async (
  internetCheck: boolean,
  id: number,
) => {
  const urlForApiCall = `${GET_EMERGENCY_CONTACTS_URL}/${id}`;
  const method = 'DELETE';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};
