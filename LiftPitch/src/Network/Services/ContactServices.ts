import CommonDataManager from '../../Utils/CommonManager';
import Api from '../Api';
import {CONTACT_LIST_URL, CREATE_CONTACT_URL} from '../Urls';

export const contactListRequest = async (
  internetCheck: boolean,
  params: any,
  teamId: any,
) => {
  const urlForApiCall =
    CommonDataManager.getSharedInstance().manageUrlWithTeamId(
      CONTACT_LIST_URL,
      teamId,
    );
  const method = 'GET';
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

export const deleteContactRequest = async (
  internetCheck: boolean,
  id: number,
) => {
  const urlForApiCall = `${CONTACT_LIST_URL}/${id}`;
  const method = 'DELETE';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const getSingleContactDetailsRequest = async (
  internetCheck: boolean,
  id: number,
  teamId: any,
) => {
  const urlForApiCall =
    CommonDataManager.getSharedInstance().manageUrlWithTeamId(
      `${CONTACT_LIST_URL}/${id}`,
      teamId,
    );
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const createContactRequest = async (
  internetCheck: boolean,
  params: any,
  teamId: any,
) => {
  const urlForApiCall = CREATE_CONTACT_URL;
  const method = 'POST';
  const sendToken = true;
  console.log(
    'params full ',
    CommonDataManager.getSharedInstance().manageBodyWithTeamId(params, teamId),
  );
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    CommonDataManager.getSharedInstance().manageBodyWithTeamId(params, teamId),
  );
  return apiRequest;
};
