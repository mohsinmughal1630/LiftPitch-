import {Dimensions, Platform, StatusBar, StyleSheet} from 'react-native';
import {
  AppColors,
  AppFonts,
  bottomBarHeightConstant,
  hv,
  isSmallDevice,
  normalized,
  ScreenSize,
} from './AppConstants';
import CommonDataManager from './CommonManager';
export const AppHorizontalMargin = normalized(15);

const windowHeight = Dimensions.get('window').height;

export const AppStyles = StyleSheet.create({
  MainStyle: {
    flex: 1,
    backgroundColor: AppColors.dark.darkLevel5,
  },
  androidStylesWithDynamicHeight: {
    backgroundColor: AppColors.dark.darkLevel5,
    height:
      Platform.Version < 30
        ? windowHeight - StatusBar.currentHeight
        : windowHeight,
  },
  subContainerCommon: {
    flex: 1,
    alignItems: 'center',
  },
  horiCommon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  absoluteCommon: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
  },
  shadowCommon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
  textRegular: {
    fontFamily: AppFonts.Regular,
  },
  textSemiBold: {
    fontFamily: AppFonts.SemiBold,
  },
  textMedium: {
    fontFamily: AppFonts.Medium,
  },
  textBold: {
    fontFamily: AppFonts.Bold,
  },
  textLight: {
    fontFamily: AppFonts.Light,
  },
  imageCommon: {
    resizeMode: 'contain',
  },
  mainContainer: {
    flex: 1,
  },
  bottomBarBackStyle: {
    justifyContent: 'center',
    // overflow: 'hidden',
  },
  BottomBarStyle: {
    width: '100%',
    height: bottomBarHeightConstant,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: AppColors.black.darkDeep,
    alignItems: 'center',
  },
  barStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  barImageStyle: {
    height: hv(22),
    width: hv(22),
    resizeMode: 'contain',
  },
  barText: {
    fontFamily: AppFonts.SemiBold,
    fontSize: normalized(10),
    color: AppColors.dark.darkLevel1,
    marginTop: 4,
  },
  barText1: {
    fontFamily: AppFonts.SemiBold,
    fontSize: normalized(10),
    color: AppColors.primaryGreen,
    marginTop: 4,
  },
  listFooterBtn: {
    marginTop: isSmallDevice ? hv(20) : hv(10),
    marginBottom: hv(40) + 15,
    width: '60%',
    alignSelf: 'center',
  },
  createCardForwardBtnStyle: {
    alignSelf: 'flex-end',
    margin: normalized(25),
    marginVertical: Platform.OS == 'android' ? hv(10) : hv(20),
  },
});
export const AppStyleWithProps = (props: any) => StyleSheet.create({});
