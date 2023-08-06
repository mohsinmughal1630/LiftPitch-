import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SingleVideoComponent from '../Components/SingleVideoComponent';
import {
  ScreenProps,
  deviceHeightwithOutBar,
  vidoesListConstant,
} from '../../../../Utils/AppConstants';
import VideoHeaderSection from '../Components/VideoHeaderSection';

const VideosHomeScreen = (props: ScreenProps) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetY = e.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(contentOffsetY / deviceHeightwithOutBar);
    setCurrentVideoIndex(currentIndex);
  };
  return (
    <View style={styles.mainContainer}>
      <VideoHeaderSection
        selectedTab={selectedTab}
        atSelectTab={(val: any) => {}}
        atSearchBtnPress={() => {}}
      />
      <FlatList
        data={vidoesListConstant}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item, index}) => (
          <SingleVideoComponent
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
