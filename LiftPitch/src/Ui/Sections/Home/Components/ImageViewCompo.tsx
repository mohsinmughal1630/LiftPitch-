import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {AppColors} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import FastImage from 'react-native-fast-image';

interface Props {
  url: string;
  index: number;
}

const ImageViewCompo = (props: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <FastImage
        resizeMode="cover"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
        }}
        source={{uri: props?.url}}
        style={{
          ...styles.absoluteBox,
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
          <ActivityIndicator size={'large'} color={AppColors.white.white} />
        </View>
      )}
    </View>
  );
};

export default ImageViewCompo;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  absoluteBox: {
    ...AppStyles.absoluteCommon,
    ...AppStyles.centeredCommon,
    zIndex: 1,
  },
  videoStyles: {
    width: '100%',
    height: '100%',
  },
  middleIcon: {
    height: 50,
    width: 50,
  },
});
