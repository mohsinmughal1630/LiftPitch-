import moment from 'moment';
import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import SingleVideoItem from './SingleVideoItem';
import SingleImageItem from './SingleImageItem';
import SingleDocItem from './SingleDocItem';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import ProfilePlaceHolderComp from '../../../Components/ProfileView/ProfilePlaceHolderComp';
const OtherUserMessage = ({
  item,
  onPdf,
  onImage,
  otherUserData,
  navigation,
  playVideo,
}: any) => {
  const setImage = () => {
    if (otherUserData.userProfileImageUrl) {
      return otherUserData.userProfileImageUrl;
    } else {
      return '';
    }
  };
  const setContainerComponent = () => {
    if (item['videoUrl']) {
      return (
        <SingleVideoItem
          item={item}
          onPlay={() => {
            playVideo({
              videoUrl: item.videoUrl,
              thumbnailUrl: item?.thumbnail ? item?.thumbnail : '',
            });
          }}
        />
      );
    }
    if (item['url']) {
      return <SingleImageItem item={item} onPress={() => onImage()} />;
    }
    if (item['documentUrl']) {
      return <SingleDocItem item={item} onOpen={() => onPdf()} />;
    }
    return (
      <View style={styles.messageCon}>
        <Hyperlink
          linkStyle={{color: '#2980b9', fontSize: normalized(16)}}
          onPress={(url, text) => {
            if (item?.callUrl) {
              console.log('item?.callUrl=====>', item?.callUrl);
              Linking.canOpenURL(item?.callUrl).then(supported => {
                if (supported) {
                  Linking.openURL(item?.callUrl);
                } else {
                  Linking.openURL(item?.callUrl);
                  console.log("Don't know how to open URI: " + item?.callUrl);
                }
              });
            } else {
              Linking.canOpenURL(url).then(supported => {
                if (supported) {
                  Linking.openURL(url);
                } else {
                  Linking.openURL(url);
                  console.log("Don't know how to open URI: " + url);
                }
              });
            }
          }}>
          <Text style={styles.message}>{item.content}</Text>
        </Hyperlink>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('ProfileScreen', {
              userId: otherUserData.user,
              type: otherUserData.type,
              from: 'ChatScreen',
            });
          }}>
          {setImage() !== '' ? (
            <>
              <AppImageViewer
                type="fast"
                source={{uri: setImage()}}
                style={styles.image}
                placeHolder={AppImages.bottomBar.Profile}
              />
              <View style={styles.online} />
            </>
          ) : (
            <>
              <ProfilePlaceHolderComp
                index={1}
                name={item?.userName ? item?.userName : 'Testing'}
                mainStyles={styles.image}
                nameStyles={{
                  fontSize: normalized(16),
                  fontWeight: '500',
                }}
              />
              <View style={styles.online} />
            </>
          )}
        </TouchableOpacity>

        {setContainerComponent()}
      </View>
      <View style={styles.timeTextCon}>
        <Text style={styles.timeText}>
          {moment(item.time, 'HH:mm:ss').format('HH:mm a')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: hv(3),
    marginEnd: normalized(40),
  },
  other_person_image: {
    width: normalized(26),
    height: normalized(26),
    resizeMode: 'contain',
  },
  messageCon: {
    marginStart: normalized(4),
    backgroundColor: AppColors.white.whiteOp,
    padding: normalized(8),
    borderRadius: normalized(12),
    borderTopLeftRadius: 0,
  },
  message: {
    fontSize: normalized(14),
    color: AppColors.black.lightBlack,
  },
  timeTextCon: {
    alignSelf: 'flex-start',
    marginStart: normalized(40),
  },
  timeText: {
    fontSize: normalized(11),
    color: AppColors.black.lightBlack,
    marginStart: normalized(4),
    fontWeight: '400',
  },
  image: {
    width: normalized(35),
    height: normalized(35),
    borderRadius: normalized(35 / 2),
  },
  online: {
    backgroundColor: AppColors.green.primaryLight,
    height: normalized(10),
    width: normalized(10),
    borderRadius: normalized(10 / 2),
    position: 'absolute',
    alignSelf: 'flex-end',
    top: hv(24),
  },
});
export default OtherUserMessage;
