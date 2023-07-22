import {UserViewModel} from '../../Models/UserViewModel';
import {
  START_LOADER,
  OPEN_MENU,
  SET_CURRENT_USER,
  SET_INTERNET_STATE,
  SET_SAFE_AREA,
  SET_TAB,
  SET_BOTTOM_BAR_HEIGHT,
  SET_CURRENT_LANG,
  SET_LANG_STATE
} from './types';
export const startLoader = (isLoaderStart: boolean) => ({
  type: START_LOADER,
  data: isLoaderStart,
});
export const toggleMenu = (menu: boolean) => ({
  type: OPEN_MENU,
  data: menu,
});
export const setCurrentUser = (user: UserViewModel) => ({
  type: SET_CURRENT_USER,
  data: user,
});
export const setSafeArea = (area: {}) => ({
  type: SET_SAFE_AREA,
  data: area,
});
export const setNetState = (connected: boolean) => ({
  type: SET_INTERNET_STATE,
  data: connected,
});
export const setTab = (tab: number) => ({
  type: SET_TAB,
  data: tab,
});
export const setBottomBarHeight = (height: number) => ({
  type: SET_BOTTOM_BAR_HEIGHT,
  data: height,
});
export const setCurrentLang = (language: string) => ({
  type: SET_CURRENT_LANG,
  data: language,
});
export const setLang = (lang: string) => ({
  type: SET_LANG_STATE,
  data: lang,
});