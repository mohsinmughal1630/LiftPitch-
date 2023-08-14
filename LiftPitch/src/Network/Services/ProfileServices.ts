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
  let senderPromise = new Promise((resolve, reject) => {
    getfollowPreviousList(sender?.id, (senderResult: any) => {
      if (senderResult?.userId && senderResult?.following?.length > 0) {
        let newArr = followingActionObj(
          action,
          reciver,
          senderResult?.following,
        );
        new Promise((resolve: any, reject) => {
          firestore()
            .collection(Collections.FOLLOW_N_FOLLOWING_COLLECTION)
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
        console.log('add new----->');
        let newObj = {
          userId: reciver?.id,
          follower: [],
          following: [reciver],
        };
        firestore()
          .collection(Collections.FOLLOW_N_FOLLOWING_COLLECTION)
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
  let receiverPromise = new Promise((resolve, reject) => {
    getfollowPreviousList(reciver?.id, (receiverResult: any) => {
      if (receiverResult?.userId && receiverResult?.follower?.length > 0) {
        let newArr = followingActionObj(
          action,
          sender,
          receiverResult?.follower,
        );
        new Promise((resolve: any, reject) => {
          firestore()
            .collection(Collections.FOLLOW_N_FOLLOWING_COLLECTION)
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
          userId: sender?.id,
          follower: [sender],
          following: [],
        };
        firestore()
          .collection(Collections.FOLLOW_N_FOLLOWING_COLLECTION)
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
    .collection(Collections.FOLLOW_N_FOLLOWING_COLLECTION)
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
    .collection(Collections.FOLLOW_N_FOLLOWING_COLLECTION)
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

export const fetchFollowingList = async (id: any, onComplete: any) => {
  await firestore()
    .collection(Collections.FOLLOW_N_FOLLOWING_COLLECTION)
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
