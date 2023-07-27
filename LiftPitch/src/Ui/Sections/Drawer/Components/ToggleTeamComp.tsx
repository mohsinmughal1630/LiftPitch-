import React, {useEffect, useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  AppColors,
  ScreenSize,
  normalized,
} from '../../../../Utils/AppConstants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native';
import {AppStyles} from '../../../../Utils/AppStyles';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import CommonDataManager from '../../../../Utils/CommonManager';
import {setAlertObj} from '../../../../Redux/reducers/AppReducer';
import {AppStrings} from '../../../../Utils/Strings';

const barWidth = ScreenSize.width * 0.7;

const ToggleTeamComp = () => {
  const dispatch = useDispatch();
  const {userData, teamId} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const bgOffset = useSharedValue(barWidth / 2);
  useEffect(() => {
    changeTab();
  }, [teamId]);

  const changeTab = () => {
    bgOffset.value = withTiming(!teamId ? 0 : barWidth / 2);
  };
  const tabStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: bgOffset.value,
        },
      ],
    };
  });

  const toggleChanged = async () => {
    if (
      CommonDataManager.getSharedInstance().shouldMemberJoinTeam(
        userData,
        teamId,
      )
    ) {
      await CommonDataManager.getSharedInstance().manageSecretId(
        userData,
        teamId,
        teamId ? 'user' : 'member',
      );
    } else {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: AppStrings.Teams.suspendedMemberError,
        }),
      );
    }
  };

  const teamToSwitch = userData.connected_teams[0]
    ? userData.connected_teams[0]?.name
    : '';

  return (
    <>
      <Text
        style={{
          ...AppStyles.textMedium,
          fontSize: normalized(14),
          color: AppColors.dark.darkLevel1,
          marginBottom: 8,
          marginLeft: 5,
        }}>
        {`Switch to ${teamId ? 'Individual Mode' : teamToSwitch}`}
      </Text>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          borderRadius: 30,
          overflow: 'hidden',
          borderColor: AppColors.primaryGreen,
          borderWidth: 1,
          zIndex: 1,
          marginBottom: 5,
        }}>
        {[1, 2].map((item, index) => {
          return (
            <TouchableWithoutFeedback key={index} onPress={toggleChanged}>
              <View
                style={{
                  height: 50,
                  width: '50%',
                  zIndex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...AppStyles.textMedium,
                    fontSize: normalized(14),
                    color: AppColors.white.white,
                  }}>{`${index == 0 ? 'Individual' : 'Team'}`}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
        <Animated.View style={[styles.gradient, tabStyles]}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0.7, y: 0}}
            colors={[AppColors.green.primaryLight, AppColors.primaryGreen]}
            style={{flex: 1}}></LinearGradient>
        </Animated.View>
      </View>
    </>
  );
};

export default ToggleTeamComp;

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    width: barWidth / 2 + 10,
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
  },
});
