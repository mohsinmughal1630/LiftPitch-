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
  TextStyle,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {
  AppColors,
  hv,
  AppImages,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';

interface Props {
  title: string;
  isBack?: boolean;
  showEndButton?: boolean;
  endItem?: string;
  onBack?: () => void;
  onEndItemPress?: () => void;
  endButtonDisabled?: boolean;
  onCancel?: () => void;
  showSearch?: boolean;
  longBackIcon?: boolean;
  startIcon?: string;
  endTextStyle?: TextStyle;
  onLayoutChange?: (e: any) => void;
  titleStyles?: TextStyle;
}

const AppHeader = (props: Props) => {
  const {isNotchDevice} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  return (
    <View
      style={styles.container}
      onLayout={e => {
        if (props.onLayoutChange) {
          props.onLayoutChange(e);
        }
      }}>
      <StatusBar
        backgroundColor={AppColors.white.white}
        barStyle={'dark-content'}
      />
      <SafeAreaView />
      <View
        style={[
          styles.rowContainer,
          {
            paddingVertical: Platform.select({
              ios: isNotchDevice ? hv(5) : hv(15),
              android: hv(15),
            }),
            paddingBottom: Platform.select({
              ios: isNotchDevice ? hv(10) : hv(15),
              android: hv(15),
            }),
          },
        ]}>
        {props.isBack && (
          <TouchableWithoutFeedback onPress={props.onBack}>
            <View style={styles.backView}>
              <Image
                source={
                  props.startIcon ? props.startIcon : AppImages.Drawer.BackIcon
                }
                resizeMode="contain"
                style={[
                  styles.backImg,
                  props.startIcon
                    ? {
                        height: normalized(20),
                        width: normalized(20),
                      }
                    : null,
                ]}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
        <Text numberOfLines={1} style={[styles.titleText, props.titleStyles]}>
          {props.title}
        </Text>
        {props.showEndButton && (
          <TouchableWithoutFeedback
            onPress={props.onEndItemPress}
            disabled={props?.endButtonDisabled ? true : false}>
            <View
              style={[
                styles.endView,
                {
                  right: props?.endItem == 'Cancel' ? 0 : normalized(5),
                },
              ]}>
              {props.endItem !== 'Skip' &&
              props.endItem !== 'Cancel' &&
              props.endItem !== 'Save' &&
              props.endItem !== 'Logout' &&
              props.endItem !== 'Edit' &&
              props.endItem !== 'Replace' ? (
                props.showSearch ? (
                  <Image
                    source={
                      props.endItem == 'Search'
                        ? AppImages.Contacts.SearchIcon
                        : AppImages.Cards.MenuIcon
                    }
                    style={styles.endIcon}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={
                      props.endItem == 'Search'
                        ? AppImages.Contacts.InputSearchIconGray
                        : props.endItem == 'Share'
                        ? AppImages.DynamicLink.shareIcon
                        : props.endItem == 'qr'
                        ? AppImages.Cards.QrIconGrey
                        : AppImages.Cards.MenuIcon
                    }
                    style={{...styles.endIcon}}
                    resizeMode="contain"
                  />
                )
              ) : (
                <TouchableWithoutFeedback onPress={props.onEndItemPress}>
                  <View style={styles.skipView}>
                    <Text
                      style={[
                        styles.endText,
                        props.endTextStyle,
                        {
                          color: props.endButtonDisabled
                            ? AppColors.dark.darkLevel1
                            : AppColors.primaryGreen,
                        },
                      ]}>
                      {props?.endItem !== 'Skip' ? props.endItem : 'Skip'}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: AppColors.white.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backView: {
    width: normalized(50),
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: normalized(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImg: {
    width: normalized(30),
    height: normalized(15),
  },
  endView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: normalized(5),
    justifyContent: 'center',
    paddingHorizontal: normalized(15),
  },
  titleText: {
    ...AppStyles.textSemiBold,
    color: AppColors.black.black,
    fontSize: normalized(20),
    maxWidth: '60%',
  },
  endText: {
    ...AppStyles.textSemiBold,
    color: AppColors.primaryGreen,
    fontSize: normalized(16),
  },
  endIcon: {
    width: normalized(20),
    height: normalized(20),
  },
  skipView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalized(3),
  },
});
