import React from 'react';
import {View, Text, Image, TouchableOpacity, AppState} from 'react-native';
import {useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {AppStyles} from '../../../Utils/AppStyles';
import CommonDataManager from '../../../Utils/CommonManager';
const Bar = ({obj, onPress, index}) => {
  const selector = useSelector((AppState: AppRootStore) => AppState);
  const selectedTab = selector.AppReducer.currentTab;
  return (
    <TouchableOpacity key={obj.title} onPress={() => onPress()}>
      <View
        style={{
          ...AppStyles.barStyle,
        }}>
        {selectedTab == index ? (
          <Image
            style={{
              ...AppStyles.barImageStyle,
            }}
            source={obj.selectedImage}
          />
        ) : (
          <Image
            style={{
              ...AppStyles.barImageStyle,
            }}
            source={obj.image}
          />
        )}

        <Text
          style={
            selectedTab == index
              ? {...AppStyles.barText1}
              : {...AppStyles.barText}
          }>
          {CommonDataManager.getSharedInstance().getTranslation(
            selector.AppReducer.currentLang,
            'tab',
            obj.title,
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default Bar;
