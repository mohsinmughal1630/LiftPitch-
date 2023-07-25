import {Platform} from 'react-native';
const isTesting = true;
const BACKEND_BASE = isTesting
  ? 'https://www.nfc-backend-testing.crunchyapps.com/'
  : 'https://www.nfc-backend.crunchyapps.com/';
export const BASE_URL = `${BACKEND_BASE}api/`;
export const IMAGE_BASE_URL = BACKEND_BASE;

// Shop URL
export const NFC_SHOP_URL =
  Platform.OS == 'ios'
    ? 'https://www.nfcshop.crunchyapps.com/?fromapp=true'
    : 'http://nfcshop.crunchyapps.com/?fromapp=true';
// Authentication
export const AUTH = 'auth/';
export const LOGIN_URL = BASE_URL + AUTH + 'login';
export const SIGNUP_URL = BASE_URL + AUTH + 'register';
export const SOCIAL_LOGIN_URL = BASE_URL + AUTH + 'socialLogin'; // social login
export const FORGET_PASSWORD_URL = BASE_URL + AUTH + 'forgotPassword';
export const RESET_PASSWORD_URL = BASE_URL + AUTH + 'resetPassword';
export const LOGOUT_URL = BASE_URL + AUTH + 'logout';
export const GET_USER_URL = BASE_URL + AUTH + 'getUser';
export const GET_REFRESH_TOKEN = BASE_URL + AUTH + 'refreshToken';
export const CHECK_OTP_URL = BASE_URL + AUTH + 'checkOTP';
export const UPDATE_PROFILE_STATUS_URL = BASE_URL + AUTH + 'updateIsProfile';

// Teams
export const TEAM_SIGNUP_EXISTING_USER = BASE_URL + AUTH + 'alreadyMember';

// Contact
export const CONTACT_LIST_URL = BASE_URL + 'contact';
export const CREATE_CONTACT_URL = BASE_URL + 'contact/manual';

// Venmo
export const VENMO_URL = BASE_URL + 'venmo';

// Cash App
export const CASH_APP_URL = BASE_URL + 'cashApp';

// Payment
export const PAYMENT_URL = BASE_URL + 'payment';

// Upload Files
export const UPLOAD_FILES_URL = BASE_URL + 'fileUpload';

// emergency Contact List
export const EMERGENCY_CONTACT_URL = 'emergencyContact';
export const GET_EMERGENCY_CONTACTS_URL = BASE_URL + EMERGENCY_CONTACT_URL;

// Custom URL List
export const CUSTOM_URL = BASE_URL + 'customUrl';

// Custom Card List
export const ADD_CARD_URL = BASE_URL + 'card';
export const CARDLIST_URL = BASE_URL + 'card';
export const DELETECARD = BASE_URL + 'card/';
export const EDITCARD_URL = BASE_URL + 'card/';
export const DUPLICATE_CARD_URL = BASE_URL + 'card/' + 'duplicate/';

// Settigs
export const SETTING = 'setting/';
export const CHANGE_PASSWORD_URL = BASE_URL + SETTING + 'changePassword';
export const UPDATE_USER_URL = BASE_URL + SETTING + 'profile';
export const FQA_LISTING_URL = BASE_URL + SETTING + 'faq';
export const SETTING_PAGES_URL = BASE_URL + SETTING + 'page';
export const TUTORIALS_URL = BASE_URL + SETTING + 'tutorial';
export const CONTACT_US_URL = BASE_URL + SETTING + 'contactUs';
export const NOTIFICATION_SETTINGS_URL =
  BASE_URL + SETTING + 'userNotification';

// General
export const GENERAL = 'general/';
export const IMAGE_UPLOAD_URL = BASE_URL + GENERAL + 'imageUpload';
// export const GET_ALL_CARDS_URL = BASE_URL + GENERAL + 'homeDashboard';
export const GET_ALL_CARDS_URL = BASE_URL + GENERAL + 'homeDashboardV1';
export const CHANGE_CARD_STATUS_URL = BASE_URL + GENERAL + 'changeStatus';
export const CHANGE_FUNCTION_STATUS_URL =
  BASE_URL + GENERAL + 'changeFunctionStatus';
export const GET_CARD_BIND_DATA = BASE_URL + GENERAL + 'bindData';
export const SAVE_CARD_BIND_DATA = BASE_URL + GENERAL + 'saveGetBindData';
export const REGISTED_DEVICE_URL = BASE_URL + GENERAL + 'deviceRegistration';
export const GET_NOTIFICATIONS_LIST_URL =
  BASE_URL + GENERAL + 'userNotification';
export const GET_CARD_VCF_URL = BASE_URL + GENERAL + 'createVCFFile';
export const CHECK_TRANSACTION_ID_URL = BASE_URL + GENERAL + 'checkUserTransaction'
export const APPLY_ENTERPRISE_URL = BASE_URL + GENERAL + 'enterprise';

// NFC
export const SAVE_NFC_ID = BASE_URL + 'userNfc';
export const UNLINK_NFC_URL = BASE_URL + 'userNfc/deleteAllUserNfc';

const FRONTEND_BASE = isTesting
  ? 'https://nfc-frontend-testing.crunchyapps.com/'
  : 'https://nfc-frontend.crunchyapps.com/';

// Purchaes
const PURCHASE_BASE = 'purchase/'
export const GET_PACKAGES_LIST_URL = BASE_URL + PURCHASE_BASE + 'getAllPackages';
export const PURCHASE_PACKAGE_URL = BASE_URL + PURCHASE_BASE + 'purchasePackage';
export const UPDATE_PACKAGE_URL = BASE_URL + PURCHASE_BASE + 'updatePackage'

// Share Card
export const SHARE_BASE_URL = `${FRONTEND_BASE}share/`;
export const SHARE_CARD_URL = SHARE_BASE_URL + 'card/';
export const SHARE_CONTACT_URL = SHARE_BASE_URL + 'contact/';
export const SHARE_EMERGENCY_CONTACT_URL = SHARE_BASE_URL + 'emergencyContact/';
export const SHARE_VENMO_URL = SHARE_BASE_URL + 'venmo/';
export const SHARE_CASHAPP_URL = SHARE_BASE_URL + 'cashApp/';
export const SHARE_CUSTOM_PAYMENT_URL = SHARE_BASE_URL + 'customPayment/';
export const SHARE_CUSTOM_URL = SHARE_BASE_URL + 'customURL/';
export const SHARE_FILE_UPLOAD_URL = SHARE_BASE_URL + 'fileUpload/';

// QR For nodes and teams
export const GET_TEAM_NODE_DETAILS_URL = `${BASE_URL}public/tree/`
export const GET_TEAM_MEMBER_FUNCTIONS_URL = `${BASE_URL}public/allPublicTeamMemberFunction`

// get data from shared QR Codes
const SHARE_URL = 'share/';
export const GET_SHARED_CARD_DATA_URL = BASE_URL + SHARE_URL;

// App Settings
export const APP_SETTINGS_URL = BASE_URL + 'appSetting';

// New nfc preview url
export const NFC_PREVIEW_BASE_URL = `${FRONTEND_BASE}nfc/`;

// For VCF sharing
export const VCF_URL = IMAGE_BASE_URL + 'vcfcard/';