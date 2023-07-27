import CommonDataManager from "../../Utils/CommonManager";
import Api from "../Api"
import { ApiResponseHandler } from "../ApiResponseHandler"
import { ADD_CARD_URL, CARDLIST_URL, CONTACT_LIST_URL, DELETECARD, DUPLICATE_CARD_URL, EDITCARD_URL } from "../Urls"

export const cardListRequest = async <T>(
  internetCheck: boolean,
  teamId: any
): Promise<ApiResponseHandler<T>> => {
  let response: ApiResponseHandler<T>;
  const urlForApiCall = CommonDataManager.getSharedInstance().manageUrlWithTeamId(CARDLIST_URL, teamId);
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const addCardRequest = async <T>(
  internetCheck: boolean,
  params: number,
  teamId: any
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = ADD_CARD_URL;
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

export const deleteCardRequest = async <T>(
  internetCheck: boolean,
  params: number,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = DELETECARD + params
  const method = 'DELETE';
  const sendToken = true;
  let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const editCardRequest = async <T>(
  internetCheck: boolean,
  params: number,
  id: number,
  teamId:any
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = EDITCARD_URL + id;
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
export const editCardFromContactRequest = async <T>(internetCheck: boolean, params: any, id: number, teamId: any): Promise<ApiResponseHandler<T>> => {
    const urlForApiCall = CONTACT_LIST_URL + `/${id}`
    const method = "PUT";
    const sendToken = true
    let apiRequest = await Api(
      internetCheck, 
      urlForApiCall, 
      method, 
      sendToken, 
      CommonDataManager.getSharedInstance().manageBodyWithTeamId(params, teamId)
      )
    return apiRequest
}

export const duplicateCardRequest = async <T>(internetCheck: boolean, id: number): Promise<ApiResponseHandler<T>> => {
    const urlForApiCall = DUPLICATE_CARD_URL + id
    const method = "GET";
    const sendToken = true
    let apiRequest = await Api(internetCheck, urlForApiCall, method, sendToken)
    return apiRequest
}
