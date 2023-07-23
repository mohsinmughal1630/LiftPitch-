import {createSlice} from '@reduxjs/toolkit';
import {normalized} from '../../Utils/AppConstants';
import {initialize} from '../action/AppLogics';
export interface SliceState {
  value: number;
  userData: any;
  currentTab: number;
  bottomBarHeight: number;
  isNetConnected: boolean;
  isLoaderStart: boolean;
  isAlertShow: any;
}
const initialState: SliceState = {
  value: 100,
  userData: null,
  currentTab: 0,
  bottomBarHeight: normalized(60),
  isNetConnected: false,
  isLoaderStart: false,
  isAlertShow: {value: false, title: 'Alert', message: ''},
};
export const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    changeValue: (state, action) => {
      initialize(state, action);
    },
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setBottomBarHeight: (state, action) => {
      state.bottomBarHeight = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    setNetState: (state, action) => {
      state.isNetConnected = action.payload;
    },
    setIsLoader: (state, action) => {
      state.isLoaderStart = action.payload;
    },

    setIsAlertShow: (state, action) => {
      state.isAlertShow = action.payload;
    },

    logOut: (state, action) => {
      console.log('helloo----->');
    },
  },
});
export const {
  setTab,
  changeValue,
  setUserData,
  setNetState,
  setIsLoader,
  setIsAlertShow,
  logOut,
} = appReducer.actions;
export default appReducer.reducer;
