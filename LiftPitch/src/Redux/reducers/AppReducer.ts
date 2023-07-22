import { hv } from '../../Utils/AppConstants';
import {
  START_LOADER,
  OPEN_MENU,
  SET_CURRENT_USER,
  SET_INTERNET_STATE,
  SET_SAFE_AREA,
  SET_TAB,
  SET_BOTTOM_BAR_HEIGHT,
  SET_CURRENT_LANG,
  SET_LANG_STATE,
} from '../actions/types';
const initialState = {
  isLoaderStart: false,
  openMenu: false,
  isNetConnected: false,
  safeArea: { top: 0, bottom: 0 },
  user: null,
  currentTab: 0,
  bottomBarHeight: hv(70),
  currentLang: "English"
};
const AppReducer = (state = initialState, action: any) => {
  console.log('action.type====>', action.type);
  switch (action.type) {
    case START_LOADER:
      return {
        ...state,
        isLoaderStart: action.data,
      };
    case OPEN_MENU:
      return {
        ...state,
        openMenu: action.data,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.data,
      };
    case SET_INTERNET_STATE:
      return {
        ...state,
        isNetConnected: action.data,
      };
    case SET_SAFE_AREA:
      return {
        ...state,
        safeArea: action.data,
      };
    case SET_TAB:
      return {
        ...state,
        currentTab: action.data,
      };
    case SET_BOTTOM_BAR_HEIGHT:
      return {
        ...state,
        bottomBarHeight: action.data,
      };
    case SET_CURRENT_LANG:
      return {
        ...state,
        currentLang: action.data,
      };
      case SET_LANG_STATE:
        return {
          ...state,
          currentLang: action.data,
        };
    default:
      return state;
  }
};
export default AppReducer;
