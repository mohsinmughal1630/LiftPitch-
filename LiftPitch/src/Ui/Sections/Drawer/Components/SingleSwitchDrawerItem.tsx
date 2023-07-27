import React from 'react';
import {Image, Text, View} from 'react-native';
import {
  AppColors,
  AppImages,
  hv,
  isSmallDevice,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import AppSwitch from '../../../Components/Switch/AppSwitch';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import CommonDataManager from '../../../../Utils/CommonManager';
import {setAlertObj} from '../../../../Redux/reducers/AppReducer';
import {AppStrings} from '../../../../Utils/Strings';

const SingleSwitchDrawerItem = () => {
  const dispatch = useDispatch();
  const {teamId, userData} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );

  const toggleChanged = async (val: boolean) => {
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

  return !CommonDataManager.getSharedInstance().showTeamToggle(
    userData,
  ) ? null : (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: isSmallDevice ? hv(55) : hv(45),
        borderRadius: 25,
      }}>
      <View
        style={{
          width: normalized(50),
          height: normalized(50),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={
            teamId
              ? AppImages.Profile.PersonIcon
              : AppImages.Teams.TeamMembersIcon
          }
          resizeMode="contain"
          style={{
            tintColor: AppColors.dark.darkLevel1,
            width: normalized(18),
            height: normalized(18),
          }}
        />
      </View>
      <Text
        style={{
          ...AppStyles.textSemiBold,
          color: AppColors.dark.darkLevel1,
          flex: 1,
        }}>
        {`Switch to ${teamId ? 'User' : 'Team'}`}
      </Text>
      <AppSwitch
        value={teamId ? true : false}
        onToggle={toggleChanged}
        outerContainerStyle={{
          padding: 5,
          paddingVertical: 15,
          marginLeft: 10,
        }}
      />
    </View>
  );
};

export default SingleSwitchDrawerItem;
