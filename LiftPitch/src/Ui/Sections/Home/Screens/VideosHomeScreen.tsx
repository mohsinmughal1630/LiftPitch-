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
} from '../../../../Redux/reducers/AppReducer';
import {AppStrings} from '../../../../Utils/Strings';
import {
  getUpdatedVideoListing,
  getVideoListSize,
} from '../../../../Network/Services/VideoListingServices';
import CommonDataManager from '../../../../Utils/CommonManager';

const VideosHomeScreen = (props: ScreenProps) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTxt, setSearchTxt] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const counter = useRef(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [videoList, setVideoList] = useState([]);
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetY = e.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(contentOffsetY / deviceHeightwithOutBar);
    setCurrentVideoIndex(currentIndex);
  };

  useEffect(() => {
    if (isFocused) {
      fetchVideoListing();
    }
  }, []);

  const fetchVideoListing = async () => {
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
      if (counter?.current == 1) {
        dispatch(setIsLoader(true));
      }
      await getUpdatedVideoListing(
        selector?.userData?.userId,
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
            setVideoList(arr);
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
        onTabSelect={setSelectedTab}
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
              await fetchVideoListing();
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
