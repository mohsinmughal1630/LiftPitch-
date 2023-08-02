import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SingleVideoComponent from '../Components/SingleVideoComponent';
import {
  ScreenProps,
  deviceHeight,
  vidoesListConstant,
} from '../../../../Utils/AppConstants';

const VideosHomeScreen = (props: ScreenProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetY = e.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(contentOffsetY / deviceHeight);
    setCurrentVideoIndex(currentIndex);
  };
  return (
    <View style={styles.mainContainer}>
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
