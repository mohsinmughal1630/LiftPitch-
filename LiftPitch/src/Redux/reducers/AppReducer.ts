import {createSlice} from '@reduxjs/toolkit';
import {
  IReduxState,
  bottomBarHeightConstant,
  emptyCardBoilerplate
} from '../../Utils/AppConstants';
import {AppStrings} from '../../Utils/Strings';

const initialState: IReduxState = {
  isLoaderStart: false,
  openMenu: false,
  isNetConnected: true,
  safeArea: {top: 0, bottom: 0},
  userData: null,
  currentTab: 0,
  bottomBarHeight: bottomBarHeightConstant,
  drawerValue: false,
  drawerIndex: 0,
  isNotchDevice: false,
  moveToSettings: false,
  fetchUpdatedUser: new Date().toISOString(),
  fetchUpdatedCards: null,
  fetchUpdatedContacts: null,
  fetchUpdatedFunctions: null,
  moveToScreen: null,
  moveToParams: null,
  alertObj: null,
  showToast: '',
  createCardObj: emptyCardBoilerplate,
  moveToBindScreen: false,
  notificationObj: null,
  cardClickedFromHome: false,
  settingsData: null,
  showWalkthrough: false,
  isNewNotification: false,
  linkingUrl: '',
  secretId: null,
  teamId: null,
  teamSignupData: null,
  selectedTeamMember: null,
  isComingFromTeam: false,
  scannedTeamDetails: null,
  isTagScanning: false,
  packagePlan: null,
  userFunctionAvailability: null,
  showUpgradeModal: null,
  isUpgradeScreenFocused: false
};

export const AppSlice = createSlice({
  name: 'AppReducer',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoaderStart = action.payload;
    },
    setSafeArea: (state, action) => {
      state.safeArea = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setBottomBarHeight: (state, action) => {
      state.bottomBarHeight = action.payload;
    },
    toggleDrawer: (state, action) => {
      state.drawerValue = action.payload;
    },
    setDrawerIndex: (state, action) => {
      state.drawerIndex = action.payload;
    },
    setIsNotchDevice: (state, action) => {
      state.isNotchDevice = action.payload;
    },
    setMoveToSettings: (state, action) => {
      state.moveToSettings = action.payload;
    },
    setNetConnected: (state, action) => {
      state.isNetConnected = action.payload;
    },
    setFetchUpdatedUser: (state, action) => {
      state.fetchUpdatedUser = action.payload;
    },
    setFetchUpdatedCards: (state, action) => {
      state.fetchUpdatedCards = action.payload;
    },
    setFetchUpdatedContacts: (state, action) => {
      state.fetchUpdatedContacts = action.payload;
    },
    setFetchUpdatedFunctions: (state, action) => {
      state.fetchUpdatedFunctions = action.payload;
    },
    setMoveToScreen: (state, action) => {
      state.moveToScreen = action.payload;
    },
    setMoveToParams: (state, action) => {
      state.moveToParams = action.payload;
    },
    setAlertObj: (state, action) => {
      if (action.payload?.message !== AppStrings.Network.tokenExpired) {
        state.alertObj = action.payload;
      }
    },
    setCreateCardObj: (state, action) => {
      state.createCardObj = action.payload;
    },
    setMoveToBindScreen: (state, action) => {
      state.moveToBindScreen = action.payload;
    },
    setShowToast: (state, action) => {
      state.showToast = action.payload;
    },
    setNotificationObj: (state, action) => {
      state.notificationObj = action.payload;
    },
    setCardClickedFromHome: (state, action) => {
      state.cardClickedFromHome = action.payload;
    },
    setSettingsData: (state, action) => {
      state.settingsData = action.payload;
    },
    setShowWalkthrough: (state, action) => {
      state.showWalkthrough = action.payload;
    },
    setIsNewNotification: (state, action) => {
      state.isNewNotification = action.payload;
    },
    setLinkingUrl: (state, action) => {
      state.linkingUrl = action.payload;
    },
    setSecretId: (state, action) => {
      state.secretId = action.payload;
    },
    setTeamId: (state, action) => {
      state.teamId = action.payload;
    },
    setTeamSignupData: (state, action) => {
      state.teamSignupData = action.payload;
    },
    setSelectedTeamMember: (state, action) => {
      state.selectedTeamMember = action.payload;
    },
    setIsComingFromTeam: (state, action) => {
      state.isComingFromTeam = action.payload;
    },
    setScannedTeamDetails: (state, action) => {
      state.scannedTeamDetails = action.payload;
    },
    setIsTagScanning: (state, action) => {
      state.isTagScanning = action.payload;
    },
    setPackagePlan: (state, action) => {
      state.packagePlan = action.payload;
    },
    setUserFunctionAvailability: (state, action) => {
      state.userFunctionAvailability = action.payload;
    },
    setShowUpgradeModal: (state, action) => {
      state.showUpgradeModal = action.payload
    },
    setIsUpgradeScreenFocused: (state, action) => {
      state.isUpgradeScreenFocused = action.payload
    }
  },
});

export const {
  setLoader,
  setSafeArea,
  setUserData,
  setTab,
  setBottomBarHeight,
  toggleDrawer,
  setDrawerIndex,
  setIsNotchDevice,
  setMoveToSettings,
  setNetConnected,
  setFetchUpdatedUser,
  setFetchUpdatedCards,
  setFetchUpdatedFunctions,
  setMoveToScreen,
  setMoveToParams,
  setAlertObj,
  setFetchUpdatedContacts,
  setCreateCardObj,
  setMoveToBindScreen,
  setShowToast,
  setNotificationObj,
  setCardClickedFromHome,
  setSettingsData,
  setShowWalkthrough,
  setIsNewNotification,
  setLinkingUrl,
  setSecretId,
  setTeamId,
  setTeamSignupData,
  setSelectedTeamMember,
  setIsComingFromTeam,
  setScannedTeamDetails,
  setIsTagScanning,
  setPackagePlan,
  setUserFunctionAvailability,
  setShowUpgradeModal,
  setIsUpgradeScreenFocused
} = AppSlice.actions;

export default AppSlice.reducer;
