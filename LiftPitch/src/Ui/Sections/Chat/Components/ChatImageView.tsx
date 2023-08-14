import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {AppImages, hv, isSmallDevice} from '../../../../Utils/AppConstants';
const ChatImageView = ({showImageView, url, onClose}) => {
  return (
    <Modal
      visible={showImageView}
      presentationStyle="fullScreen"
      onRequestClose={onClose}>
      <View
        style={{
          ...style.mainView,
        }}>
        <TouchableOpacity
          onPress={() => onClose()}
          style={{
            marginTop: isSmallDevice ? hv(25) : hv(50),
            position: 'absolute',
            width: '100%',
            zIndex: 200,
            justifyContent: 'center',
          }}>
          <Image
            style={style.backButton}
            source={AppImages.Common.LeftArrowIcon}
          />
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
