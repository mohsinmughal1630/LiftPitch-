import {createSlice} from '@reduxjs/toolkit';
import {
  normalized,
} from '../../Utils/AppConstants';
import {AppStrings} from '../../Utils/Strings';

export interface IReduxState {
  userData: any;
  currentTab: number;
  bottomBarHeight: number;
  isNetConnected: boolean;
  isLoaderStart: boolean;
  isAlertShow: any;
}
const initialState: IReduxState = {
  userData: null,
  currentTab: 0,
  bottomBarHeight: normalized(60),
  isNetConnected: false,
  isLoaderStart: false,
  isAlertShow: {value: false, message: ''},

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
    
    setIsAlertShow: (state, action) => {
      state.isAlertShow = action.payload;
    },
    logOut: (state, action) => {
      state.userData = null;
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
  logOut
} = AppSlice.actions;

export default AppSlice.reducer;
