import React, {useEffect, useReducer} from 'react';
import {View} from 'react-native';
import {AppStyles} from '../../../Utils/AppStyles';
import CommonDataManager from '../../../Utils/CommonManager';
import BottomBar from '../../Components/BottomBar/BottomBar';
import {
  containerInitialState,
  containerReducer,
  setContainerStack,
} from './State';
const Container = ({navigation}) => {
  const [state, dispatch] = useReducer(containerReducer, containerInitialState);
  useEffect(() => {
    CommonDataManager.getSharedInstance().setContainerDispatcher(dispatch);
  }, []);
  return (
    <View style={AppStyles.mainContainer}>
      <View
        style={{
          flex: 1,
        }}>
        {setContainerStack(0)}
      </View>
      <BottomBar dispatch={dispatch} navigation={navigation} />
    </View>
  );
};
export default Container;
