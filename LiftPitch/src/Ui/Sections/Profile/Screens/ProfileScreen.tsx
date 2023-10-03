import React, {useEffect, useRef, useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  ScreenSize,
  hv,
  isSmallDevice,
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
  updateRecentVisitedUser,
} from '../../../../Network/Services/ProfileServices';
import ThreadManager from '../../../../ChatModule/ThreadManger';
import {Routes} from '../../../../Utils/Routes';
import {makeObjForChat} from '../../../../Utils/Helper';
import CommonDataManager from '../../../../Utils/CommonManager';
import FollowConfirmationModal from '../../Follower/Components/FollowConfirmationModal';
import useUserManager from '../../../../Hooks/useUserManager';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import moment from 'moment';
import ProfilePlaceHolderComp from '../../../Components/ProfileView/ProfilePlaceHolderComp';
import BarGraph from '../Components/BarGraph';
import CurveGraph from '../Components/CurveGraph';
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
      if (!props?.route?.params?.userId) {
        dispatch(
          setIsAlertShow({
            value: true,
            message: AppStrings.Network.recordNotFound,
          }),
        );
        return;
      }
      dispatch(setIsLoader(true));
      getOtherUserProfile(
        props?.route?.params?.userId,
        async (response: any) => {
          await checkUserFollowState(
            userData?.userId,
            props?.route?.params?.userId,
            (result: any) => {
              setIsFollow(result);
            },
          );
          let currentDate = moment
            .utc(new Date())
            .format(ThreadManager.instance.dateFormater.fullDate);
          let newObj = {
            userId: selector?.userData?.userId,
            userName: selector?.userData?.userName,
            profile: selector?.userData?.companyLogo,
            role: selector?.userData?.companyType,
            visitedDateTime: currentDate,
          };
          let recentViewer: any =
            response?.recentVisitor?.length > 0
              ? [...response?.recentVisitor, newObj]
              : [newObj];
          let updatedArr = recentViewer.filter((obj: any, index: any) => {
            return (
              index ===
              recentViewer.findIndex((o: any) => obj.userId === o.userId)
            );
          });
          await updateRecentVisitedUser(updatedArr, response?.userId);
          setData({...response, recentVisitor: updatedArr});
          setTimeout(() => {
            dispatch(setIsLoader(false));
          }, 1000);
        },
      );

      setProfileType(USER_TYPE.otherUser);
    } else {
      getOtherUserProfile(userData?.userId, async (response: any) => {
        setData(response);
      });
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
      <SafeAreaView style={{backgroundColor: AppColors.red.mainColor}} />
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
                ) : selectedTab == 'Analytics' ? (
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      flex: 1,
                      width: ScreenSize.width,
                      paddingHorizontal: normalized(30),
                    }}>
                    <FlatList
                      data={[0, 1]}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({index}) => {
                        return index == 0 ? <BarGraph /> : <CurveGraph />;
                      }}
                    />
                  </View>
                ) : selectedTab == 'Info' ? (
                  <View>
                    <Image source={AppImages.profile.infoImage} />
                    <Text style={styles.userTxt}>Users</Text>
                    <FlatList
                      data={data?.recentVisitor}
                      keyExtractor={(item, index) => `${index}`}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                              props?.navigation.push(
                                Routes.ProfileTab.ProfileScreen,
                                {
                                  userId: item?.userId,
                                },
                              );
                            }}
                            style={styles.userSingleItem}>
                            <View style={styles.userOuterCont}>
                              <View style={styles.userInnerCont}>
                                {item?.profile?.length > 0 ? (
                                  <AppImageViewer
                                    source={{uri: item?.profile}}
                                    placeHolder={AppImages.bottomBar.Profile}
                                    style={styles.img}
                                  />
                                ) : (
                                  <ProfilePlaceHolderComp
                                    index={index}
                                    name={item?.userName ? item?.userName : ''}
                                    mainStyles={styles.img}
                                    nameStyles={{
                                      fontSize: normalized(16),
                                      ...AppStyles.textMedium,
                                    }}
                                  />
                                )}
                                <View style={{marginStart: normalized(10)}}>
                                  <Text style={styles.userNameTxt}>
                                    {item?.userName}
                                  </Text>
                                  <Text style={styles.roleTxt}>
                                    {item?.role}
                                  </Text>
                                </View>
                              </View>
                              <Image source={AppImages.profile.rightArrow} />
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : null}
              </View>
            ) : null;
          }}
        />
        {profifleType == USER_TYPE.owner ? null : (
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
    marginBottom: isSmallDevice || Platform.OS == 'android' ? 10 : 20,
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
  img: {
    height: normalized(40),
    width: normalized(40),
    borderRadius: normalized(40 / 2),
  },
  userTxt: {
    fontSize: normalized(15),
    fontWeight: '600',
    color: AppColors.black.black,
    marginVertical: normalized(15),
  },
  userSingleItem: {
    padding: normalized(15),
    borderRadius: normalized(15),
    width: '97%',
    backgroundColor: AppColors.white.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: normalized(5),
  },
  userOuterCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInnerCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameTxt: {
    fontSize: normalized(13),
    fontWeight: '500',
    color: AppColors.black.black,
    marginVertical: normalized(3),
  },
  roleTxt: {
    fontSize: normalized(13),
    fontWeight: '500',
    color: AppColors.black.light,
  },
});
export default ProfileScreen;
