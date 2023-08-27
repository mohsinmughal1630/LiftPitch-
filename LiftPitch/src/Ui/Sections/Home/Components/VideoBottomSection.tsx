import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {Routes} from '../../../../Utils/Routes';

interface Props {
  navigation: any;
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
        <View>
          <Text
            onPress={() =>
              CommonDataManager.getSharedInstance().redirectToUrl(
                props.item.productLink,
              )
            }
            style={styles.linkText}>
            {props.item.productLink}
          </Text>
          <View style={styles.bottomBox}>
            <View style={styles.bottomContentBox}>
              <Text style={styles.userName}>{`@${props.item.userName}`}</Text>
            </View>
          </View>
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
      </View>
      <View>
        {/* Start of Profile Image */}
        <TouchableOpacity
          style={styles.profileImgBox}
          onPress={() => {
            props?.navigation?.navigate(Routes.ProfileTab.ProfileScreen, {
              userId: 'GdPK1Rn1',
            });
          }}>
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
        </TouchableOpacity>
        {/* End of Profile Image */}
        <SocialBox onOptionClick={props.onOptionClick} />
      </View>
    </View>
  );
};

export default VideoBottomSection;

const styles = StyleSheet.create({
  mainContainer: {
    bottom: 0,
    position: 'absolute',
    marginBottom: normalized(20),
    width: '100%',
    paddingHorizontal: normalized(20),
    flexDirection: 'row',
    zIndex: 2,
  },
  linkText: {
    color: AppColors.white.white,
    fontSize: normalized(13),
    marginVertical: 2,
    fontWeight: '600',
  },
  descriptionText: {
    color: AppColors.white.white,
    fontSize: normalized(13),
    fontWeight: '400',
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
    borderWidth: 1,
    borderColor: AppColors.white.white,
    ...AppStyles.centeredCommon,
    marginBottom: normalized(10),
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
    color: AppColors.white.white,
    fontSize: normalized(14),
  },
  userName: {
    color: AppColors.white.white,
    fontSize: normalized(14),
    fontWeight: '900',
  },
});
