import {
  createNavigationContainerRef,
  useIsFocused,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AlertModal from './Ui/Components/CustomModal/AlertModal';
import {setIsAlertShow} from './Redux/reducers/AppReducer';
import AppLoader from './Ui/Components/AppLoader';
import MainNavigation from './Navigation/MainNavigation';
import AuthStack from './Navigation/AuthNavigation';
import {AppColors} from '../src/Utils/AppConstants';
export const navigationRef = createNavigationContainerRef();

function AppContainer() {
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && selector?.userData) {
    }
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.childContainer}>
        {selector?.isAlertShow?.value ? (
          <AlertModal
            visible={selector?.isAlertShow?.value}
            onPress={() => {
              dispatch(setIsAlertShow({value: false, message: ''}));
            }}
            message={selector?.isAlertShow?.message}
            indigo
          />
        ) : null}
        {selector?.isLoaderStart ? (
          <AppLoader visisble={selector?.isLoaderStart} />
        ) : null}
        {selector?.userData ? <MainNavigation /> : <AuthStack />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.white.white,
  },
  childContainer: {
    flex: 1,
    zIndex: 0,
  },
});
export default AppContainer;
