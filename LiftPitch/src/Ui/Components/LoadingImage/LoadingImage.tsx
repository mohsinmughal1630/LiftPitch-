import React, {useState} from 'react';
import {
  ActivityIndicator,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {ResizeMode} from 'react-native-fast-image';
import {AppColors} from '../../../Utils/AppConstants';

interface Props {
  uri: any;
  containerStyle: ViewStyle;
  imageStyle?: ImageStyle | any;
  resizeMode?: ResizeMode;
  onError?: () => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  loaderColor?: string;
}

const LoadingImage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View
      style={[
        {
          overflow: 'hidden',
        },
        props.containerStyle,
        ,
      ]}>
      <FastImage
        style={[styles.img, props?.imageStyle]}
        source={{
          uri: props.uri,
          priority: FastImage.priority.normal,
        }}
        onLoadStart={() => {
          setIsLoading(true);
          if (props.onLoadStart) {
            props.onLoadStart();
          }
        }}
        onLoadEnd={() => {
          setIsLoading(false);
          if (props.onLoadEnd) {
            props.onLoadEnd();
          }
        }}
        onError={() => {
          setIsLoading(false);
          if (props.onError) {
            props.onError();
          }
          if (props.onLoadEnd) {
            props.onLoadEnd();
          }
        }}
        resizeMode={
          props.resizeMode ? props.resizeMode : FastImage.resizeMode.contain
        }
      />
      {isLoading && (
        <View style={styles.absoluteView}>
          <ActivityIndicator
            size={'small'}
            color={
              props.loaderColor ? props.loaderColor : AppColors.dark.darkLevel1
            }
          />
        </View>
      )}
    </View>
  );
};

export default LoadingImage;

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: '100%',
  },
  absoluteView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 200,
  },
});
