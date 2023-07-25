import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {
  AppColors,
  hv,
  normalized,
  ScreenSize,
  socialList,
} from '../../../../Utils/AppConstants';
import {SocialTypeStrings} from '../../../../Utils/AppEnums';
import {AppStyles} from '../../../../Utils/AppStyles';

interface Props {
  onIconPress: (val: string) => void;
}

const SocialComponent = (props: Props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.lineContainer}>
        <View style={styles.singleView} />
        <Text style={styles.text}>{`   OR   `}</Text>
        <View style={styles.singleView} />
      </View>
      <Text style={styles.text2}>Sign in with</Text>
      <View style={styles.socialContainer}>
        {socialList.map((item, index) =>
          Platform.OS == 'android' && index == 2 ? null : (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => props.onIconPress(item.name)}>
              <View style={styles.singleSocialView}>
                <Image
                  source={item.img}
                  resizeMode="contain"
                  style={styles.socialImg}
                />
              </View>
            </TouchableWithoutFeedback>
          ),
        )}
      </View>
    </View>
  );
};
export default SocialComponent;

const styles = StyleSheet.create({
  mainContainer: {
    width: ScreenSize.width * 0.7,
    alignItems: 'center',
    marginVertical: hv(20),
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 40,
  },
  singleView: {
    height: 1,
    width: '35%',
    backgroundColor: AppColors.dark.darkLevel1,
  },
  text: {
    ...AppStyles.textRegular,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(18),
    marginLeft: normalized(10),
    marginRight: normalized(10),
  },
  text2: {
    ...AppStyles.textRegular,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(14),
    marginTop: normalized(10),
  },
  socialContainer: {
    flexDirection: 'row',
    width: Platform.OS == 'android' ? '60%' : '85%',
    justifyContent: 'space-between',
    paddingTop: hv(22),
  },
  singleSocialView: {
    height: normalized(50),
    width: normalized(50),
    borderRadius: normalized(25),
    backgroundColor: AppColors.dark.darkLevel7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialImg: {
    height: normalized(25),
    width: normalized(25),
    tintColor: AppColors.dark.darkLevel1,
  },
});
