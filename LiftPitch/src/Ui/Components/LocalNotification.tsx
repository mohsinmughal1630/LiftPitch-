import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AppImages, normalized} from '../../Utils/AppConstants';
import ThreadManager from '../../ChatModule/ThreadManger';
const LocalNotification = (props: any) => {
  const translationY = useSharedValue(-100);
  useEffect(() => {
    showNoti();
    setTimeout(() => {
      showNoti();
      props.closeView();
    }, 5000);
  }, []);
  const showNoti = () => {
    translationY.value = withTiming(translationY.value == 0 ? -100 : 0, {
      duration: 500,
    });
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: 52,
      marginHorizontal: 15,
      borderRadius: 8,
      marginTop: Platform.OS === 'android' ? 20 : 5,
      paddingHorizontal: 10,
      backgroundColor: '#F2F2F2',
      transform: [
        {
          translateY: translationY.value,
        },
      ],
      flexDirection: 'row',
      paddingVertical: 5,
    };
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.openView();
      }}>
      <Animated.View style={animatedStyle}>
        <Image
          style={{
            height: normalized(40),
            width: normalized(40),
            borderRadius: normalized(6),
            backgroundColor: 'black',
          }}
          source={AppImages.AppIcon}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 5,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: normalized(12),
              color: 'black',
              fontWeight: '500',
            }}>
            {ThreadManager.instance.pushObj._title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: '400',
              fontSize: 12,
              color: 'black',
            }}>
            {ThreadManager.instance.pushObj._body}
          </Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
export default LocalNotification;
