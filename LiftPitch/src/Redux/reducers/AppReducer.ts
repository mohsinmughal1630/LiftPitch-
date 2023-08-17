import {createSlice} from '@reduxjs/toolkit';
import {normalized} from '../../Utils/AppConstants';

export interface IReduxState {
  userData: any;
  currentTab: number;
  bottomBarHeight: number;
  isNetConnected: boolean;
  isLoaderStart: boolean;
  isAlertShow: any;
  isPersisterUser: boolean;
  threadList: any;
  updateToken: boolean;
  showNoti: any;
}
const initialState: IReduxState = {
  userData: null,
  currentTab: 0,
  bottomBarHeight: normalized(80),
  isNetConnected: false,
  isLoaderStart: false,
  isAlertShow: {value: false, message: ''},
  isPersisterUser: false,
  threadList: [],
  updateToken: false,
  showNoti: false,
};

export const AppSlice = createSlice({
  name: 'AppReducer',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setBottomBarHeight: (state, action) => {
      state.bottomBarHeight = action.payload;
    },

    setNetState: (state, action) => {
      state.isNetConnected = action.payload;
    },
    setIsLoader: (state, action) => {
      state.isLoaderStart = action.payload;
    },
    setUpdateFBToken: (state, action) => {
      state.updateToken = action.payload;
    },
    setIsAlertShow: (state, action) => {
      state.isAlertShow = action.payload;
    },
    setIsShowNoti: (state, action) => {
      state.showNoti = action.payload;
    },
    setThreadList: (state, action) => {
      state.threadList = action.payload;
    },
    logOut: (state, action) => {
      state.userData = null;
    },
    setIsPersisterUser: (state, action) => {
      state.isPersisterUser = action.payload;
    },
  },
});

export const {
  setUserData,
  setTab,
  setBottomBarHeight,
  setNetState,
  setIsAlertShow,
  setIsLoader,
  setThreadList,
  setIsShowNoti,
  logOut,
  setUpdateFBToken,
  setIsPersisterUser,
} = AppSlice.actions;

export default AppSlice.reducer;
