import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  LayoutAnimation,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Text,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {
  AppColors,
  ScreenProps,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsAlertShow,
  setIsLoader,
} from '../../../../Redux/reducers/AppReducer';
import {filterListAndSorted, setUpChat} from '../../../../Utils/Helper';
import {AppStyles} from '../../../../Utils/AppStyles';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import SingleMessageComponent from '../Components/SingleMessageComponent';
import {Routes} from '../../../../Utils/Routes';
import {AppStrings} from '../../../../Utils/Strings';
import CommonDataManager from '../../../../Utils/CommonManager';

const NotificationScreen = (props: ScreenProps) => {
  const isFouced = useIsFocused();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [chatList, setChatList] = useState([]);
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const [searchData, setSearchData] = useState([]);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const toggleEffect = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsShowSearchBar(!isShowSearchBar);
  };
  useEffect(() => {
    if (isFouced) {
      if (!selector.isNetConnected) {
        dispatch(
          setIsAlertShow({
            value: true,
            message: AppStrings.Network.internetError,
          }),
        );
        return;
      }
      dispatch(setIsLoader(true));
      setUpChat((result: any) => {
        dispatch(setIsLoader(false));
      });
    }
  }, []);
  useEffect(() => {
    let newArr: any = [];
    for (let i = 0; i < selector?.threadList?.length; i++) {
      let singleObj = selector?.threadList[i];
      if (singleObj?.lastMessage?.length > 0) {
        newArr.push(singleObj);
      }
    }
    let mList = filterListAndSorted(newArr);
    if (mList?.length > 0) {
      setChatList(mList);
    }
  }, [selector?.threadList]);
  const searchFun = (txt: any) => {
    let newArr = chatList.filter(function (item: any) {
      let otherUserIndex = item.participants.findIndex(
        (value: any) => value.user != selector?.userData?.id,
      );
      if (otherUserIndex != -1) {
        const itemData = item.participants[otherUserIndex].userName
          ? item.participants[otherUserIndex].userName.toUpperCase()
          : ''.toUpperCase();
        const textData = txt.toUpperCase();
        return itemData.indexOf(textData) > -1;
      }
    });
    setSearchData(newArr);
  };

  return (
    <View style={{...AppStyles.MainStyle}}>
      <SafeAreaView />
      <CustomHeader
        // atBackPress={() => {
        //   props?.navigation.goBack();
        // }}
        title={`Message’s`}
        mainStyle={{height: hv(60)}}
        placeHolder={'Search.....'}
        atRightBtn={() => {
          toggleEffect();
          setSearchInput('');
        }}
        atFocus={() => {}}
        atBlur={() => {
          toggleEffect();
          setSearchInput('');
        }}
        isShowSearchBar={isShowSearchBar}
        atChangeTxt={(val: string) => {
          setSearchInput(val);
          searchFun(val);
        }}
        value={searchInput}
        showBorder={true}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hv(3) : hv(30)}>
        <View style={styles.flatListContainer}>
          {chatList?.length > 0 ? (
            <FlatList
              data={searchInput?.length > 0 ? searchData : chatList}
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({item, index}) => {
                if (item?.participants?.length > 0) {
                  let findedIndex = item?.participants.findIndex(
                    (value: any) => value.user == selector?.userData?.userId,
                  );
                  let otherUserIndex = item?.participants.findIndex(
                    (value: any) => value.user != selector?.userData?.userId,
                  );

                  if (findedIndex != -1 && otherUserIndex != -1) {
                    return (
                      <>
                        <SingleMessageComponent
                          index={index}
                          otherUserIndex={otherUserIndex}
                          findedIndex={findedIndex}
                          obj={item}
                          name={CommonDataManager.getSharedInstance().capitalizeFirstLetter(
                            item?.participants[otherUserIndex]?.userName,
                          )}
                          profileImage={
                            item?.participants[otherUserIndex]
                              ?.userProfileImageUrl
                          }
                          msg={item?.lastMessage}
                          item={item}
                          onPress={() => {
                            props.navigation.push(Routes.Chat.chatScreen, {
                              thread: item,
                            });
                          }}
                          onPressProfile={() => {
                            if (item?.participants[otherUserIndex]?.user) {
                              props?.navigation.navigate(
                                Routes.ProfileTab.ProfileScreen,
                                {
                                  userId:
                                    item?.participants[otherUserIndex]?.user,
                                },
                              );
                            }
                          }}
                        />
                        {index !== chatList.length - 1 ? (
                          <View style={styles.bottomLine} />
                        ) : null}
                      </>
                    );
                  }
                }
              }}
            />
          ) : selector?.isLoaderStart ? null : (
            <View style={styles.emptyCont}>
              <Text style={styles.emptyTxt}>No Message Found!</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: AppColors.white.white,
  },
  headerContainer: {
    paddingVertical: hv(17),
  },
  searchInputContainer: {
    marginTop: hv(30),
    marginHorizontal: normalized(18),
    height: normalized(48),
  },
  flatListContainer: {
    flex: 1,
    marginTop: hv(10),
    marginHorizontal: normalized(17),
  },
  bottomLine: {
    height: normalized(1),
    backgroundColor: AppColors.white.whiteOp,
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

export default NotificationScreen;
