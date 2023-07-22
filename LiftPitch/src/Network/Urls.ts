//URLS
// LIVE URL
// export const BASE_URL = "https://ihope.apis.cognitix.net/api/"
//TESTING URL
export const BASE_URL = "http://congnitix.crunchyapps.com:4000/api/"
export const USER = "users/"
export const LOGIN_URL = BASE_URL + USER + "login"
export const LOGIN_USER_DATA_URL = BASE_URL + USER + "user_data"
export const USER_DATA_INVITATION_URL = BASE_URL + USER + "invitation_accept_reject"
export const SETUP_ACCOUNT_URL = BASE_URL + USER + "account-setup"
export const LOGOUT_URL = BASE_URL + USER + "Logout"
export const REFRESH_TOKEN_URL = BASE_URL + USER + "RefreshToken"
export const FORGET_PASSWORD_LINK = BASE_URL + USER + "forgotPassword"
export const RESET_PASSWORD_LINK = BASE_URL + USER + "resetPassword"
export const UPDATE_PROFILE_URL = BASE_URL + USER + "updateProfile"
export const PROCESS_INPUT_URL = BASE_URL + USER + "process_user_input"
export const INVITE_MEMBER_URL = BASE_URL + USER + "invite_user"
export const MEMBER_LIST_URL = BASE_URL + USER + "family_members"
export const BILLING_UPDATE_URL = BASE_URL + USER + "update_billing"
export const REMOVE_MEMBER_URL = BASE_URL + USER + "remove_user"
//APIS MESSAGES
export const ERROR_MESSAGES = {
    ERROR_CODE: '101',
    INVALID_TOKEN_CODE : 2
  };