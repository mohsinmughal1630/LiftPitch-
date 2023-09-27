import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  AppColors,
  AppImages,
  ScreenSize,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import CommonDataManager from '../../../Utils/CommonManager';
import ProfilePlaceHolderComp from '../ProfileView/ProfilePlaceHolderComp';
import AppImageViewer from '../ProfileView/AppImageView';
interface Props {
  onClose: () => void;
  placeHold: string;
  searchTxt: string;
  atSearch: (val: string) => void;
  list: any;
  atUserCellPress: (val: any) => void;
}
const SearchModal = (props: Props) => {
  return (
    <Modal transparent onRequestClose={props?.onClose} animationType="fade">
      <View style={styles.outerMain}>
        <View style={styles.subContainer}>
          <SafeAreaView
            style={{
              backgroundColor: 'white',
            }}>
            <View style={styles.headerRow}>
              <View style={styles.topCont}>
                <Image
                  source={AppImages.Common.SearchIcon}
                  style={{tintColor: AppColors.black.light}}
                />
                <TextInput
                  value={props?.searchTxt}
                  onChangeText={(val: any) => {
                    props?.atSearch(val);
                  }}
                  style={styles.inputBox}
                  placeholderTextColor={AppColors.black.light}
                  placeholder={props?.placeHold}
                />
              </View>
              <TouchableWithoutFeedback onPress={props?.onClose}>
                <View style={styles.headerCrossBox}>
                  <Text style={styles.cancelTxt}>Cancel</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </SafeAreaView>
          {props?.list?.length > 0 ? (
            <FlatList
              data={props?.list}
              style={{flex: 1}}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({item, index}: any) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.singleCommentContainer}
                    key={index}
                    onPress={() => {
                      if (props?.atUserCellPress) {
                        props?.atUserCellPress(item);
                      }
                    }}>
                    <View style={styles.profileImgBox}>
                      {item?.profile ? (
                        <AppImageViewer
                          source={{uri: item?.profile}}
                          placeHolder={AppImages.bottomBar.Profile}
                          style={{
                            ...styles.profileImgBox,
                            backgroundColor: AppColors.white.bgWhite,
                          }}
                        />
                      ) : (
                        <ProfilePlaceHolderComp
                          index={index}
                          name={item?.userName ? item?.userName : 'Testing'}
                          mainStyles={styles.profileImgBox}
                          nameStyles={{
                            fontSize: normalized(16),
                            ...AppStyles.textMedium,
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.contentBox}>
                      <View
                        style={[
                          AppStyles.horiCommon,
                          {justifyContent: 'space-between'},
                        ]}>
                        <Text
                          style={[
                            styles.description,
                            {color: AppColors.black.black, marginTop: 0},
                          ]}>
                          {CommonDataManager.getSharedInstance().capitalizeFirstLetter(
                            item.userName,
                          )}
                        </Text>
                      </View>
                      <Text style={styles.msgTxt}>{item?.description}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
        </View>
      </View>
    </Modal>
  );
};
export default SearchModal;

const styles = StyleSheet.create({
  outerMain: {
    flex: 1,
    backgroundColor: AppColors.white.white,
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerRow: {
    marginTop: normalized(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: normalized(45),
    paddingHorizontal: normalized(15),
  },
  headerCrossBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  topCont: {
    flexDirection: 'row',
    width: ScreenSize.width - normalized(90),
    height: normalized(40),
    backgroundColor: AppColors.white.simple,
    borderRadius: normalized(8),
    alignItems: 'center',
    paddingHorizontal: normalized(10),
  },
  inputBox: {
    width: '90%',
    marginStart: normalized(8),
    fontSize: normalized(14),
    fontWeight: '400',
    color: AppColors.black.black,
  },
  cancelTxt: {
    fontSize: normalized(14),
    fontWeight: '500',
    color: AppColors.black.black,
  },
  singleCommentContainer: {
    flexDirection: 'row',
    marginVertical: normalized(10),
    // alignItems: 'center',
    marginHorizontal: normalized(15),
  },
  profileImgBox: {
    backgroundColor: AppColors.red.mainColor,
    height: normalized(35),
    width: normalized(35),
    borderRadius: normalized(35 / 2),
    ...AppStyles.centeredCommon,
  },
  placeholderImg: {
    height: '60%',
    width: '60%',
    tintColor: AppColors.white.white,
  },
  contentBox: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
  },
  description: {
    color: AppColors.grey.grey,
    fontSize: normalized(13),
    ...AppStyles.textSemiBold,
  },
  msgTxt: {
    color: AppColors.black.black,
    fontSize: normalized(12),
    ...AppStyles.textRegular,
  },
});
