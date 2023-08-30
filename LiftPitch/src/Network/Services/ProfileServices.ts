import {followingActionObj} from '../../Utils/Helper';
import {Collections} from '../../Utils/Strings';
import firestore from '@react-native-firebase/firestore';

export const getOtherUserProfile = async (id: any, onComplete: any) => {
  await firestore()
    .collection(Collections.Users)
    .where('userId', '==', id)
    .get()
    .then((snapDoc: any) => {
      if (snapDoc.docs.length > 0) {
        snapDoc.docs.forEach((doc: any) => {
          let result = {...doc?._data};
          if (result?.password) {
            delete result?.password;
          }
          onComplete(result);
        });
      }
    });
};

export const followNFollowingUser = async (
  sender: any,
  reciver: any,
  action: any,
  onComplete: any,
) => {
  let senderPromise = new Promise(async (resolve, reject) => {
    await getfollowPreviousList(sender?.id, async (senderResult: any) => {
      if (senderResult?.following?.length > 0) {
        let newArr = await followingActionObj(
          action,
          reciver,
          senderResult?.following,
        );
        new Promise((resolve: any, reject) => {
          firestore()
            .collection(Collections.Users)
            .doc(sender?.id)
            .update({
              following: newArr,
            })
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        });
      } else {
        let newObj = {
          ...senderResult,
          following: [reciver],
        };

        firestore()
          .collection(Collections.Users)
          .doc(sender?.id)
          .set(newObj)
          .then(() => {
            resolve(true);
          })
          .catch(err => {
            reject(true);
            console.log('update====>', err);
          });
      }
    });
  });
  let receiverPromise = new Promise(async (resolve, reject) => {
    await getfollowPreviousList(reciver?.id, async (receiverResult: any) => {
      if (receiverResult?.follower?.length > 0) {
        let newArr = await followingActionObj(
          action,
          sender,
          receiverResult?.follower,
        );
        new Promise((resolve: any, reject) => {
          firestore()
            .collection(Collections.Users)
            .doc(reciver?.id)
            .update({
              follower: newArr,
            })
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        });
      } else {
        let newObj = {
          ...receiverResult,
          follower: [sender],
        };
        firestore()
          .collection(Collections.Users)
          .doc(reciver?.id)
          .set(newObj)
          .then(() => {
            resolve(true);
          })
          .catch(err => {
            reject(true);
            console.log('update====>', err);
          });
      }
    });
  });
  onComplete(Promise.all([senderPromise, receiverPromise]));
};
export const getfollowPreviousList = async (id: any, onComplete: any) => {
  await firestore()
    .collection(Collections.Users)
    .doc(id)
    .get()
    .then((snapDoc: any) => {
      if (snapDoc?._data) {
        onComplete(snapDoc?._data);
      } else {
        onComplete(null);
      }
    });
};

export const checkUserFollowState = async (
  id: any,
  otherUserId: any,
  onComplete: any,
) => {
  await firestore()
    .collection(Collections.Users)
    .doc(id)
    .get()
    .then((snapDoc: any) => {
      if (snapDoc?._data?.following?.length > 0) {
        let status = false;
        for (let i = 0; i < snapDoc?._data?.following?.length; i++) {
          let singleObj = snapDoc?._data?.following[i];
          if (singleObj?.id == otherUserId) {
            status = true;
          }
        }
        onComplete(status);
      } else {
        onComplete(false);
      }
    });
};

export const fetchFollowingList = async (id: string, onComplete: any) => {
  await firestore()
    .collection(Collections.Users)
    .doc(id)
    .get()
    .then((snapDoc: any) => {
      let obj: any = {};
      if (snapDoc?._data?.userId) {
        obj = snapDoc?._data;
      }
      onComplete(obj);
    });
};

export const searchUserfromFB = async (
  userId: any,
  searchText: any,
  onComplete: any,
) => {
  const usersRef = firestore().collection(Collections.Users);

  usersRef
    .where('userName', '>=', searchText)
    .where('userName', '<=', searchText + '\uf8ff')
    .get()
    .then(querySnapshot => {
      let results: any = [];
      querySnapshot.forEach(doc => {
        if (userId != doc?.data()?.userId) {
          results.push({
            userId: doc?.data()?.userId,
            userName: doc?.data()?.userName,
            profile: doc?.data()?.companyLogo,
            description: doc?.data()?.companyType,
          });
        }
      });
      onComplete(results);
    })
    .catch(error => {
      console.error('Error searching documents:', error);
    });
};
