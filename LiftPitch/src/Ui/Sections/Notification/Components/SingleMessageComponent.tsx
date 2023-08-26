import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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

export default function SingleMessageComponent(props: any) {
  const [time, setTime] = useState('');
  const [count, setUnreadCount] = useState<any>(
    props?.obj[`${[props?.obj.participants[props?.findedIndex].user]}$$`],
  );

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
            source={{uri: props?.profileImage}}
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
              fontWeight: '400',
            }}
          />
        )}
      </Pressable>

      <View style={styles.textCon}>
        <View style={styles.titleMsgCon}>
          {props?.attechedCompName ? (
            <Text
              numberOfLines={1}
              style={
                styles.name
              }>{`${props?.name} (${props?.attechedCompName})`}</Text>
          ) : (
            <Text numberOfLines={1} style={styles.name}>
              {props?.name}
            </Text>
          )}

          <Text numberOfLines={1} style={styles.designation}>
            {props?.msg}
          </Text>
        </View>

        <View style={styles.countTimeCont}>
          {count > 0 ? (
            <View style={styles.countView}>
              {count?.length > 99 ? (
                <Text style={styles.countTxt}>+99</Text>
              ) : (
                <Text style={styles.countTxt}>{count}</Text>
              )}
            </View>
          ) : (
            <View />
          )}
          <Text style={styles.timeStyle}>{time}</Text>
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
    // width: normalized(200),
    marginLeft: normalized(12),
    width: '90%',
    flexDirection: 'row',
  },
  name: {
    fontSize: normalized(16),
    color: '#1E1E1F',
    textAlign: 'left',
    lineHeight: hv(21),
  },
  designation: {
    fontSize: normalized(12),
    color: AppColors.grey.gray,
    textAlign: 'left',
    lineHeight: hv(19),
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
    height: 16,
    width: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hv(1),
    // marginTop:
  },
  countTxt: {
    color: AppColors.white.white,
    fontSize: 9,
  },
  countTimeCont: {
    justifyContent: 'space-around',
  },
  titleMsgCon: {
    width: '72%',
  },
  timeStyle: {
    color: AppColors.grey.gray,
    fontSize: 10,
    marginLeft: normalized(-15),
    marginTop: hv(5),
  },
});
