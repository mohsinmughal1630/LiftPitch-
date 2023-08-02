import React from 'react';
import {
  AddVideoStack,
  FollowerStack,
  HomeStack,
  NotificationStack,
  ProfileStack,
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
export const setContainerStack = (index: any) => {
  if (index == 0) {
    return <HomeStack />;
  } else if (index == 1) {
    return <FollowerStack />;
  } else if (index == 2) {
    return <AddVideoStack />;
  } else if (index == 3) {
    return <NotificationStack />;
  } else if (index == 4) {
    return <ProfileStack />;
  }
};
