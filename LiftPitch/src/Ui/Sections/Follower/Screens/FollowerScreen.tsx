import React, { useState } from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  followersListConstant,
  hv,
  normalized,
  socialInviteType,
} from '../../../../Utils/AppConstants';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppHorizontalMargin, AppStyles } from '../../../../Utils/AppStyles';
import HeaderTab from '../../../Components/CustomTab/HeaderTab';
import CustomSearchBar from '../../../Components/CustomSearchBar/CustomSearchBar';
import LoadingImage from '../../../Components/LoadingImage';
import SocialInviteSection from '../Components/SocialInviteSection';
import ConfirmationModal from '../../../Components/CustomModal/ConfirmationModal';
import { openSettings } from 'react-native-permissions';
import CommonDataManager from '../../../../Utils/CommonManager';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStore } from '../../../../Redux/store/AppStore';
import { setIsLoader } from '../../../../Redux/reducers/AppReducer';
import DeviceContactsListModal from '../../../Components/CustomModal/DeviceContactsListModal';

const FollowerScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: AppRootStore) => state.AppReducer)
  const [selectTab, setSelectedTab] = useState(0);
  const [searchTxt, setSearchTxt] = useState('');
  const [deviceContactsList, setDeviceContactsList] = useState<Array<any>>([]);
  const [showContactsListModal, setShowContactsListModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const inviteSelected = (type: socialInviteType) => {
    console.log('On social invitation ', type);
    if (type == 'contacts') {
      if (deviceContactsList.length > 0) {
        setShowContactsListModal(true);
        return;
      }
      dispatch(setIsLoader(true));
      CommonDataManager.getSharedInstance().fetchDeviceContacts(
        userData?.userId,
        () => {
          dispatch(setIsLoader(false));
          setShowConfirmationModal(true);
        },
        (list) => {
          dispatch(setIsLoader(false))
          setDeviceContactsList(list);
          setShowContactsListModal(true);
          console.log('All firebase users with your contacts here ', list.length);
        })
    }
  }

  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <HeaderTab
        tabTxt1={'Following'}
        tabTxt2={'Followers'}
        selectTab={selectTab}
        atSelectTab={(val: any) => {
          setSelectedTab(val);
        }}
        mainStyle={{ marginTop: normalized(10) }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(35) : hv(30)}>
        <ScrollView
          contentContainerStyle={styles.containerStyle}
          showsVerticalScrollIndicator={false}>
          <CustomSearchBar
            placeHolder={'Search'}
            value={searchTxt}
            atChangeTxt={(txt: any) => {
              setSearchTxt(txt);
            }}
            mainStyle={{ marginVertical: normalized(30) }}
          />
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            showsVerticalScrollIndicator={false}
            data={followersListConstant}
            ListHeaderComponent={() => <SocialInviteSection onPress={inviteSelected} />}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.singleCommentContainer} key={index}>
                  <View style={styles.profileImgBox}>
                    {item.image ? (
                      <LoadingImage
                        source={{ uri: item.image }}
                        viewStyle={{
                          ...styles.profileImgBox,
                          backgroundColor: AppColors.white.bgWhite,
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <Image
                        source={AppImages.bottomBar.Profile}
                        resizeMode="contain"
                        style={styles.placeholderImg}
                      />
                    )}
                  </View>
                  <View style={styles.contentBox}>
                    <View
                      style={[
                        AppStyles.horiCommon,
                        { justifyContent: 'space-between' },
                      ]}>
                      <Text
                        style={[
                          styles.description,
                          { color: AppColors.black.black, marginTop: 0 },
                        ]}>
                        {item.name}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={2}
                      style={styles.msgTxt}>{item.message}</Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      alignSelf: 'center',
                      padding: normalized(5),
                    }}>
                    <Image
                      source={AppImages.Common.LeftArrowIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {showConfirmationModal && (
        <ConfirmationModal
          content={'Kindly enable contacts access from the settings. Do you want to go to settings now?'}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={() => {
            setShowConfirmationModal(false);
            openSettings().catch(e => console.log('some problem ', e));
          }}
        />
      )}
      {showContactsListModal && (
        <DeviceContactsListModal
          onClose={() => setShowContactsListModal(false)}
          list={deviceContactsList}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    marginHorizontal: AppHorizontalMargin,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  dummyTxt: {
    fontSize: normalized(14),
    fontWeight: '500',
    color: AppColors.red.mainColor,
  },

  outerMainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bgContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AppColors.transparentColor,
  },

  headerRow: {
    ...AppStyles.horiCommon,
    justifyContent: 'space-between',
    paddingVertical: normalized(10),
    paddingHorizontal: AppHorizontalMargin,
  },
  title: {
    fontSize: normalized(13),
    color: AppColors.black.black,
    fontWeight: '600',
  },
  endView: {
    height: 35,
    width: 35,
  },
  crossImg: {
    height: 15,
    width: 15,
    tintColor: AppColors.grey.dimGrey,
  },
  commentsMainContainer: {
    flex: 1,
  },
  singleCommentContainer: {
    flexDirection: 'row',
    marginVertical: normalized(10),
    // alignItems: 'center',
    marginHorizontal: normalized(15),
  },
  profileImgBox: {
    backgroundColor: AppColors.red.mainColor,
    height: normalized(30),
    width: normalized(30),
    borderRadius: normalized(30 / 2),
    ...AppStyles.centeredCommon,
  },
  placeholderImg: {
    height: '60%',
    width: '60%',
    tintColor: AppColors.white.white,
  },
  contentBox: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
  },
  description: {
    color: AppColors.grey.grey,
    fontSize: normalized(13),
    fontWeight: '600',
  },
  msgTxt: {
    color: AppColors.black.black,
    fontSize: normalized(12),
    fontWeight: '400',
    marginRight: 5
  },
});
export default FollowerScreen;
