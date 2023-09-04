import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import moment from 'moment';
import ThreadManager from '../../../../ChatModule/ThreadManger';
import AppImageViewer from '../../../Components/ProfileView/AppImageView';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../../Utils/AppConstants';
import ProfilePlaceHolderComp from '../../../Components/ProfileView/ProfilePlaceHolderComp';
import LinearGradient from 'react-native-linear-gradient';
import { AppStyles } from '../../../../Utils/AppStyles';

export default function SingleMessageComponent(props: any) {
  const [time, setTime] = useState('');
  const [count, setUnreadCount] = useState<any>(
    props?.obj[`${[props?.obj.participants[props?.findedIndex].user]}$$`],
  );
  const colorsList = [AppColors.gradient.dark, AppColors.gradient.light];
  useEffect(() => {
    checkUnreadCount();
  }, [props?.obj]);

  const checkUnreadCount = () => {
    if (props?.obj?.createdAt) {
      let findedDate = moment(
        moment(
          props?.obj?.createdAt,
          ThreadManager.instance.dateFormater.fullDate,
        ),
      );
      setTime(moment(findedDate).fromNow());
    }
    setUnreadCount(
      props?.obj[`${[props?.obj.participants[props?.findedIndex].user]}$$`],
    );
  };

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
      activeOpacity={1}>
      <Pressable onPress={props.onPressProfile}>
        {props?.profileImage?.length > 0 ? (
          <AppImageViewer
            source={{ uri: props?.profileImage }}
            placeHolder={AppImages.bottomBar.Profile}
            style={styles.profilePic}
          />
        ) : (
          <ProfilePlaceHolderComp
            index={props?.index}
            name={props?.name}
            mainStyles={styles.profilePic}
            nameStyles={{
              fontSize: normalized(14),
              color: AppColors.white.white,
              ...AppStyles.textRegular
            }}
          />
        )}
      </Pressable>

      <View style={styles.textCon}>
        <View style={styles.titleMsgCon}>
          <Text numberOfLines={1} style={styles.name}>
            {props?.name}
          </Text>

          <Text numberOfLines={1} style={styles.designation}>
            {props?.msg}
          </Text>
        </View>
        <View style={styles.countTimeCont}>
          <Text style={styles.timeStyle}>{time}</Text>
          {count > 0 ? (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.8 }}
              colors={colorsList}
              style={styles.countView}>
              {count?.length > 99 ? (
                <Text style={styles.countTxt}>+99</Text>
              ) : (
                <Text style={styles.countTxt}>{count}</Text>
              )}
            </LinearGradient>
          ) : (
            <View />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: hv(10),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  onlineView: {
    height: normalized(10),
    width: normalized(10),
    position: 'absolute',
    bottom: 1,
    right: 5,
  },
  profilePic: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  textCon: {
    marginLeft: normalized(8),
    width: '83%',
    flexDirection: 'row',
  },
  name: {
    fontSize: normalized(14),
    color: AppColors.black.black,
    textAlign: 'left',
    lineHeight: hv(21),
    ...AppStyles.textSemiBold
  },
  designation: {
    fontSize: normalized(13),
    color: AppColors.grey.gray,
    textAlign: 'left',
    lineHeight: hv(19),
    ...AppStyles.textRegular,
    width: '90%',
  },
  editIcon: {
    width: normalized(17.34),
    height: normalized(17.33),
  },
  deleteIcon: {
    width: normalized(15.68),
    height: normalized(17.97),
  },
  countView: {
    backgroundColor: AppColors.green.primaryLight,
    height: normalized(25),
    width: normalized(25),
    borderRadius: normalized(25 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    right: normalized(-40),
  },
  countTxt: {
    color: AppColors.white.white,
    fontSize: normalized(11),
    ...AppStyles.textRegular,
  },
  countTimeCont: {
    justifyContent: 'space-around',
    width: normalized(70),
  },
  titleMsgCon: {
    width: '75%',
  },
  timeStyle: {
    fontSize: normalized(10),
    marginLeft: normalized(-10),
    marginTop: hv(-3),
    color: AppColors.grey.gray,
    ...AppStyles.textRegular,
    textAlign: 'center',
  },
});
