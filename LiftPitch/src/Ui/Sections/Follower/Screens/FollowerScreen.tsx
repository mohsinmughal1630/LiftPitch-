import React, {useEffect, useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  commentsConstants,
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
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';
import HeaderTab from '../../../Components/CustomTab/HeaderTab';
import CustomSearchBar from '../../../Components/CustomSearchBar/CustomSearchBar';
import {Routes} from '../../../../Utils/Routes';
import {fetchFollowingList} from '../../../../Network/Services/ProfileServices';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import ProfilePlaceHolderComp from '../../../Components/ProfileView/ProfilePlaceHolderComp';
import {setIsLoader} from '../../../../Redux/reducers/AppReducer';
import CommonDataManager from '../../../../Utils/CommonManager';
import SocialInviteSection from '../Components/SocialInviteSection';
import ConfirmationModal from '../../../Components/CustomModal/ConfirmationModal';
import DeviceContactsListModal from '../../../Components/CustomModal/DeviceContactsListModal';
import {openSettings} from 'react-native-permissions';

const FollowerScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const [selectTab, setSelectedTab] = useState(0);
  const [searchTxt, setSearchTxt] = useState('');
  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const isFocused = useIsFocused();
  const [deviceContactsList, setDeviceContactsList] = useState<Array<any>>([]);
  const [showContactsListModal, setShowContactsListModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(setIsLoader(true));
      fetchFollowingList(selector?.userData?.userId, (response: any) => {
        if (response?.follower) {
          setFollowerData(response?.follower);
        }
        if (response?.following) {
          setFollowingData(response?.following);
        }
        setTimeout(() => {
          dispatch(setIsLoader(false));
        }, 1000);
      });
    }
  }, [isFocused]);

  const inviteSelected = (type: socialInviteType) => {
    console.log('On social invitation ', type);
    if (type == 'contacts') {
      if (deviceContactsList.length > 0) {
        setShowContactsListModal(true);
        return;
      }
      dispatch(setIsLoader(true));
      CommonDataManager.getSharedInstance().fetchDeviceContacts(
        selector?.userData?.userId,
        () => {
          dispatch(setIsLoader(false));
          setShowConfirmationModal(true);
        },
        list => {
          dispatch(setIsLoader(false));
          setDeviceContactsList(list);
          setShowContactsListModal(true);
          console.log(
            'All firebase users with your contacts here ',
            list.length,
          );
        },
      );
    }
  };

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
        mainStyle={{marginTop: normalized(10)}}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
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
            mainStyle={{marginVertical: normalized(30)}}
          />
          <SocialInviteSection onPress={inviteSelected} />
          {(selectTab == 0 && followingData?.length > 0) ||
          (selectTab == 1 && followerData?.length > 0) ? (
            <FlatList
              keyExtractor={(item, index) => `${index}`}
              showsVerticalScrollIndicator={false}
              data={selectTab == 0 ? followingData : followerData}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.singleCommentContainer}
                    key={index}
                    onPress={() => {
                      let userId = item?.userId
                        ? item?.userId
                        : item?.id
                        ? item?.id
                        : null;
                      if (userId) {
                        props?.navigation.navigate(
                          Routes.ProfileTab.ProfileScreen,
                          {
                            userId: userId,
                          },
                        );
                      }
                    }}>
                    <View style={styles.profileImgBox}>
                      {item?.profile ? (
                        <AppImageViewer
                          source={{uri: item?.profile}}
                          placeHolder={AppImages.bottomBar.Profile}
                          style={{
                            ...styles.profileImgBox,
                            backgroundColor: AppColors.white.bgWhite,
                          }}
                        />
                      ) : (
                        <ProfilePlaceHolderComp
                          index={index}
                          name={item?.userName ? item?.userName : 'Testing'}
                          mainStyles={styles.profileImgBox}
                          nameStyles={{
                            fontSize: normalized(16),
                            fontWeight: '500',
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.contentBox}>
                      <View
                        style={[
                          AppStyles.horiCommon,
                          {justifyContent: 'space-between'},
                        ]}>
                        <Text
                          style={[
                            styles.description,
                            {color: AppColors.black.black, marginTop: 0},
                          ]}>
                          {item.userName}
                        </Text>
                      </View>
                      <Text style={styles.msgTxt}>{item?.description}</Text>
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
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View style={styles.emptyCont}>
              <Text style={styles.emptyTxt}>
                {`No ${selectTab == 0 ? 'Following' : 'Followers'} Found`}
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      {showConfirmationModal && (
        <ConfirmationModal
          content={
            'Kindly enable contacts access from the settings. Do you want to go to settings now?'
          }
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
  },
  emptyCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTxt: {
    fontSize: normalized(14),
    color: AppColors.black.black,
    fontWeight: '500',
  },
});
export default FollowerScreen;
