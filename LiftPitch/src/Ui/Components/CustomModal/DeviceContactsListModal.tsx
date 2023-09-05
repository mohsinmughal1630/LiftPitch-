import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
  LayoutAnimation,
  Linking,
} from 'react-native';
import CustomHeader from '../CustomHeader/CustomHeader';
import {
  AppColors,
  AppFonts,
  AppImages,
  hv,
  isSmallDevice,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import {useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import CommonDataManager from '../../../Utils/CommonManager';

interface Props {
  onClose: () => void;
  list: Array<any>;
}

const DeviceContactsListModal = (props: Props) => {
  const {userData} = useSelector((state: AppRootStore) => state.AppReducer);
  const [searchTxt, setSearchTxt] = useState('');
  const filteredList = useRef([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const onInviteClick = (phone: string) => {
    const message = `Hey there, I am ${CommonDataManager.getSharedInstance().capitalizeFirstLetter(
      userData.userName,
    )}, and I am using LiftPitch. I am inviting you to join as well.`;

    const url = `sms:${phone}?body=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(error =>
      console.error('Error opening SMS app:', error),
    );
  };

  return (
    <Modal onRequestClose={props.onClose} animationType="slide">
      <View style={styles.main}>
        <SafeAreaView
          style={{
            backgroundColor: AppColors.white.white,
          }}
        />
        <View style={styles.main}>
          <CustomHeader
            title={'Device Contacts'}
            atBackPress={props.onClose}
            rightComponent={() => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setShowSearchBar(!showSearchBar);
                }}
                style={{
                  paddingVertical: normalized(7),
                  paddingHorizontal: normalized(5),
                }}>
                <Image
                  source={AppImages.Common.SearchIcon}
                  style={{
                    tintColor: AppColors.black.black,
                    height: 20,
                    width: 20,
                  }}
                />
              </TouchableOpacity>
            )}
          />
          {showSearchBar && (
            <SearchComp
              searchTxt={searchTxt}
              setSearchInput={(e: string) => {
                console.log('tempList ', e);
                setSearchTxt(e);
                const tempList: any = props.list.filter(el => {
                  const name = el.displayName || el.givenName;
                  return name?.toLowerCase()?.includes(e.toLowerCase());
                });
                filteredList.current = tempList;
              }}
              crossClicked={() => {
                setSearchTxt('');
                filteredList.current = [];
              }}
            />
          )}
          <View style={styles.contentView}>
            <FlatList
              data={searchTxt ? filteredList.current : props.list}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View key={index} style={styles.singleContact}>
                  <View style={styles.textSection}>
                    <Text numberOfLines={1} style={styles.title}>
                      {Platform.OS == 'android'
                        ? item.displayName
                        : item.givenName}
                    </Text>
                    <Text numberOfLines={2} style={styles.label}>
                      {item?.phoneNumbers[0]?.number}
                    </Text>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      onInviteClick(item?.phoneNumbers[0]?.number)
                    }>
                    <View
                      style={{
                        padding: 6,
                        paddingHorizontal: 15,
                        backgroundColor: AppColors.primaryPurple,
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{
                          color: AppColors.white.white,
                          ...AppStyles.textRegular,
                        }}>
                        Invite
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    height: isSmallDevice ? 400 : 500,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      ...AppStyles.textRegular,
                      color: AppColors.white.white,
                      fontSize: normalized(16),
                    }}>
                    No Contacts Found
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeviceContactsListModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColors.dark.darkLevel5,
  },
  contentView: {
    flex: 1,
    backgroundColor: AppColors.dark.darkLevel5,
    paddingVertical: 10,
  },
  singleContact: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalized(20),
    paddingHorizontal: normalized(10),
    paddingVertical: hv(8),
    marginVertical: hv(5),
    borderRadius: 10,
    backgroundColor: AppColors.white.white,
    borderColor: AppColors.dark.darkLevel3,
    borderWidth: 2,
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
  mainContainer: {
    height: normalized(50),
    marginLeft: normalized(20),
    marginRight: normalized(20),
    borderRadius: 64,
    backgroundColor: AppColors.white.white,
    ...AppStyles.horiCommon,
    ...AppStyles.shadowCommon,
    justifyContent: 'space-between',
    paddingHorizontal: normalized(20),
    marginTop: 10,
  },
  imageStyle: {
    height: normalized(18),
    width: normalized(18),
    tintColor: AppColors.dark.darkLevel1,
  },
  inputContainer: {
    fontFamily: AppFonts.Regular,
    color: AppColors.dark.darkLevel4,
    fontSize: normalized(16),
    flex: 1,
    marginLeft: normalized(8),
  },
});

const SearchComp = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={AppImages.Common.SearchIcon}
        resizeMode="contain"
        style={styles.imageStyle}
      />
      <TextInput
        value={props.searchTxt}
        style={styles.inputContainer}
        onChangeText={props.setSearchInput}
        placeholder="Search..."
        placeholderTextColor={AppColors.dark.darkLevel1}
      />
      {props.searchTxt !== '' && (
        <TouchableWithoutFeedback onPress={props.crossClicked}>
          <View
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Image
              source={AppImages.Common.CrossFilled}
              resizeMode="contain"
              style={{
                height: 15,
                width: 15,
                tintColor: AppColors.dark.darkLevel1,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};
