import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import {IMAGE_BASE_URL} from '../../../../Network/Urls';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import CommonDataManager from '../../../../Utils/CommonManager';
import LoadingImage from '../../../Components/LoadingImage/LoadingImage';

interface Props {
  onBack: () => void;
  onNotificationClick: () => void;
  userData: any;
}

const DrawerTopbar = (props: Props) => {
  const {isNewNotification} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  return (
    <View style={styles.main}>
      <TouchableWithoutFeedback onPress={props.onBack}>
        <View style={styles.backView}>
          <Image
            source={AppImages.Drawer.BackIcon}
            resizeMode="contain"
            style={styles.backImg}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.profileContainer}>
        {props.userData?.profile_image ? (
          <LoadingImage
            resizeMode="cover"
            uri={IMAGE_BASE_URL + props.userData?.profile_image}
            containerStyle={styles.profileView}
            imageStyle={styles.profileImg}
          />
        ) : (
          <View
            style={[
              styles.profileView,
              {
                backgroundColor: AppColors.dark.darkLevel5,
                justifyContent: 'flex-end',
                alignItems: 'center',
                overflow: 'hidden',
              },
            ]}>
            <Image
              source={AppImages.Common.ProfilePlaceholderIcon}
              resizeMode="cover"
              style={[
                styles.profileImg,
                {
                  height: '85%',
                  width: '85%',
                },
              ]}
            />
          </View>
        )}
        <Text numberOfLines={1} style={styles.profileName}>
          {`${CommonDataManager.getSharedInstance().capitalizeFirstLetter(
            props.userData?.first_name,
          )} ${CommonDataManager.getSharedInstance().capitalizeFirstLetter(
            props.userData?.last_name,
          )}`}
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={props.onNotificationClick}>
        <View style={styles.backView}>
          <Image
            source={
              AppImages.Drawer[
                isNewNotification
                  ? 'NotificationIconUnread'
                  : 'NotificationIcon'
              ]
            }
            resizeMode="contain"
            style={styles.notifImg}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default DrawerTopbar;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Platform.select({android: hv(30), ios: hv(20)}),
    paddingBottom: hv(15),
    paddingHorizontal: normalized(10),
  },
  backView: {
    width: normalized(40),
    height: normalized(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImg: {
    width: normalized(25),
    height: normalized(25),
  },
  profileContainer: {
    alignItems: 'center',
    maxWidth: normalized(180),
    marginTop: hv(7),
  },
  profileView: {
    height: normalized(100),
    width: normalized(100),
    borderRadius: normalized(50),
    overflow: 'hidden',
    borderColor: AppColors.dark.darkLevel1,
    borderWidth: 2,
  },
  profileImg: {
    height: '100%',
    width: '100%',
  },
  profileName: {
    ...AppStyles.textSemiBold,
    fontSize: normalized(18),
    color: AppColors.white.white,
    marginTop: hv(15),
    textAlign: 'center',
  },
  notifImg: {
    width: normalized(25),
    height: normalized(25),
  },
});
