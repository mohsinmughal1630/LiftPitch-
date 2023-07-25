import CommonDataManager from '../../Utils/CommonManager';
import Api from '../Api';
import {UPLOAD_FILES_URL} from '../Urls';

export const getUploadFilesListRequest = async (internetCheck: boolean, teamId: any) => {
  const urlForApiCall = CommonDataManager.getSharedInstance().manageUrlWithTeamId(UPLOAD_FILES_URL, teamId);
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const createUploadFilesRequest = async (
  internetCheck: boolean,
  params: any,
  teamId: any
) => {
  const urlForApiCall = UPLOAD_FILES_URL;
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

export const updateUploadFilesRequest = async (
  internetCheck: boolean,
  id: number,
  params: any,
  teamId: any
) => {
  const urlForApiCall = `${UPLOAD_FILES_URL}/${id}`;
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

export const deleteUploadFilesRequest = async (
  internetCheck: boolean,
  id: number,
) => {
  const urlForApiCall = `${UPLOAD_FILES_URL}/${id}`;
  const method = 'DELETE';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};
