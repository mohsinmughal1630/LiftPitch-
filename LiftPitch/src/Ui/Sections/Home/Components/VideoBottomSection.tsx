import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import SocialBox from './SocialBox';
import {
  AppColors,
  AppImages,
  mainBottomPadding,
  normalized,
  singleVideoItemType,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import CommonDataManager from '../../../../Utils/CommonManager';
import LoadingImage from '../../../Components/LoadingImage';

interface Props {
  item: singleVideoItemType;
  onOptionClick: (val: string) => void;
}

const maxStrLength = 100;

const VideoBottomSection = (props: Props) => {
  const profileImg = null;
  const description = props.item.productDescription;
  const [showMore, setShowMore] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <View style={AppStyles.mainContainer}>
        <View style={styles.descriptionBox}>
          <Text
            onPress={() =>
              CommonDataManager.getSharedInstance().redirectToUrl(
                props.item.productLink,
              )
            }
            style={styles.linkText}>
            {props.item.productLink}
          </Text>
          <Text style={styles.descriptionText}>
            {description.length > maxStrLength
              ? showMore
                ? description
                : description.substring(0, maxStrLength) + '...'
              : description}
          </Text>
          {description.length > maxStrLength && (
            <Text
              onPress={() => setShowMore(!showMore)}
              style={[
                styles.linkText,
                {color: AppColors.blue.seeMoreBlue},
              ]}>{` Show ${showMore ? 'Less' : 'More'}`}</Text>
          )}
          <Text
            onPress={() =>
              CommonDataManager.getSharedInstance().redirectToUrl(
                props.item.storeLink,
              )
            }
            style={styles.linkText}>
            {props.item.storeLink}
          </Text>
        </View>
        <View style={styles.bottomBox}>
          {/* Start of Profile Image */}
          <View style={styles.profileImgBox}>
            {profileImg ? (
              <LoadingImage
                source={{uri: profileImg}}
                viewStyle={{
                  ...styles.profileImgBox,
                  backgroundColor: AppColors.white.bgWhite,
                }}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={AppImages.bottomBar.Profile}
                resizeMode="contain"
                style={styles.placeholderImg}
              />
            )}
          </View>
          {/* End of Profile Image */}
          <View style={styles.bottomContentBox}>
            <Text style={styles.storeName}>{props.item.storeName}</Text>
            <Text style={styles.userName}>{props.item.userName}</Text>
          </View>
        </View>
      </View>
      <SocialBox onOptionClick={props.onOptionClick} />
    </View>
  );
};

export default VideoBottomSection;

const styles = StyleSheet.create({
  mainContainer: {
    bottom: 0,
    position: 'absolute',
    marginBottom: mainBottomPadding + 10,
    width: '100%',
    paddingHorizontal: normalized(20),
    flexDirection: 'row',
  },
  descriptionBox: {
    // backgroundColor: 'purple',
  },

  linkText: {
    color: AppColors.blue.lightBlue,
    fontSize: normalized(12),
    marginVertical: 2,
  },
  descriptionText: {
    color: AppColors.grey.gray,
    fontSize: normalized(12),
  },
  bottomBox: {
    ...AppStyles.horiCommon,
    paddingVertical: 10,
  },
  profileImgBox: {
    backgroundColor: AppColors.red.mainColor,
    height: 45,
    width: 45,
    borderRadius: 23,
    ...AppStyles.centeredCommon,
  },
  placeholderImg: {
    height: '60%',
    width: '60%',
    tintColor: AppColors.white.white,
  },
  bottomContentBox: {
    flex: 1,
    height: '100%',
    paddingHorizontal: normalized(10),
    paddingVertical: 5,
  },
  storeName: {
    color: AppColors.grey.gray,
    fontSize: normalized(14),
  },
  userName: {
    color: AppColors.black.black,
    fontSize: normalized(14),
  },
});
