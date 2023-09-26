import React, {useEffect, useRef, useState} from 'react';
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
import {
  checkUserFollowState,
  fetchFollowingList,
  followNFollowingUser,
  searchUserfromFB,
} from '../../../../Network/Services/ProfileServices';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import ProfilePlaceHolderComp from '../../../Components/ProfileView/ProfilePlaceHolderComp';
import {
  setIsAlertShow,
  setIsLoader,
} from '../../../../Redux/reducers/AppReducer';
import CommonDataManager from '../../../../Utils/CommonManager';
import SocialInviteSection from '../Components/SocialInviteSection';
import ConfirmationModal from '../../../Components/CustomModal/ConfirmationModal';
import DeviceContactsListModal from '../../../Components/CustomModal/DeviceContactsListModal';
import {openSettings} from 'react-native-permissions';
import {AppStrings} from '../../../../Utils/Strings';
import FollowConfirmationModal from '../Components/FollowConfirmationModal';
import SearchModal from '../../../Components/CustomModal/SearchModal';
import useUserManager from '../../../../Hooks/useUserManager';

const FollowerScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const selector = useSelector((AppState: any) => AppState.AppReducer);

  const [showSearchModal, setSearchModal] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const {handleSearch} = useUserManager();

  const [selectTab, setSelectedTab] = useState(0);
  const [searchTxt, setSearchTxt] = useState('');
  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const isFocused = useIsFocused();
  const [deviceContactsList, setDeviceContactsList] = useState<Array<any>>([]);
  const [showContactsListModal, setShowContactsListModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confModal, setConfModal] = useState({
    value: false,
    data: null,
    type: '',
  });

  useEffect(() => {
    if (isFocused) {
      fetchUserFollowingList();
    }
  }, [isFocused]);

  const fetchUserFollowingList = async () => {
    if (!selector?.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      return;
    }
    if (!selector?.isLoaderStart) {
      dispatch(setIsLoader(true));
    }
    await fetchFollowingList(selector?.userData?.userId, (response: any) => {
      if (response?.follower?.length > 0) {
        let newArr: any = [];
        for (let i = 0; i < response?.follower?.length; i++) {
          let singleItem = response?.follower[i];
          checkUserFollowState(
            selector?.userData?.userId,
            singleItem?.id,
            (result: any) => {
              newArr.push({
                ...singleItem,
                isFollow: result,
              });
              if (i == response?.follower?.length - 1) {
                setFollowerData(newArr);
              }
            },
          );
        }
      } else {
        setFollowerData([]);
      }
      if (response?.following?.length > 0) {
        let newArr: any = [];
        for (let i = 0; i < response?.following?.length; i++) {
          let singleItem = response?.following[i];
          newArr.push({
            ...singleItem,
            isFollow: true,
          });
        }
        setFollowingData(newArr);
      } else {
        setFollowingData([]);
      }
      setTimeout(() => {
        dispatch(setIsLoader(false));
      }, 1000);
    });
  };

  const inviteSelected = (type: socialInviteType) => {
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
  //follow and Unfollow Functionality
  const followNfollowerFun = async (obj: any) => {
    if (!selector?.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      return;
    }
    dispatch(setIsLoader(true));
    let followingObj = {
      id: selector?.userData?.userId,
      userName: selector?.userData?.userName,
      description: selector?.userData?.companyType,
      profile: selector?.userData?.companyLogo,
    };
    let followerObj = {
      id: obj?.id,
      userName: obj?.userName,
      description: obj?.description,
      profile: obj?.profile,
    };

    await followNFollowingUser(
      followingObj,
      followerObj,
      obj?.isFollow ? 'remove' : 'add',
      (response: any) => {
        setTimeout(async () => {
          await fetchUserFollowingList();
          dispatch(setIsLoader(false));
        }, 2000);
      },
    );
  };

  ////

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
        style={{flex: 1, marginHorizontal: AppHorizontalMargin}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(35) : hv(30)}>
        <CustomSearchBar
          placeHolder={'Search'}
          atPress={() => {
            setSearchModal(true);
          }}
          mainStyle={{
            marginVertical: normalized(10),
          }}
        />

        <FlatList
          data={[1, 2, 3, 4]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return index == 2 ? (
              <>
                <SocialInviteSection onPress={inviteSelected} />
                {(selectTab == 0 && followingData?.length > 0) ||
                (selectTab == 1 && followerData?.length > 0) ? (
                  <FlatList
                    keyExtractor={(item, index) => `${index}`}
                    showsVerticalScrollIndicator={false}
                    data={selectTab == 0 ? followingData : followerData}
                    renderItem={({item, index}: any) => {
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
                                name={
                                  item?.userName ? item?.userName : 'Testing'
                                }
                                mainStyles={styles.profileImgBox}
                                nameStyles={{
                                  fontSize: normalized(16),
                                  ...AppStyles.textMedium,
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
                                  {
                                    color: AppColors.black.black,
                                    marginTop: 0,
                                  },
                                ]}>
                                {CommonDataManager.getSharedInstance().capitalizeFirstLetter(
                                  item?.userName,
                                )}
                              </Text>
                            </View>
                            <Text style={styles.msgTxt}>
                              {item?.description}
                            </Text>
                          </View>
                          {/* {selectTab == 1 ? ( */}
                          <TouchableOpacity
                            activeOpacity={1}
                            style={styles.followBtn}
                            onPress={() => {
                              setConfModal({
                                value: true,
                                data: item,
                                type: item?.isFollow ? 'remove' : 'add',
                              });
                              // followNfollowerFun(item);
                            }}>
                            <Text style={styles.followBtnTxt}>
                              {item?.isFollow ? `Following` : `Follow`}
                            </Text>
                          </TouchableOpacity>
                          {/* ) : null} */}
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
              </>
            ) : null;
          }}
        />
      </KeyboardAvoidingView>
      {showSearchModal ? (
        <SearchModal
          placeHold={'Search User...'}
          onClose={() => {
            setSearchModal(false);
          }}
          searchTxt={searchTxt}
          atSearch={async (val: any) => {
            if (val?.length > 3) {
              await handleSearch(val, (response: any) => {
                setSearchResult(response);
              });
            } else if (val?.length == 0) {
              setSearchResult([]);
            }
            setSearchTxt(val);
          }}
          list={searchResult}
          atUserCellPress={(val: any) => {
            if (val?.userId) {
              props?.navigation.navigate(Routes.ProfileTab.ProfileScreen, {
                userId: val?.userId,
              });
              setSearchResult([]);
              setSearchTxt('');
              setSearchModal(false);
            }
          }}
        />
      ) : null}
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
      {confModal?.value ? (
        <FollowConfirmationModal
          onClose={() => {
            setConfModal({
              value: false,
              data: null,
              type: '',
            });
          }}
          type={confModal?.type}
          data={confModal?.data}
          atRightBtnPress={async () => {
            followNfollowerFun(confModal?.data);
            await setConfModal({
              value: false,
              data: null,
              type: '',
            });
          }}
        />
      ) : null}
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
    ...AppStyles.textMedium,
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
    ...AppStyles.textBold,
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
    ...AppStyles.textSemiBold,
  },
  msgTxt: {
    color: AppColors.black.black,
    fontSize: normalized(12),
    ...AppStyles.textRegular,
  },
  emptyCont: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTxt: {
    fontSize: normalized(14),
    color: AppColors.black.black,
    ...AppStyles.textMedium,
  },
  followBtnTxt: {
    fontSize: normalized(12),
    ...AppStyles.textMedium,
    color: AppColors.white.white,
  },
  followBtn: {
    backgroundColor: AppColors.red.mainColor,
    paddingHorizontal: normalized(10),
    paddingVertical: normalized(8),
    borderRadius: normalized(5),
  },
});
export default FollowerScreen;
