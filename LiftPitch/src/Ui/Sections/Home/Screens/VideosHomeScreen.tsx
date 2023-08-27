import React, {useState} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import SingleVideoComponent from '../Components/SingleVideoComponent';
import {
  ScreenProps,
  deviceHeightwithOutBar,
  vidoesListConstant,
} from '../../../../Utils/AppConstants';
import VideoHeaderSection from '../Components/VideoHeaderSection';

const VideosHomeScreen = (props: ScreenProps) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [searchTxt, setSearchTxt] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetY = e.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(contentOffsetY / deviceHeightwithOutBar);
    setCurrentVideoIndex(currentIndex);
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
      <FlatList
        data={vidoesListConstant}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item, index}) => (
          <SingleVideoComponent
            navigation={props?.navigation}
            item={item}
            key={item.id}
            index={index}
            currentVideoIndex={currentVideoIndex}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
export default VideosHomeScreen;
