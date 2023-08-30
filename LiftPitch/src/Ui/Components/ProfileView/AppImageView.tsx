import React, {useEffect, useState} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
const AppImageViewer = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [src, setSource] = useState(props.source);
  useEffect(() => {
    setSource(props.source);
  }, [props.source]);

  return (
    <View
      style={{
        ...props.style,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FastImage
        resizeMode="cover"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          if (props?.placeHolder) {
            setSource(props.placeHolder);
          }
        }}
        source={src}
        style={{
          ...props.style,
          borderWidth: 0,
        }}
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
          <ActivityIndicator
            size={props?.indicatorSize ? props?.indicatorSize : 'small'}
            color={'black'}
          />
        </View>
      )}
    </View>
  );
};
export default AppImageViewer;
