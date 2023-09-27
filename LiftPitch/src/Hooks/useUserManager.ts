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
  return {
    deleteUser,
    logoutClicked,
    handleSearch,
    fetchUserFeed,
  };
};

export default useUserManager;
