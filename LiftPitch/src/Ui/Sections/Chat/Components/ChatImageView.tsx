import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  AppImages,
  hv,
  isSmallDevice,
  normalized,
} from '../../../../Utils/AppConstants';
const ChatImageView = ({showImageView, url, onClose}) => {
  return (
    <Modal
      visible={showImageView}
      presentationStyle="fullScreen"
      onRequestClose={onClose}>
      <SafeAreaView />
      <View
        style={{
          ...style.mainView,
        }}>
        <TouchableOpacity
          onPress={() => onClose()}
          style={{
            marginTop: normalized(35),
            position: 'absolute',
            width: '100%',
            zIndex: 200,
            justifyContent: 'center',
          }}>
          <Image style={style.backButton} source={AppImages.Auth.backIcon} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}>
          <ImageViewer imageUrls={[{url: url}]} />
        </View>
      </View>
    </Modal>
  );
};
export default ChatImageView;
const style = StyleSheet.create({
  mainView: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: 'black',
  },
  backButton: {
    marginLeft: 20,
    height: 20,
    width: 20,
    marginBottom: 10,
    resizeMode: 'contain',
    tintColor: 'white',
    alignItems: 'center',
  },
});
