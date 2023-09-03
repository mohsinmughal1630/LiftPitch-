import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SingleVideoComponent from '../Components/SingleVideoComponent';
import {
  AppColors,
  AppFonts,
  ScreenProps,
  deviceHeightwithOutBar,
  normalized,
} from '../../../../Utils/AppConstants';
import VideoHeaderSection from '../Components/VideoHeaderSection';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsAlertShow,
  setIsLoader,
  setUserData,
} from '../../../../Redux/reducers/AppReducer';
import {AppStrings} from '../../../../Utils/Strings';
import {
  getUpdatedVideoListing,
  getVideoListSize,
} from '../../../../Network/Services/VideoListingServices';
import CommonDataManager from '../../../../Utils/CommonManager';
import {getOtherUserProfile} from '../../../../Network/Services/ProfileServices';
import {saveUserData} from '../../../../Utils/AsyncStorage';

const VideosHomeScreen = (props: ScreenProps) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTxt, setSearchTxt] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const counter = useRef(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [videoList, setVideoList] = useState([]);
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetY = e.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(contentOffsetY / deviceHeightwithOutBar);
    setCurrentVideoIndex(currentIndex);
  };

  useEffect(() => {
    if (isFocused) {
      initialFun();
    }
  }, []);
  const initialFun = async () => {
    dispatch(setIsLoader(true));
    await getOtherUserProfile(
      selector?.userData?.userId,
      async (response: any) => {
        if (response) {
          dispatch(setUserData(response));
          await fetchVideoListing(0, response);
          if (selector?.isPersisterUser) {
            await saveUserData(response);
          }
        }
      },
    );
  };

  const fetchVideoListing = async (tabValue?: any, currentUserData?: any) => {
    if (!selector?.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      return;
    }
    try {
      if (counter?.current == 1 && !selector?.isLoaderStart) {
        dispatch(setIsLoader(true));
      }

      await getUpdatedVideoListing(
        currentUserData,
        tabValue != undefined ? tabValue : selectedTab,
        pageSize,
        counter.current,
        async (onResponse: any) => {
          if (onResponse?.length > 0) {
            await getVideoListSize((result: any) => {
              let pageLimit =
                CommonDataManager.getSharedInstance().paginationLogic(
                  result,
                  pageSize,
                );
              setTotalPages(pageLimit);
            });
          }

          if (onResponse?.length > 0) {
            let arr: any = counter.current == 1 ? [] : [...videoList];
            if (counter.current == 1) {
              arr = onResponse;
            } else {
              arr.push(...onResponse);
            }
            const newArr: any = arr.filter((obj: any, index: any) => {
              return (
                index === arr.findIndex((o: any) => obj?.videoId === o?.videoId)
              );
            });
            setVideoList(newArr);
          }
        },
      );
    } catch (e) {
      console.log('error video listing----> ', e);
    } finally {
      dispatch(setIsLoader(false));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <VideoHeaderSection
        selectedTab={selectedTab}
        onTabSelect={(val: any) => {
          setSelectedTab(val);
          fetchVideoListing(val, selector?.userData);
        }}
        searchTxt={searchTxt}
        onSearchChange={setSearchTxt}
      />
      {videoList?.length > 0 ? (
        <FlatList
          data={videoList}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={updateCurrentSlideIndex}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <SingleVideoComponent
                navigation={props?.navigation}
                item={item}
                key={index}
                index={index}
                currentVideoIndex={currentVideoIndex}
              />
            );
          }}
          onEndReachedThreshold={0.05}
          onEndReached={async () => {
            if (counter.current < totalPages) {
              counter.current = counter.current + 1;
              await fetchVideoListing(selectedTab, selector?.userData);
            }
          }}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  marginBottom: 10,
                }}>
                {counter.current < totalPages && videoList?.length > 0 ? (
                  <ActivityIndicator
                    size={'large'}
                    color={AppColors.red.mainColor}
                  />
                ) : null}
              </View>
            );
          }}
        />
      ) : selector?.isLoaderStart ? null : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: normalized(14),
              fontWeight: '400',
            }}>
            No feeds found!
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
export default VideosHomeScreen;
