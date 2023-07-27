import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheetProperties,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import {IMAGE_BASE_URL} from '../../../../Network/Urls';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import CommonDataManager from '../../../../Utils/CommonManager';
import LoadingImage from '../../../Components/LoadingImage/LoadingImage';
import UploadFilesCover from '../../UploadFiles/Components/UploadFilesCover';
import {ActiveFunctionTypeStrings} from '../../../../Utils/AppEnums';

interface Props {
  title: string;
  label: string;
  images: any;
  onPress?: () => void;
  containerStyle?: StyleSheetProperties;
  index?: number;
  type?: '';
}

const SingleCard = (props: Props) => {
  const imagesList =
    props.images?.length > 3 ? props.images.slice(0, 3) : props.images;
  const imageSize = props.index == 3 ? normalized(100) : normalized(60);

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.imagesRow}>
          {imagesList.map((item: any, index: number) => (
            <ImageComp
              item={item}
              index={index}
              key={index}
              type={props.type}
            />
          ))}
        </View>
        <View style={styles.textSection}>
          <Text numberOfLines={1} style={styles.title}>
            {CommonDataManager.getSharedInstance().capitalizeFirstLetter(
              props.title,
            )}
          </Text>
          <Text numberOfLines={2} style={styles.label}>
            {props.label}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SingleCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white.white,
    marginVertical: hv(8),
    borderRadius: normalized(20),
    paddingHorizontal: normalized(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hv(18),
  },
  imagesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgView: {
    height: normalized(60),
    width: normalized(60),
    borderRadius: normalized(38),
    borderColor: AppColors.dark.darkLevel1,
    borderWidth: 2,
  },
  img: {
    height: normalized(65),
    width: normalized(65),
  },
  textSection: {
    flex: 1,
    paddingHorizontal: normalized(10),
    justifyContent: 'center',
  },
  title: {
    ...AppStyles.textSemiBold,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(16),
  },
  label: {
    ...AppStyles.textRegular,
    color: AppColors.dark.darkLevel1,
    fontSize: normalized(14),
  },
});

const ImageComp = (props: any) => {
  const [isImageError, setIsImageError] = useState(false);
  return props.type == 'url' ? (
    <View
      style={[
        styles.imgView,
        {
          backgroundColor: AppColors.primaryGreen,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Image
        source={AppImages.Common.LinkMiniIcon}
        resizeMode="cover"
        style={[
          styles.img,
          {
            width: '45%',
            height: '45%',
          },
        ]}
      />
    </View>
  ) : props.type == 'cashApp' ? (
    <Image
      source={AppImages.Home.CashAppIcon}
      resizeMode="cover"
      style={{
        height: normalized(60),
        width: normalized(60),
      }}
    />
  ) : props.type == 'venmo' ? (
    <Image
      source={AppImages.Home.VenmoIcon}
      resizeMode="cover"
      style={{
        height: normalized(60),
        width: normalized(60),
      }}
    />
  ) : props.type == 'uploadFiles' ? (
    <UploadFilesCover
      style={{
        height: normalized(60),
        width: normalized(60),
      }}
      imageStyle={{
        height: normalized(35),
        width: normalized(35),
      }}
    />
  ) : props.type == ActiveFunctionTypeStrings.custom_payment ? (
    <UploadFilesCover
      source={AppImages.Cards.FunctionHomeIcons.PaymentIcon}
      style={{
        height: normalized(60),
        width: normalized(60),
      }}
      imageStyle={{
        height: normalized(35),
        width: normalized(35),
      }}
    />
  ) : props.item?.img == '' || isImageError ? (
    <View
      style={[
        styles.imgView,
        {
          marginLeft: props.index !== 0 ? normalized(-45) : 0,
          zIndex: -props.index,
          backgroundColor: AppColors.dark.darkLevel5,
          justifyContent: 'flex-end',
          alignItems: 'center',
          overflow: 'hidden',
        },
      ]}>
      <Image
        source={AppImages.Common.ProfilePlaceholderIcon}
        resizeMode="cover"
        style={[
          styles.img,
          {
            width: '85%',
            height: '85%',
          },
        ]}
      />
    </View>
  ) : (
    <LoadingImage
      key={props.index}
      resizeMode="cover"
      uri={IMAGE_BASE_URL + props.item.img}
      containerStyle={{
        ...styles.imgView,
        marginLeft: props.index !== 0 ? normalized(-45) : 0,
        zIndex: -props.index,
        backgroundColor: AppColors.dark.darkLevel5,
      }}
      imageStyle={styles.img}
      onError={() => setIsImageError(true)}
    />
  );
};
