import React, {useReducer} from 'react';
import {Dimensions, Platform, StatusBar, View} from 'react-native';
import {
  containerInitialState,
  containerReducer,
  setContainerStack,
} from './State';
import {AppColors, BottomBarList} from '../../../Utils/AppConstants';
import {useSelector} from 'react-redux';
import BottomBar from '../../Components/BottomBar/BottomBar';
const Container = ({navigation}) => {
  const [state, dispatch] = useReducer(containerReducer, containerInitialState);
  const selector = useSelector((AppState: any) => AppState.AppReducer);

  //bottom bar Magic Function
  let statusHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 0;
  const calculateWindowHeight = () => {
    let diff =
      Dimensions.get('screen').height - Dimensions.get('window').height;
    const isPoco = Platform?.constants?.Brand?.toLowerCase() == 'poco';
    if (diff <= 50 && !isPoco) {
      return Dimensions.get('window').height - (diff - statusHeight - 3);
    }
    return Dimensions.get('window').height;
  };
  //-------->

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.white.white,
        zIndex: 10,
      }}>
      <View
        style={[
          {borderRadius: 20},
          Platform.OS == 'android'
            ? {height: calculateWindowHeight() - selector?.bottomBarHeight}
            : {flex: 1},
        ]}>
        {setContainerStack(state.selectedTab)}
      </View>

      <BottomBar
        bottomBarList={BottomBarList}
        dispatch={dispatch}
        navigation={navigation}
        tab={state.selectedTab}
      />
    </View>
  );
};
export default Container;
