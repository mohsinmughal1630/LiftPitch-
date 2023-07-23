import {Dimensions, StyleSheet} from 'react-native';
import {AppColors, normalized} from './AppConstants';
export const AppHorizontalMargin = normalized(15);

const windowHeight = Dimensions.get('window').height;

export const AppStyles = StyleSheet.create({
  MainStyle: {
    flex: 1,
    backgroundColor: AppColors.black.black,
  },
});
export const AppStyleWithProps = (props: any) => StyleSheet.create({});
