import React, { useState } from 'react';
import { Image, LayoutAnimation, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { AppColors, AppImages, normalized } from '../../../../Utils/AppConstants';
import { AppHorizontalMargin } from '../../../../Utils/AppStyles';

const VideoCreateHeader = (props: any) => {
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
      {
        !props.isVideoRecording &&
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
      }
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
});
export default VideoCreateHeader;
