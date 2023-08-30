import React, { useState } from 'react';
import { Image, LayoutAnimation, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { AppColors, AppImages, normalized } from '../../../../Utils/AppConstants';
import { AppHorizontalMargin } from '../../../../Utils/AppStyles';

const singleItemWidth = normalized(70);

const VideoCreateHeader = (props: any) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={AppColors.black.black}
        barStyle={'light-content'}
      />
      <TouchableOpacity onPress={props.onClose}>
        <Image source={AppImages.createVideo.CloseIcon} />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.musicContainer}>
        <>
          <Image source={AppImages.createVideo.musicIcon} />
          <Text style={styles.musicTxt}>Sounds</Text>
        </>
      </TouchableOpacity> */}
      {/* <View style={styles.headerRow}>
        < View style={[styles.absoluteBox, {
          left: currentIndex == 0 ? 0 : singleItemWidth,
        }]} />
        {
          ['Photo', 'Video'].map((item, index) => {
            return (
              <TouchableWithoutFeedback key={index} onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setCurrentIndex(index)
              }}>
                <View style={styles.singleBox}>
                  <Text style={styles.singleTxt}>{item}</Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </View> */}
      <TouchableOpacity
        style={styles.switchCameraCont}
        onPress={() => {
          props?.switchCamera(
            props?.cameraStatus == 'front' ? 'back' : 'front',
          );
        }}>
        <>
          <Image source={AppImages.createVideo.FlipIcon} />
          <Text style={styles.switchCameraTxt}>Flip</Text>
        </>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    height: normalized(60),
    width: '100%',
    position: 'absolute',
    justifyContent: 'space-between',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: AppHorizontalMargin,
    marginVertical: AppHorizontalMargin,
    zIndex: 100,
  },
  musicContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicTxt: {
    fontSize: normalized(13),
    fontWeight: '600',
    color: AppColors.white.white,
    paddingStart: normalized(5),
  },
  switchCameraCont: {
    marginTop: normalized(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchCameraTxt: {
    fontSize: normalized(10),
    fontWeight: '600',
    color: AppColors.white.white,
    marginTop: normalized(3),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  singleBox: {
    paddingVertical: 7,
    // paddingHorizontal: 15,
    borderRadius: 10,
    width: singleItemWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  singleTxt: {
    color: AppColors.white.white,
    fontSize: normalized(14),
    fontWeight: '600'
  },
  absoluteBox: {
    backgroundColor: '#4d4d4d',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: singleItemWidth,
    borderRadius: 20
  }
});
export default VideoCreateHeader;
