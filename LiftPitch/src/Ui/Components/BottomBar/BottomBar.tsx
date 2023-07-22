import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTab} from '../../../Redux/actions/AppLogics';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {bottomBarList} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import {containerStateEnum} from '../../Sections/Container/State';
import Bar from './Bar';
const BottomBar = ({dispatch, navigation}) => {
  const redux_Dispatch = useDispatch();
  const selector = useSelector((AppState: AppRootStore) => AppState);
  return (
    <View
      style={{
        ...AppStyles.bottomBarBackStyle,
        height: selector.AppReducer.bottomBarHeight,
      }}>
      <View
        style={{
          ...AppStyles.BottomBarStyle,
        }}>
        {bottomBarList.map((item, index) => (
          <Bar
            key={item.title}
            obj={item}
            index={index}
            onPress={() => {
              navigation.popToTop();
              dispatch({type: containerStateEnum.changeTab, data: index});
              redux_Dispatch(setTab(index));
            }}
          />
        ))}
      </View>
    </View>
  );
};
export default BottomBar;
