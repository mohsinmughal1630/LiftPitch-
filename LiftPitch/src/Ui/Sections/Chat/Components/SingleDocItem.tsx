import React from 'react';
import {View, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import {AppImages} from '../../../../Utils/AppConstants';

const SingleDocItem = ({item, onOpen}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onOpen();
      }}>
      <View
        style={{
          ...style.mainView,
        }}>
        <Image
          style={{
            ...style.innerView,
          }}
          source={AppImages.Chat.Document}
        />
      </View>
    </TouchableWithoutFeedback>
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
    flex: 1,
    resizeMode: 'cover',
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
export default SingleDocItem;
