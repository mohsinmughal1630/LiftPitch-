import axios from 'axios';
import CommonDataManager from '../Utils/CommonManager';
import {AppStrings} from '../Utils/Strings';
import {refreshTokenRequest} from './Services/UserServices';

const Api = async (
  internetValue = true,
  url: string,
  method: string,
  token = false,
  body = {},
  isFormData = false,
) => {
  let headers: any;
  const {CancelToken} = axios;
  const source = CancelToken.source();
  var apiTimeout = setTimeout(() => {
    source.cancel(AppStrings.Network.requestTimeoutError);
  }, 70000);
  if (isFormData) {
    headers = {
      'Content-Type': 'multipart/form-data',
    };
  } else {
    headers = {
      'Content-Type': 'application/json',
    };
  }

  if (!internetValue) {
    return {
      message: AppStrings.Network.internetError,
      data: null,
      success: false,
    };
  }

  if (token) {
    const userToken =
      await CommonDataManager.getSharedInstance().getUserToken();
    // console.log('this is user token ', userToken);
    headers.Authorization = `Bearer ${userToken}`;
  }

  const structure: any = {
    url,
    method,
    headers,
    cancelToken: source.token,
  };

  if (method === 'GET') {
    structure.params = body;
  } else {
    structure.data = body;
  }

  return axios(structure)
    .then(resp => {
      clearTimeout(apiTimeout);
      return resp.data;
    })
    .catch(async error => {
      clearTimeout(apiTimeout);
      if (error?.response?.data?.message == AppStrings.Network.tokenExpired) {
        let result = await refreshTokenRequest(internetValue);
        if (result) {
          await Api(internetValue, url, method, token, body, isFormData);
        } else {
          await CommonDataManager.getSharedInstance().logoutUser();
        }
      }
      return error?.response?.data
        ? error.response.data
        : {
            message: error?.message
              ? error.message
              : AppStrings.Network.somethingWrong,
            data: null,
            success: false,
          };
    });
};

export default Api;
