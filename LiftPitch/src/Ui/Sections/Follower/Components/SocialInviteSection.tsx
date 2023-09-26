import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  AppColors,
  AppImages,
  normalized,
  socialInviteType,
  socialInviteList,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';

interface Props {
  onPress: (index: any) => void;
}

const SocialInviteSection = (props: Props) => {
  return (
    <View>
      {socialInviteList.map((item, index) => {
        return (
          <TouchableWithoutFeedback
            onPress={() => props.onPress(item.type)}
            key={index}>
            <View style={styles.mainContainer}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={styles.profileImg}
              />
              <View style={styles.contentBox}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
              <Image
                source={AppImages.Common.LeftArrowIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default SocialInviteSection;

const styles = StyleSheet.create({
  mainContainer: {
    height: 35,
    ...AppStyles.horiCommon,
    marginVertical: normalized(10),
    marginHorizontal: normalized(15),
  },
  profileImg: {
    height: normalized(30),
    width: normalized(30),
  },
  contentBox: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    color: AppColors.black.black,
    fontSize: normalized(14),
    ...AppStyles.textRegular,
  },
});
