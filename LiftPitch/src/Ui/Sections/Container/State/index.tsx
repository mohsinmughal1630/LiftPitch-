import React from 'react';
import {
  ContactStack,
  DynamicLinkStack,
  FunctionStack,
  HomeStack,
  ProfileStack,
  ScanStack,
  SettingsStack,
  ShopStack,
} from '../../../../Navigation/InnerStack';

export const containerStateEnum = {
  changeTab: 'CHANGE_TAB',
};
export const containerInitialState = {
  selectedTab: 0,
};
export const containerReducer = (
  state = containerInitialState,
  action: any,
) => {
  switch (action.type) {
    case containerStateEnum.changeTab:
      return {
        ...state,
        selectedTab: action.data,
      };
    default:
      return state;
  }
};
export const setContainerStack = (index: number) => {
  if (index == 0) {
    return <HomeStack />;
  } else if (index == 1) {
    return <ContactStack />;
  } else if (index == 2) {
    return <FunctionStack />;
  } else if (index == 3) {
    return <ShopStack />;
  } else if (index == 4) {
    return <ScanStack />;
  } else if (index == 5) {
    return <DynamicLinkStack />;
  } else if (index == 6) {
    return <SettingsStack />;
  } else if (index == 7) {
    return <ProfileStack />;
  } else {
    return null;
  }
};
