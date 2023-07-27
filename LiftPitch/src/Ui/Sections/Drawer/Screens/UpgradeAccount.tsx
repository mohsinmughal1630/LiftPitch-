import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  AppColors,
  normalized,
  packagePlansList,
  ScreenProps,
  ScreenSize,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import AppHeader from '../../../Components/Header/AppHeader';
import SingleUpgradeView from '../Components/SingleUpgradeView';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsUpgradeScreenFocused,
  setTab,
} from '../../../../Redux/reducers/AppReducer';
import useBackButtonListener from '../../../../Hooks/useBackButtonListener';
import useSubscriptionManager from '../../../../Hooks/useSubscriptionManager';
import {Routes} from '../../../../Utils/Routes';
import CommonDataManager from '../../../../Utils/CommonManager';
import {AppRootStore} from '../../../../Redux/store/AppStore';

const UpgradeAccount = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const {purchasePackageRequest} = useSubscriptionManager();
  const [currentSlideIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // dispatch(setIsUpgradeScreenFocused(true));
    return () => {
      dispatch(setIsUpgradeScreenFocused(false));
    };
  }, []);

  useBackButtonListener(() => {
    backButtonPressed();
    return true;
  });
  const backButtonPressed = () => {
    if (props.navigation.canGoBack()) {
      props.navigation.goBack();
    } else {
      dispatch(setTab(0));
    }
  };
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / ScreenSize.width);
    setCurrentIndex(currentIndex);
  };
  const onConfirmPurchasePackage = async (
    selectedPackage: any,
    isMonthly: boolean,
  ) => {
    purchasePackageRequest(selectedPackage, isMonthly);
  };

  const noBack = props.route.params?.noBack;

  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title="Upgrade Account"
        isBack={noBack ? false : true}
        onBack={backButtonPressed}
        showEndButton={noBack ? true : false}
        endItem="Logout"
        onEndItemPress={() =>
          CommonDataManager.getSharedInstance().logoutUserRequest(
            isNetConnected,
          )
        }
      />
      <View style={styles.mainContainer}>
        <Footer currentSlideIndex={currentSlideIndex} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={packagePlansList}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          renderItem={({item, index}) => {
            const isLast = item.id == 8;
            return (
              <SingleUpgradeView
                index={index}
                item={item}
                onPress={val => onConfirmPurchasePackage(item, val == 0)}
                containerStyle={{
                  marginBottom: isLast ? normalized(70) : 0,
                }}
                onEnterpriseClick={val =>
                  props.navigation.push(Routes.Settings.enterpriseContactForm, {
                    isMonthly: val == 0,
                  })
                }
              />
            );
          }}
          keyExtractor={(item, i) => i.toString()}
        />
      </View>
    </View>
  );
};
export default UpgradeAccount;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.dark.darkLevel5,
    flex: 1,
  },
  multiView: {},
  sectionTitle: {
    color: AppColors.dark.darkLevel1,
    ...AppStyles.textSemiBold,
    fontSize: normalized(14),
  },
  indicator: {
    height: 7,
    width: 7,
    borderRadius: 4,
    backgroundColor: AppColors.white.white,
    marginHorizontal: 3,
  },
});

const Footer = ({currentSlideIndex}: any) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 5,
        alignSelf: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {packagePlansList.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex == index && {
                backgroundColor: AppColors.primaryGreen,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};
