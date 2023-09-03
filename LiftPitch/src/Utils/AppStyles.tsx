import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
import { AppColors, AppFonts, hv, isSmallDevice, normalized } from './AppConstants';
export const AppHorizontalMargin = normalized(15);

const windowHeight = Dimensions.get('window').height;

export const AppStyles = StyleSheet.create({
  MainStyle: {
    flex: 1,
    backgroundColor: AppColors.white.white,
  },
  centeredCommon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteCommon: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
  },
  androidStylesWithDynamicHeight: {
    backgroundColor: AppColors.dark.darkLevel5,
    height:
      Platform.Version < '30'
        ? windowHeight - StatusBar.currentHeight
        : windowHeight,
  },

  MainDimStyle: {
    flex: 1,
    backgroundColor: AppColors.white.whiteOp,
  },
  subContainerCommon: {
    flex: 1,
    alignItems: 'center',
  },
  horiCommon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadowCommon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.68,

    elevation: 8,
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
    height: normalized(60),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  barStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  barImageStyle: {
    height: hv(28),
    width: hv(28),
    resizeMode: 'contain',
  },
  barText: {
    fontSize: normalized(10),
    color: AppColors.black.black,
    marginTop: 4,
  },

  listFooterBtn: {
    marginTop: isSmallDevice ? hv(20) : hv(10),
    marginBottom: hv(40) + 15,
    width: '60%',
    alignSelf: 'center',
  },
  inputTitleStyle: {
    color: AppColors.black.black,
    fontSize: normalized(14),
  },
  inputTextStyle: {
    color: AppColors.black.black,
    fontSize: normalized(14),
  },
});
export const AppStyleWithProps = (props: any) => StyleSheet.create({});
