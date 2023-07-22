import React from 'react';
import {
  GroceryStack,
  HomeStack,
  MoreStack,
  OffersStack,
  OrdersStack,
} from '../../../../Navigation/InnerStack';

export const containerStateEnum = {
  changeTab: 'CHANGE_TAB',
};
export const containerInitialState = {
  selectedTab: 0,
};
export const containerReducer = (state = containerInitialState, action) => {
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
export const setContainerStack = (index, navigation) => {
  if (index == 0) {
    return <HomeStack />;
  } else if (index == 1) {
    return <GroceryStack />;
  } else if (index == 2) {
    return <OrdersStack />;
  } else if (index == 3) {
    return <OffersStack />;
  } else if (index == 4) {
    return <MoreStack />;
  } else {
    return null;
  }
};
