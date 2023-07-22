import {Platform, StyleSheet} from 'react-native';
import {AppColors, AppFonts, hv, normalized} from './AppConstants';
export const AppHorizontalMargin = normalized(15);
export const AppStyles = StyleSheet.create({
  MainStyle: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  textInterSimple: {
    fontFamily: AppFonts.InterRegular,
  },
  textInterMedium: {
    fontFamily: AppFonts.InterMedium,
  },
  textInterBold: {
    fontFamily: AppFonts.InterBold,
  },
  textInterSemiBold: {
    fontFamily: AppFonts.InterSemiBold,
  },
  imageCommon: {
    resizeMode: 'contain',
  },
  mainContainer: {
    flex: 1,
  },
  bottomBarBackStyle: {
    justifyContent: 'center',
    overflow : "hidden"
  },
  BottomBarStyle: {
    width: '100%',
    height: hv(70),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFF1',
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
    // fontFamily: AppFonts.InterLight,
    fontSize: normalized(10),
    fontWeight: '500',
    color: AppColors.grey.light,
    marginTop: 4,
  },
  barText1: {
    // fontFamily: AppFonts.InterLight,
    fontSize: normalized(12),
    fontWeight: '700',
    color: AppColors.blue.dark,
    marginTop: 4,
  },
  resMainContainer: {
    marginHorizontal: normalized(15),
  },
  commonShadowStyle : {
    shadowColor : AppColors.shadowColor.lightBlack,
    shadowOffset : {width : 0,height : 0},
    shadowOpacity : 1 ,
    shadowRadius : 2,
    elevation : 5,
  },
});
export const AppStyleWithProps = (props: any) => StyleSheet.create({});
