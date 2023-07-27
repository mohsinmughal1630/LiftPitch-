// RootNavigation.js

import { CommonActions } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef:any = React.createRef();

export function navigate(name: string, params: any = {}) {
  navigationRef.current?.navigate(name, params);
}
export function reset(name: string, params: any = {}) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: name, params }],
      })
    );
  }