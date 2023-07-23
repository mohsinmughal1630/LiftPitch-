import React, {useEffect, useReducer} from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  View,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {AppColors, ScreenProps, ScreenSize} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import CommonDataManager from '../../../Utils/CommonManager';
import BottomBar from '../../Components/BottomBar/BottomBar';
import {
  containerInitialState,
  containerReducer,
  setContainerStack,
} from './State';
const Container = (props: ScreenProps) => {
  const [state, dispatch] = useReducer(containerReducer, containerInitialState);
  const selector = useSelector((AppState: AppRootStore) => AppState);
  useEffect(() => {
    CommonDataManager.getSharedInstance().setContainerDispatcher(dispatch);
  }, []);
  const windowHeight = Dimensions.get('window').height;
  let statusHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 0;
  const calculateWindowHeight = () => {
    // console.log('status bar height is ', StatusBar.currentHeight);
    let diff =
      Dimensions.get('screen').height - Dimensions.get('window').height;
    // console.log('diff is ', diff);
    let findedDiff = diff - statusHeight;
    // console.log('difference is ', findedDiff);
    const isPoco = Platform?.constants?.Brand?.toLowerCase() == 'poco';
    if (diff <= 50 && !isPoco) {
      return Dimensions.get('window').height - (diff - statusHeight - 3);
    }
    return Dimensions.get('window').height;
  };
  return (
    <View style={AppStyles.mainContainer}>
      <View
        style={
          Platform.OS == 'ios'
            ? AppStyles.MainStyle
            : {
                backgroundColor: AppColors.dark.darkLevel5,
                height:
                  calculateWindowHeight() - selector.AppReducer.bottomBarHeight,
              }
        }>
        {setContainerStack(selector.AppReducer.currentTab)}
      </View>
      <View
        style={{
          height: selector.AppReducer.bottomBarHeight,
          left: 0,
          right: 0,
        }}>
        <BottomBar dispatch={dispatch} navigation={props.navigation} />
      </View>
    </View>
  );
};
export default Container;
