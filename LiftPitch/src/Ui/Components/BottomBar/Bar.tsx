import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {AppColors, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import CommonDataManager from '../../../Utils/CommonManager';
import MiddleFunctionComp from './MiddleFunctionComp';
interface Props {
  obj: any;
  onPress: () => void;
  index: Number;
  navigation: any;
}
const Bar = (props: Props) => {
  const {obj, onPress, index} = props;
  const selector = useSelector((AppState: AppRootStore) => AppState);
  const selectedTab = selector.AppReducer.currentTab;
  return (
    <TouchableWithoutFeedback key={obj.title} onPress={onPress}>
      {index == 2 ? (
        <MiddleFunctionComp
          navigation={props.navigation}
          isActive={selectedTab == index}
          obj={obj}
        />
      ) : (
        <View style={[AppStyles.barStyle, styles.container]}>
          <Image
            style={[
              AppStyles.barImageStyle,
              {
                tintColor:
                  selectedTab == index
                    ? AppColors.primaryGreen
                    : AppColors.dark.darkLevel1,
              },
            ]}
            source={obj.image}
          />
          <Text
            style={
              selectedTab == index ? AppStyles.barText1 : AppStyles.barText
            }>
            {CommonDataManager.getSharedInstance().capitalizeFirstLetter(
              obj.title,
            )}
          </Text>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};
export default Bar;

const styles = StyleSheet.create({
  container: {
    minHeight: normalized(40),
    minWidth: normalized(50),
    justifyContent: 'flex-end',
  },
});
