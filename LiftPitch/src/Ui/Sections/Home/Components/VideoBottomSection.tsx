import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SocialBox from './SocialBox';
import {
  AppColors,
  AppImages,
  normalized,
  singleVideoItemType,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import CommonDataManager from '../../../../Utils/CommonManager';
import LoadingImage from '../../../Components/LoadingImage';
import {Routes} from '../../../../Utils/Routes';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import ProfilePlaceHolderComp from '../../../Components/ProfileView/ProfilePlaceHolderComp';
interface Props {
  navigation: any;
  item: singleVideoItemType;
  onOptionClick: (val: string) => void;
  isLike: boolean;
  atLikePress: () => void;
  likeCount: any;
  index: any;
}

const maxStrLength = 100;

const VideoBottomSection = (props: Props) => {
  const profileImg = props?.item?.creatorData?.companyLogo;
  const description = props?.item?.pitch_idea?.description;
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
              <Text
                style={
                  styles.userName
                }>{`@${props?.item?.creatorData?.userName}`}</Text>
            </View>
          </View>
          <Text
            style={{
              ...styles.descriptionText,
              fontSize: normalized(14),
              fontWeight: '500',
            }}>
            {props?.item?.pitch_idea?.name}
          </Text>
          <Text style={styles.descriptionText}>
            {description?.length > maxStrLength
              ? showMore
                ? description
                : description.substring(0, maxStrLength) + '...'
              : description}
          </Text>
          {description?.length > maxStrLength && (
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
                props?.item?.storeLink,
              )
            }
            style={styles.linkText}>
            {props?.item?.storeLink}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.profileImgBox}
          onPress={() => {
            props?.navigation?.navigate(Routes.ProfileTab.ProfileScreen, {
              userId: props?.item?.creatorData?.userId,
            });
          }}>
          {profileImg?.length > 0 ? (
            <AppImageViewer
              source={{uri: profileImg}}
              style={{...styles.profileImgBox, marginBottom: 0}}
              resizeMode="cover"
            />
          ) : (
            <ProfilePlaceHolderComp
              index={props?.index}
              name={
                props?.item?.creatorData?.userName
                  ? props?.item?.creatorData?.userName
                  : 'Testing'
              }
              mainStyles={styles.profileImgBox}
              nameStyles={{
                fontSize: normalized(16),
                fontWeight: '500',
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            height: 45,
            width: 45,
            alignItems: 'center',
            marginBottom: normalized(10),
          }}
          onPress={() => {
            props?.atLikePress();
          }}>
          <>
            <Image
              source={
                props?.isLike
                  ? AppImages.Videos.likeIcon
                  : AppImages.Videos.unLikeIcon
              }
              resizeMode="contain"
              style={{
                justifyContent: 'center',
                height: '60%',
                width: '60%',
                tintColor: AppColors.red.darkRed,
              }}
            />
            <Text
              style={{
                color: AppColors.white.white,
                fontSize: normalized(14),
                fontWeight: '500',
              }}>
              {props?.likeCount}
            </Text>
          </>
        </TouchableOpacity>

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
    height: normalized(45),
    width: normalized(45),
    borderRadius: normalized(45 / 2),
    borderWidth: 1,
    borderColor: AppColors.white.white,
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
