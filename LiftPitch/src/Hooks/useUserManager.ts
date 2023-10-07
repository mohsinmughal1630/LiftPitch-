import {useDispatch, useSelector} from 'react-redux';
import ThreadManager from '../ChatModule/ThreadManger';
import firestore from '@react-native-firebase/firestore';

import {
  setIsAlertShow,
  setIsLoader,
  setIsPersisterUser,
  setUserData,
} from '../Redux/reducers/AppReducer';
import {saveUserData} from '../Utils/AsyncStorage';
import {logoutRequest} from '../Network/Services/AuthServices';
import {AppStrings, Collections} from '../Utils/Strings';
import {searchUserfromFB} from '../Network/Services/ProfileServices';
import {checkIsAlreadyReported} from '../Network/Services/VideoListingServices';
const useUserManager = () => {
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const dispatch = useDispatch();
  const logoutClicked = async () => {
    await ThreadManager.instance.updateUserToken(
      '',
      selector?.userData?.userId?.toString(),
    );
    dispatch(setIsLoader(true));
    dispatch(setUserData(null));
    dispatch(setIsPersisterUser(false));
    saveUserData(null);

    await logoutRequest(selector?.userData?.userId).finally(() =>
      dispatch(setIsLoader(false)),
    );
  };
  const deleteUser = async () => {
    dispatch(setIsLoader(true));
    await ThreadManager.instance.userDeleteFun(
      true,
      selector?.userData?.userId?.toString(),
      async (onResponse: any) => {
        if (onResponse?.status) {
          await logoutClicked();
        } else {
          dispatch(setIsLoader(false));
        }
      },
    );
  };
  const handleSearch = async (txt: any, onComplete: any) => {
    if (!selector?.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      onComplete([]);
      return;
    }
    await searchUserfromFB(
      selector?.userData?.userId,
      txt.toLowerCase(),
      (response: any) => {
        onComplete(response);
      },
    );
  };
  const fetchUserFeed = async (userId: any, onComplete: any) => {
    if (!selector?.isNetConnected) {
      dispatch(
        setIsAlertShow({
          value: true,
          message: AppStrings.Network.internetError,
        }),
      );
      onComplete([]);
      return;
    }
    await firestore()
      .collection(Collections.POST_COLLECTION)
      .where('creatorData.userId', '==', userId)
      .get()
      .then((querySnapshot: any) => {
        const filteredDocs: any = [];
        querySnapshot.forEach((doc: any) => {
          const documentData = doc.data();
          filteredDocs.push({
            id: doc.id,
            ...documentData,
          });
        });
        onComplete(filteredDocs);
      })
      .catch(error => {
        onComplete([]);
        console.error('Error getting documents: ', error);
      });
  };
  const getRecentVisitedList = (users: any) => {
    users.sort((a: any, b: any) => {
      const dateA: any = new Date(a.visitedDateTime);
      const dateB: any = new Date(b.visitedDateTime);
      return dateB - dateA;
    });
    return users.slice(0, 5);
  };
  const setPushState = async (val: any, onComplete: any) => {
    dispatch(setIsLoader(true));
    await ThreadManager.instance.setPushIsEnable(
      val,
      selector?.userData?.userId?.toString(),
      async (onResponse: any) => {
        onComplete();
        dispatch(setIsLoader(false));
      },
    );
  };

  const reportProblemFun = async (reason: any, onComplete: any) => {
    dispatch(setIsLoader(true));
    await checkIsAlreadyReported(
      selector?.userData?.userId,
      async (result: any) => {
        if (result?.data) {
          let updateArr = [
            ...result?.data,
            {
              type: 'Reported Problem',
              reason: reason,
            },
          ];
          await firestore()
            .collection(Collections.REPORTED_USER)
            .doc(selector?.userData?.userId)
            .update({reported_User_List: updateArr})
            .then(() => {
              onComplete('reported Successfully!');
            })
            .catch((error: any) => {
              onComplete('error!');
              console.error('Error updating array value:', error);
            });
        } else {
          let updateObj: any = {
            reportedById: selector?.userData?.userId,
            reported_User_List: [
              {
                type: 'Reported Problem',
                reason: reason,
              },
            ],
          };
          await firestore()
            .collection(Collections.REPORTED_USER)
            .doc(selector?.userData?.userId)
            .set(updateObj)
            .then(() => {
              onComplete('reported Successfully!');
            })
            .catch((error: any) => {
              onComplete('error!');
              console.error('Error updating array value:', error);
            });
        }
        dispatch(setIsLoader(false));
      },
    );
  };
  return {
    deleteUser,
    logoutClicked,
    handleSearch,
    fetchUserFeed,
    getRecentVisitedList,
    setPushState,
    reportProblemFun,
  };
};

export default useUserManager;
