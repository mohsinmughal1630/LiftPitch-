import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
} from 'react-native';
import {AppImages, normalized} from '../../../../Utils/AppConstants';
const SingleVideoItem = ({item, onPlay}) => {
  // const [loading, setLoading] = useState(true);
  return (
    <ImageBackground
      style={{
        ...style.mainView,
      }}
      source={{uri: item?.thumbnail}}>
      <View
        style={{
          ...style.backView,
        }}>
        {/* <VideoPlayer
          video={{
            uri: item.videoUrl,
          }}
          style={{
            ...style.innerView,
          }}
        /> */}
      </View>
      <View
        style={{
          ...style.innerView,
        }}>
        <TouchableWithoutFeedback onPress={() => onPlay()}>
          <Image
            style={{
              ...style.playButtonStyle,
            }}
            source={AppImages.Videos.Play}
          />
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
};
const style = StyleSheet.create({
  mainView: {
    height: 200,
    width: 200,
    backgroundColor: 'black',
    borderRadius: 10,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  innerView: {
    // flex: 1,
    height: normalized(200),
    width: normalized(200),
    // backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonStyle: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    // backgroundColor: "black",
  },
  backView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loaderView: {
    position: 'absolute',
    zIndex: 1,
    elevation: 3,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SingleVideoItem;
