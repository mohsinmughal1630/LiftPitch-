import Api from "../Api";
import { APPLY_ENTERPRISE_URL, CHECK_TRANSACTION_ID_URL, GET_PACKAGES_LIST_URL, PURCHASE_PACKAGE_URL, UPDATE_PACKAGE_URL } from "../Urls";

export const getAllPackagesListRequest = async () => {
    const urlForApiCall = GET_PACKAGES_LIST_URL;
    const method = 'GET';
    const sendToken = false;
    let apiRequest = await Api(true, urlForApiCall, method, sendToken);
    return apiRequest;
  };

export const purchasePackageApiRequest = async (
  internetCheck: boolean,
  params: any,
) => {
  const urlForApiCall = PURCHASE_PACKAGE_URL;
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

export const updatePackageApiRequest = async (
  internetCheck: boolean,
  params: any,
) => {
  const urlForApiCall = UPDATE_PACKAGE_URL;
  const method = 'PUT';
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

export const checkTransactionIdStatusFirst = async (
  internetCheck: boolean,
  params: any,
) => {
  const urlForApiCall = CHECK_TRANSACTION_ID_URL;
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

export const applyEnterprisePackageRequest = async (
  internetCheck: boolean,
  params: any,
) => {
  const urlForApiCall = APPLY_ENTERPRISE_URL;
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