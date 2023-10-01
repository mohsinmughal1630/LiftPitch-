import React, {useEffect, useRef, useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
  profileTabArr,
  profileTabArrForOtherUser,
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
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import {
  setIsAlertShow,
  setIsLoader,
} from '../../../../Redux/reducers/AppReducer';
import ProfileHeader from '../../../Components/CustomHeader/ProfileHeader';
import {AppStrings, USER_TYPE} from '../../../../Utils/Strings';
import ProfileCustomTab from '../../../Components/CustomTab/ProfileCustomTab';
import {
  checkUserFollowState,
  followNFollowingUser,
  getOtherUserProfile,
} from '../../../../Network/Services/ProfileServices';
import ThreadManager from '../../../../ChatModule/ThreadManger';
import {Routes} from '../../../../Utils/Routes';
import {makeObjForChat} from '../../../../Utils/Helper';
import CommonDataManager from '../../../../Utils/CommonManager';
import FollowConfirmationModal from '../../Follower/Components/FollowConfirmationModal';
import useUserManager from '../../../../Hooks/useUserManager';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
const ProfileScreen = (props: ScreenProps) => {
  const [feeds, setFeeds] = useState([]);
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const params = props?.route?.params;
  const {fetchUserFeed} = useUserManager();
  const threadRef = useRef(null);
  const [profifleType, setProfileType] = useState('');
  const dispatch = useDispatch();
  const [isFollow, setIsFollow] = useState(false);
  const [data, setData] = useState<any>(null);
  const {userData} = useSelector((state: AppRootStore) => state.AppReducer);
  const [selectedTab, setSelectedTab] = useState('Feed');
  const [confModal, setConfModal] = useState<any>({
    value: false,
    data: null,
    type: '',
  });

  useEffect(() => {
    if (params?.userId && params?.userId != userData?.userId) {
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
      getOtherUserProfile(props?.route?.params?.userId, (response: any) => {
        dispatch(setIsLoader(false));
        setData(response);
      });
      checkUserFollowState(
        userData?.userId,
        props?.route?.params?.userId,
        (result: any) => {
          setIsFollow(result);
        },
      );
      setProfileType(USER_TYPE.otherUser);
    } else {
      setData(userData);
      setProfileType(USER_TYPE.owner);
    }
    params?.userId || userData?.userId
      ? fetchUserFeeds(params?.userId || userData?.userId)
      : null;
  }, []);
  const fetchUserFeeds = async (uId: any) => {
    if (!selector?.isLoaderStart) {
      dispatch(setIsLoader(true));
    }
    await fetchUserFeed(uId, (result: any) => {
      dispatch(setIsLoader(false));
      setFeeds(result);
    });
  };
  const goToChat = async () => {
    if (!selector?.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      return;
    }
    let threadObj = null;
    ThreadManager.instance.checkIsConnectionExist(
      userData?.userId,
      props?.route?.params?.userId,
      (threadData: any) => {
        threadObj = threadData;
      },
    );

    if (threadObj) {
      props?.navigation.navigate(Routes.Chat.chatScreen, {
        thread: threadObj,
      });
    } else {
      let senderObj: any = {};
      let reciverObj: any = {};
      senderObj = makeObjForChat(selector?.userData);
      reciverObj = makeObjForChat(data);

      ThreadManager.instance.setupRedux(selector, dispatch);
      dispatch(setIsLoader(true));
      let msg = '';
      let docId = ThreadManager.instance.makeid(7);
      await ThreadManager.instance.onSendCall(
        senderObj,
        reciverObj,
        docId,
        msg,
        async (data: any) => {
          dispatch(setIsLoader(false));
          if (data != 'error') {
            threadRef.current = data;
            dispatch(setIsLoader(true));
            ThreadManager.instance.acceptParticipation(
              docId,
              reciverObj?.id,
              (obj: any) => {
                dispatch(setIsLoader(false));
                props?.navigation.push(Routes.Chat.chatScreen, {
                  thread: obj,
                });
              },
            );
          } else {
            alert(JSON.stringify(data));
          }
        },
      );
    }
  };

  const followNfollowerFun = async () => {
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
      id: userData?.userId,
      userName: userData?.userName,
      description: userData?.companyType,
      profile: userData?.companyLogo,
    };
    let followerObj = {
      id: data?.userId,
      userName: data?.userName,
      description: data?.companyType,
      profile: data?.companyLogo,
    };

    await followNFollowingUser(
      followingObj,
      followerObj,
      isFollow ? 'remove' : 'add',
      (response: any) => {
        setTimeout(() => {
          dispatch(setIsLoader(false));
          setIsFollow(!isFollow);
        }, 3000);
      },
    );
  };
  return (
    <View style={AppStyles.MainStyle}>
      <SafeAreaView />
      <ProfileHeader
        atBackPress={() => {
          props?.navigation?.goBack();
        }}
        profileType={profifleType}
        data={data}
        isFollow={isFollow}
        atRightBtn={() => {
          if (profifleType == USER_TYPE.owner) {
            props?.navigation?.navigate(Routes.Setting.settingScreen);
          } else {
            setConfModal({
              value: true,
              data: {
                id: data?.userId,
                userName: data?.userName,
                description: data?.companyType,
                profile: data?.companyLogo,
              },
              type: isFollow ? 'remove' : 'add',
            });
          }
        }}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(35) : hv(30)}>
        <FlatList
          contentContainerStyle={styles.containerStyle}
          data={[1, 2, 3, 4]}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}: any) => {
            return index == 1 ? (
              <ProfileCustomTab
                mainStyle={{marginVertical: normalized(20)}}
                list={
                  profifleType == USER_TYPE.owner
                    ? profileTabArr
                    : profileTabArrForOtherUser
                }
                selectTab={selectedTab}
                atSelectTab={(el: any) => {
                  setSelectedTab(el?.txt);
                }}
              />
            ) : index == 2 ? (
              <View style={{flex: 1}}>
                {selectedTab == 'Feed' ? (
                  <FlatList
                    numColumns={3}
                    data={feeds}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({item, index}: any) => {
                      return (
                        <TouchableOpacity
                          style={styles.singleCont}
                          activeOpacity={1}
                          onPress={() => {
                            let newArr = feeds.slice(index, feeds?.length);

                            props?.navigation?.navigate(
                              Routes.HomeTab.feedScreen,
                              {
                                data: newArr,
                              },
                            );
                          }}>
                          <AppImageViewer
                            source={{
                              uri: item?.photoUrl
                                ? item?.photoUrl
                                : item?.thumbnail,
                            }}
                            placeHolder={AppImages.bottomBar.Profile}
                            style={styles.singleFeedStyle}
                          />
                          {item?.videoUrl ? (
                            <Image
                              source={AppImages.Videos.Play}
                              style={styles.playIcon}
                            />
                          ) : null}
                        </TouchableOpacity>
                      );
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: normalized(12),
                      ...AppStyles.textRegular,
                    }}>
                    {selectedTab}
                  </Text>
                )}
              </View>
            ) : null;
          }}
        />
        {profifleType == USER_TYPE.owner ? null : (
          // <TouchableOpacity
          //   style={styles.bottomBtn}
          //   onPress={() => {
          //     // if (profifleType == USER_TYPE.owner) {
          //     //   logoutClicked();
          //     // } else {
          //     goToChat();
          //     // }
          //   }}>
          //   <Text style={styles.bottomBtnTxt}>
          //     {profifleType == USER_TYPE.owner
          //       ? 'LogOut'
          //       : `Chat with ${CommonDataManager.getSharedInstance().capitalizeFirstLetter(
          //           data?.userName,
          //         )}`}
          //   </Text>
          // </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomBtn}
            onPress={() => {
              goToChat();
            }}>
            <Text style={styles.bottomBtnTxt}>
              {`Chat with ${CommonDataManager.getSharedInstance().capitalizeFirstLetter(
                data?.userName,
              )}`}
            </Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
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
          atRightBtnPress={() => {
            followNfollowerFun();
            setConfModal({
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
    alignItems: 'center',
  },
  containerStyle: {
    marginHorizontal: AppHorizontalMargin,
    flex: 1,
    alignItems: 'center',
  },
  dummyTxt: {
    fontSize: normalized(14),
    ...AppStyles.textMedium,
    color: AppColors.red.mainColor,
  },
  bottomBtn: {
    backgroundColor: AppColors.red.mainColor,
    borderColor: AppColors.grey.gray,
    borderWidth: 1,
    height: normalized(35),
    borderRadius: normalized(5),
    justifyContent: 'center',
    alignItems: 'center',
    margin: normalized(5),
    alignSelf: 'center',
    paddingHorizontal: normalized(10),
  },
  bottomBtnTxt: {
    color: AppColors.white.white,
    fontSize: normalized(13),
    ...AppStyles.textMedium,
  },
  singleCont: {
    backgroundColor: AppColors.white.white,
    height: normalized(99),
    width: normalized(99),
    borderWidth: normalized(1),
    borderColor: AppColors.black.light,
    borderRadius: normalized(6),
    margin: normalized(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleFeedStyle: {
    height: normalized(99),
    width: normalized(99),
    borderRadius: normalized(6),
    backgroundColor: AppColors.white.bgWhite,
  },
  playIcon: {
    position: 'absolute',
    height: normalized(20),
    width: normalized(20),
    tintColor: AppColors.white.white,
  },
});
export default ProfileScreen;
