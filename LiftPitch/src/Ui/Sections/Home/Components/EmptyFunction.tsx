import React from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {
  hv,
  normalized,
  AppImages,
  isSmallDevice,
} from '../../../../Utils/AppConstants';
import RoundButton from '../../../Components/Button/RoundButton';

interface Props {
  onFunctionCreate: () => void;
}

const EmptyFunction = (props: Props) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={AppImages.Home.EmptyHomeBanner}
        resizeMode={isSmallDevice ? 'stretch' : 'contain'}
        style={styles.banner}
      />
      <RoundButton
        title="Create Function"
        onPress={props.onFunctionCreate}
        containerStyle={{
          width: '60%',
          marginTop: isSmallDevice ? -hv(10) : -hv(20),
        }}
      />
    </View>
  );
};
export default EmptyFunction;

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: hv(200),
    width: '100%',
    paddingHorizontal: normalized(15),
    paddingVertical: hv(10),
    alignItems: 'center',
    marginTop: isSmallDevice ? hv(40) : Platform.OS == 'ios' ? hv(25) : hv(20),
  },
  banner: {
    height: hv(250),
    width: isSmallDevice ? '95%' : '100%',
    paddingHorizontal: normalized(15),
    marginLeft: -10,
  },
});
