import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {hv, normalized, ScreenProps} from '../../../../Utils/AppConstants';
import {AppStyles} from '../../../../Utils/AppStyles';
import ContactHeader from '../../../Components/Header/ContactHeader';
import SingleHomeSection from '../Components/SingleHomeSection';
import {
  setLoader,
  setTab,
  toggleDrawer,
  setMoveToScreen,
  setAlertObj,
  setMoveToParams,
  setCardClickedFromHome,
  setSettingsData,
  setShowWalkthrough,
} from '../../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import {AppStrings} from '../../../../Utils/Strings';
import {Routes} from '../../../../Utils/Routes';
import {getAllCardsRequest} from '../../../../Network/Services/GeneralServices';
import EmptyCardsComponent from '../../Functions/Components/EmptyCardsComponent';
import CommonDataManager from '../../../../Utils/CommonManager';
import {settingPagesRequest} from '../../../../Network/Services/SettingServices';
import WalkthroughModal from '../../../Components/Model/WalkthroughModal';
import {ActiveFunctionTypeStrings} from '../../../../Utils/AppEnums';
const HomeScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {
    isNetConnected,
    isLoaderStart,
    settingsData,
    showWalkthrough,
    teamId,
    isComingFromTeam,
  } = useSelector((state: AppRootStore) => state.AppReducer);
  const [sectionData, setSectionData] = useState<Array<any>>([]);
  const [emergencyList, setEmergencyList] = useState<Array<any>>([]);
  const [customUrlsList, setCustomUrlsList] = useState<Array<any>>([]);
  const [paymentList, setPaymentList] = useState<Array<any>>([]);
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [combinedList, setCombinedList] = useState<any>([]);
  const [uploadFilesList, setUploadFilesList] = useState([]);

  const resetListFirst = () => {
    setEmergencyList([]);
    setCustomUrlsList([]);
    setPaymentList([]);
    setUploadFilesList([]);
    setCombinedList([]);
    setSectionData([]);
  };

  useEffect(() => {
    resetListFirst();
    getCardsListings();
  }, [teamId]);

  const getCardsListings = async (hideLoader = false) => {
    if (!hideLoader) {
      dispatch(setLoader(true));
    }
    let response: any = await getAllCardsRequest(isNetConnected, teamId).catch(
      e => turnOffLoading(),
    );
    if (response.success) {
      setCombinedList(response.data);
      createList(response.data);
      if (!settingsData) {
        await getSettingsData();
      } else {
        turnOffLoading();
      }
    } else {
      turnOffLoading();
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: response?.message,
        }),
      );
    }
  };

  const getSettingsData = async () => {
    dispatch(setLoader(true));
    let response: any = await settingPagesRequest(isNetConnected).finally(() =>
      turnOffLoading(),
    );

    if (response.success) {
      dispatch(setSettingsData(response.data));
    } else {
      dispatch(
        setAlertObj({
          title: AppStrings.Network.errorTitle,
          message: response?.message,
        }),
      );
    }
  };

  const turnOffLoading = () => {
    dispatch(setLoader(false));
    setIsApiCalled(true);
    setIsRefreshing(false);
  };

  // Creating Combined List
  const createList = (data: any) => {
    if (data?.cardCount > 0) {
      let tempArr = [];
      let list = data?.cards.sort(
        (a: {id: number}, b: {id: number}) => b?.id - a?.id,
      );
      tempArr.push({
        title: `Your Cards (${data.cardCount})`,
        label: 'Your Personal And Business Cards',
        images: list?.map((item: any) => {
          return {
            img: item?.profile_image ? item?.profile_image : '',
          };
        }),
      });
      setSectionData(tempArr); // personal and business cards list
    }

    let tempPayList: Array<any> = [];

    // Creating venmo list
    if (data?.venmoCount > 0) {
      let list = data?.venmos.sort(
        (a: {id: number}, b: {id: number}) => b?.id - a?.id,
      );
      let newList = list.map((el: any) => {
        return {
          id: el.id,
          title: el.title,
          label: el?.url_path,
          images: [
            {
              img: '',
            },
          ],
          type: 'venmo',
        };
      });
      tempPayList = tempPayList.concat(newList);
    }

    // Creating cashApp list
    if (data?.cashAppCount > 0) {
      let list = data?.cashApps.sort(
        (a: {id: number}, b: {id: number}) => b?.id - a?.id,
      );
      let newList = list.map((el: any) => {
        return {
          id: el.id,
          title: el.title,
          label: el?.url_path,
          images: [
            {
              img: '',
            },
          ],
          type: 'cashApp',
        };
      });
      tempPayList = tempPayList.concat(newList);
    }

    // Creating cashApp list
    if (data?.customPaymentCount > 0) {
      let list = data?.customPayments.sort(
        (a: {id: number}, b: {id: number}) => b?.id - a?.id,
      );
      let newList = list.map((el: any) => {
        return {
          id: el.id,
          title: el.title,
          label: el?.url_path,
          images: [
            {
              img: '',
            },
          ],
          type: ActiveFunctionTypeStrings.custom_payment,
        };
      });
      tempPayList = tempPayList.concat(newList);
    }

    setPaymentList(tempPayList);

    // Emergency Contacts list here
    if (data?.emergencyContactCount > 0) {
      let list = data?.emergencyContacts.sort(
        (a: {id: number}, b: {id: number}) => b?.id - a?.id,
      );
      let newList = list.map((el: any) => {
        let fullName = `${
          el?.first_name
            ? CommonDataManager.getSharedInstance().capitalizeFirstLetter(
                el?.first_name,
              )
            : ''
        } ${
          el?.last_name
            ? CommonDataManager.getSharedInstance().capitalizeFirstLetter(
                el.last_name,
              )
            : ''
        }`;
        return {
          id: el.id,
          title: fullName,
          label: CommonDataManager.getSharedInstance().getFormattedPhoneNumber(
            el.country_phone,
            el.phone_number,
            false,
          ),
          images: [
            {
              img: el?.image,
            },
          ],
        };
      });
      setEmergencyList(newList);
    }

    // Creating custom Urls
    if (data?.customUrlCount > 0) {
      let list = data?.customUrls.sort(
        (a: {id: number}, b: {id: number}) => b?.id - a?.id,
      );
      let newList = list.map((el: any) => {
        return {
          id: el.id,
          title: el.title,
          label: el?.url_path,
          images: [
            {
              img: '',
            },
          ],
          type: 'url',
        };
      });
      setCustomUrlsList(newList);
    }

    // Creating Upload Files Url
    if (data?.fileUploadCount > 0) {
      let list = data?.fileUploads.sort(
        (a: {id: number}, b: {id: number}) => b?.id - a?.id,
      );
      let newList = list.map((el: any) => {
        return {
          id: el.id,
          title: el.title,
          label: el?.url_path,
          images: [
            {
              img: '',
            },
          ],
          type: 'uploadFiles',
        };
      });
      setUploadFilesList(newList);
    }
  };
  const [isRefreshing, setIsRefreshing] = useState(false);
  return (
    <View style={AppStyles.MainStyle}>
      <ContactHeader onMenuPress={() => dispatch(toggleDrawer(true))} />
      <View style={styles.subContainer}>
        <FlatList
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            getCardsListings(true);
          }}
          data={
            !sectionData[0] &&
            emergencyList?.length == 0 &&
            customUrlsList?.length == 0 &&
            paymentList?.length == 0 &&
            uploadFilesList?.length == 0
              ? []
              : [1, 2, 3, 4, 5]
          }
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return index == 0 ? (
              <SingleHomeSection
                key={index}
                index={index}
                sectionTitle={sectionData[0]?.title}
                list={sectionData}
                onPress={() => {
                  dispatch(setMoveToScreen(Routes.Function.cardsListingScreen));
                  dispatch(setTab(2));
                }}
              />
            ) : index == 1 ? (
              <SingleHomeSection
                key={index}
                sectionTitle={`Payment Services ${
                  paymentList ? `(${paymentList?.length})` : ''
                }`}
                list={paymentList}
                index={index}
                onPress={(type, el) => {
                  let tempList =
                    type == 'cashApp'
                      ? combinedList?.cashApps
                      : type == ActiveFunctionTypeStrings.custom_payment
                      ? combinedList?.customPayments
                      : combinedList?.venmos;
                  const foundCard = tempList.find((e: any) => e?.id == el.id);
                  let params: any = {
                    isPreview: true,
                  };
                  params['paymentCard'] = foundCard;
                  dispatch(setMoveToParams(params));
                  dispatch(
                    setMoveToScreen(Routes.Function.createPaymentScreen),
                  );
                  dispatch(setCardClickedFromHome(true));
                  dispatch(setTab(2));
                }}
              />
            ) : index == 2 ? (
              <SingleHomeSection
                key={index}
                sectionTitle={`Emergency Contacts ${
                  emergencyList ? `(${emergencyList?.length})` : ''
                }`}
                list={emergencyList}
                onPress={(type, el) => {
                  const foundCard = combinedList?.emergencyContacts?.find(
                    (e: any) => e?.id == el.id,
                  );
                  let params: any = {
                    isPreview: true,
                    contactCard: foundCard,
                  };
                  dispatch(setMoveToParams(params));
                  dispatch(
                    setMoveToScreen(
                      Routes.Function.createEmergencyContactScreen,
                    ),
                  );
                  dispatch(setCardClickedFromHome(true));
                  dispatch(setTab(2));
                }}
              />
            ) : index == 3 ? (
              <SingleHomeSection
                key={index}
                sectionTitle={`Custom URL's ${
                  customUrlsList ? `(${customUrlsList?.length})` : ''
                }`}
                list={customUrlsList}
                index={index}
                onPress={(type, el) => {
                  const foundCard = combinedList?.customUrls?.find(
                    (e: any) => e?.id == el.id,
                  );
                  let params: any = {
                    urlCard: foundCard,
                  };
                  dispatch(setMoveToParams(params));
                  dispatch(setMoveToScreen(Routes.Function.addCustomUrlScreen));
                  dispatch(setCardClickedFromHome(true));
                  dispatch(setTab(2));
                }}
              />
            ) : index == 4 ? (
              <SingleHomeSection
                key={index}
                sectionTitle={`File Upload ${
                  uploadFilesList ? `(${uploadFilesList?.length})` : ''
                }`}
                list={uploadFilesList}
                index={index}
                onPress={(type, el) => {
                  const foundCard = combinedList?.fileUploads?.find(
                    (e: any) => e?.id == el.id,
                  );
                  let params: any = {
                    uploadFilesCard: foundCard,
                  };
                  dispatch(setMoveToParams(params));
                  dispatch(
                    setMoveToScreen(Routes.Function.createUploadFilesScreen),
                  );
                  dispatch(setCardClickedFromHome(true));
                  dispatch(setTab(2));
                }}
              />
            ) : null;
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return !isLoaderStart && isApiCalled ? (
              <EmptyCardsComponent
                content={`You dont have any function, \n lets create your first function for best experience!`}
                btnTitle="Create Function"
                onButtonClick={() => {
                  props.navigation.popToTop();
                  dispatch(setTab(2));
                }}
                outerContainerStyle={{
                  paddingHorizontal: normalized(10),
                }}
              />
            ) : null;
          }}
          ListFooterComponent={() => (
            <View
              style={{
                height: hv(60),
              }}
            />
          )}
          ListHeaderComponent={() => (
            <View
              style={{
                height: hv(30),
              }}
            />
          )}
        />
      </View>
      {showWalkthrough && (
        <WalkthroughModal
          onClose={() => {
            dispatch(setShowWalkthrough(false));
          }}
        />
      )}
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    paddingHorizontal: normalized(5),
  },
});
