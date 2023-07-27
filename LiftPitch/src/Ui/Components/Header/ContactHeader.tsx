import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {
  AppColors,
  hv,
  AppImages,
  normalized,
} from '../../../Utils/AppConstants';

interface Props {
  onMenuPress?: () => void;
}

const ContactHeader = (props: Props) => {
  const {isNotchDevice} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );

  return (
    <>
      <StatusBar
        backgroundColor={AppColors.white.white}
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.rowContainer}>
          {props.onMenuPress && (
            <TouchableWithoutFeedback onPress={props.onMenuPress}>
              <View style={styles.menuView}>
                <Image
                  source={AppImages.Cards.MenuIcon}
                  style={styles.menuImg}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          <Image
            source={AppImages.Home.ContactLogoGreen}
            style={[
              styles.headerLogo,
              {
                marginVertical: Platform.select({
                  ios: isNotchDevice ? hv(5) : hv(15),
                  android: hv(10),
                }),
              },
            ]}
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ContactHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: AppColors.white.white,
  },
  headerLogo: {
    height: hv(40),
    width: normalized(150),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuView: {
    position: 'absolute',
    left: 0,
    padding: normalized(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuImg: {
    height: normalized(20),
    width: normalized(20),
  },
});
