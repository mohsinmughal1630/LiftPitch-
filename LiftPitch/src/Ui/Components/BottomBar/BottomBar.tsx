import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsComingFromTeam,
  setMoveToParams,
  setScannedTeamDetails,
  setSelectedTeamMember,
  setTab,
} from '../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {bottomBarList, hv} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import {containerStateEnum} from '../../Sections/Container/State';
import Bar from './Bar';
interface Props {
  dispatch: any;
  navigation: any;
}
const BottomBar = (props: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector((AppState: AppRootStore) => AppState);
  return (
    <View
      style={{
        ...AppStyles.bottomBarBackStyle,
        height: selector.AppReducer.bottomBarHeight,
        justifyContent: 'flex-end',
        overflow:
          selector.AppReducer.bottomBarHeight == 0 ? 'hidden' : 'visible',
      }}>
      <View style={AppStyles.BottomBarStyle}>
        {bottomBarList.map((item, index) => (
          <Bar
            key={item.title}
            obj={item}
            index={index}
            onPress={() => {
              props.navigation.popToTop();
              props.dispatch({type: containerStateEnum.changeTab, data: index});
              dispatch(setTab(index));
              if (index !== 2 && selector.AppReducer.selectedTeamMember) {
                dispatch(setSelectedTeamMember(null));
                dispatch(setIsComingFromTeam(false));
                dispatch(setMoveToParams(null));
                dispatch(setScannedTeamDetails(null));
              }
            }}
            navigation={props.navigation}
          />
        ))}
      </View>
    </View>
  );
};
export default BottomBar;
