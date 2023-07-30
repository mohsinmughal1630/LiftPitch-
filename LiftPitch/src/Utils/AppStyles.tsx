import {Dimensions, Platform, StatusBar, StyleSheet} from 'react-native';
import {
  AppColors,
  normalized,
} from './AppConstants';
export const AppHorizontalMargin = normalized(15);

const windowHeight = Dimensions.get('window').height;

export const AppStyles = StyleSheet.create({
  MainStyle: {
    flex: 1,
    backgroundColor: AppColors.white.white,
  },
  androidStylesWithDynamicHeight: {
    backgroundColor: AppColors.dark.darkLevel5,
    height:
      Platform.Version < 30
        ? windowHeight - StatusBar.currentHeight
        : windowHeight,
  },
  
});
export const AppStyleWithProps = (props: any) => StyleSheet.create({});
