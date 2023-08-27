import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { View } from 'react-native';
import Bar from './Bar';
import { AppColors, normalized } from '../../../Utils/AppConstants';
import { containerStateEnum } from '../../Sections/Container/State';
import { setTab } from '../../../Redux/reducers/AppReducer';
import { Routes } from '../../../Utils/Routes';
const BottomBar = ({ bottomBarList, dispatch, navigation, tab }: any) => {
  const redux_Dispatch = useDispatch();
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  return (
    <View
      style={{
        justifyContent: 'center',
        height: selector.bottomBarHeight,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 15,
        borderTopLeftRadius: normalized(25),
        borderTopRightRadius: normalized(25),
      }}>
      <View
        style={{
          width: '100%',
          height: normalized(80),
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: AppColors.white.white,
          paddingHorizontal: normalized(25),
          alignItems: 'center',
          borderTopLeftRadius: normalized(25),
          borderTopRightRadius: normalized(25),
          zIndex: 20,
        }}>
        {bottomBarList.map((item: any, index: any) => (
          <View key={index} style={{ padding: 5 }}>
            <Bar
              key={item.title}
              tab={tab}
              obj={item}
              index={index}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.popToTop();
                }
                if (index == 2) {
                  navigation.push(Routes.addVideoTab.createVideoScreen);
                  return;
                }
                dispatch({ type: containerStateEnum.changeTab, data: index });
                redux_Dispatch(setTab(index));
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
export default BottomBar;
