import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SingleVideoComponent from '../Components/SingleVideoComponent';
import {
  AppColors,
  AppImages,
  ScreenProps,
  deviceHeight,
  deviceHeightwithOutBar,
  normalized,
} from '../../../../Utils/AppConstants';
import {useSelector} from 'react-redux';
import {AppHorizontalMargin, AppStyles} from '../../../../Utils/AppStyles';

const FeedListingScreen = (props: ScreenProps) => {
  const list = props?.route?.params?.data;

  const selector = useSelector((AppState: any) => AppState.AppReducer);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetY = e.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(contentOffsetY / deviceHeightwithOutBar);
    setCurrentVideoIndex(currentIndex);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />

      <TouchableOpacity
        style={styles.mainHeaderStyles}
        onPress={() => {
          props?.navigation?.goBack();
        }}>
        <Image
          source={AppImages.Auth.backIcon}
          style={{tintColor: AppColors.white.white}}
        />
      </TouchableOpacity>
      {list?.length > 0 ? (
        <FlatList
          data={list}
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
                mainStyle={{
                  backgroundColor: AppColors.black.black,
                  height:
                    Platform.OS == 'android'
                      ? Dimensions.get('screen').height -
                        Dimensions.get('screen').height -
                        Dimensions.get('window').height
                      : deviceHeight,
                }}
              />
            );
          }}
        />
      ) : selector.isLoaderStart ? null : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: normalized(14),
              ...AppStyles.textRegular,
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
  mainHeaderStyles: {
    position: 'absolute',
    marginVertical: normalized(30),
    zIndex: 100,
    padding: AppHorizontalMargin,
  },
});
export default FeedListingScreen;
