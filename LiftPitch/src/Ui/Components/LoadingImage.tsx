import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  ImageRequireSource,
  ViewStyle,
} from 'react-native';
import FastImage, {ImageStyle, ResizeMode} from 'react-native-fast-image';
import {Source} from 'react-native-fast-image';
import {AppColors} from '../../Utils/AppConstants';

interface Props {
  source: Source | ImageRequireSource;
  viewStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  placeHolder?: Source | ImageRequireSource;
  resizeMode?: ResizeMode;
}

const LoadingImage = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [src, setSource] = useState(props.source);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setSource(props.source);
  }, [props.source]);
  return (
    <View
      style={{
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.white.bgWhite,
        ...props.viewStyle,
      }}>
      <FastImage
        resizeMode={props.resizeMode ? props.resizeMode : 'cover'}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setSource(props.placeHolder);
          setIsError(true);
        }}
        source={src}
        style={[
          {
            height: '100%',
            width: '100%',
            ...props.imageStyle,
          },
          isError && {
            height: 40,
            width: 40,
          },
        ]}
      />
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'small'} color={AppColors.red.mainColor} />
        </View>
      )}
    </View>
  );
};
export default LoadingImage;
