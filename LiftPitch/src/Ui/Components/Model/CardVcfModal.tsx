import React from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppStyles} from '../../../Utils/AppStyles';
import WebView from 'react-native-webview';
import {AppImages} from '../../../Utils/AppConstants';

interface Props {
  onClose: () => void;
  cardUrl: string;
}

const CardVcfModal = (props: Props) => {
  return (
    <Modal onRequestClose={props.onClose} animationType="slide">
      <View style={AppStyles.mainContainer}>
        <SafeAreaView />
        <View style={AppStyles.horiCommon}>
          <TouchableWithoutFeedback onPress={props.onClose}>
            <View style={styles.crossBox}>
              <Image
                source={AppImages.Common.CrossIcon}
                resizeMode="contain"
                style={styles.crossImg}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <WebView
          source={{uri: props.cardUrl}}
          onError={err => console.log('Webview error ', err)}
          onHttpError={e => console.log('Error in http ', e)}
          style={AppStyles.MainStyle}
          showsVerticalScrollIndicator={false}
          startInLoadingState={true}
        />
      </View>
    </Modal>
  );
};

export default CardVcfModal;

const styles = StyleSheet.create({
  crossBox: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossImg: {
    width: '30%',
    height: '30%',
  },
});
