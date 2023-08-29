import firestore from '@react-native-firebase/firestore';
import {Alert, Platform} from 'react-native';
import storage from '@react-native-firebase/storage';
import {setThreadList} from '../Redux/reducers/AppReducer';
import {sendPushNotification} from '../Network/Services/GeneralServices';
import {Collections} from '../Utils/Strings';

let CHANNEL_COLLECTION = 'channels';
let PARTICIPATION_COLLECTION = 'channel_participation';
let THREAD_COLLECITON = 'thread';
let POST_COLLECTION = 'Videos';

class ThreadManager {
  static instance = new ThreadManager();
  threadSubscriber: any = null;
  participantSubscriber: any = null;
  messageSubscriber: any = null;
  userSubscriber: any = null;
  selector: any = null;
  dispatch: any = null;
  threadList: any = [];
  userList: any = [];
  isAppLoaded: any = false;
  pushObj: any = {};
  dateFormater = {
    fullDate: 'Y-MM-DD HH:mm:ss.SSS Z',
    month: 'Y-MM-DD',
    time: 'HH:mm:ss',
  };
  setAppLoaded = () => {
    this.isAppLoaded = true;
  };
  setPushObj = (obj: any) => {
    this.pushObj = obj;
  };
  setupRedux(selector: any, dispatch: any) {
    this.selector = selector;
    this.dispatch = dispatch;
  }
  acceptParticipation = (channelID: any, userId: any, onComplete: any) => {
    firestore()
      .collection(PARTICIPATION_COLLECTION)
      .where('user', '==', userId)
      .where('channel', '==', channelID)
      .get()
      .then(snapDoc => {
        if (snapDoc.docs.length > 0) {
          firestore()
            .collection(PARTICIPATION_COLLECTION)
            .doc(snapDoc.docs[0].id)
            .update({
              status: 'accept',
            })
            .then(() => {
              let index = this.threadList.findIndex(
                (item: any) => item.channelID == channelID,
              );
              console.log('index====>', channelID, '====', index);
              if (index != -1) {
                let participants = this.threadList[index].participants;
                let partIndex = participants.findIndex(
                  (value: any) => value.user == userId,
                );
                if (partIndex != -1) {
                  participants[partIndex].status = 'accept';
                  this.threadList[index].participants = participants;
                  this.updateStateList();
                  onComplete(this.threadList[index]);
                }
              }
            });
        }
      })
      .catch(err => {
        console.log('acceptParticipation err======>', err);
      });
  };
  createThread = async (sender: any, receiver: any, docId: any, msg: any) => {
    let data = {
      lastMessage: msg,
      name: '',
      creatorID: sender.id,
      channelID: docId,
      id: docId,
      users: [sender.id, receiver.id],
    };
    return firestore().collection(CHANNEL_COLLECTION).doc(docId).set(data);
  };
  setupThreadListener = async (userId: any) => {
    this.threadSubscriber = firestore()
      .collection(CHANNEL_COLLECTION)
      .where('users', 'array-contains', userId)
      .onSnapshot(snapshot => {
        var newDocs: any = [];
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
          }
          if (change.type === 'modified') {
            newDocs.push(change.doc.data());
          }
          if (change.type === 'removed') {
          }
          this.updateList(newDocs);
        });
      });
  };
  updateList = (updatedDocsList: any) => {
    if (updatedDocsList.length > 0) {
      let newList = [];
      for (let i = 0; i < this.threadList.length; i++) {
        let obj = this.threadList[i];
        let index = updatedDocsList.findIndex(
          (item: any) => item.channelID == obj.channelID,
        );
        if (index != -1) {
          let newObj = {
            ...obj,
            ...updatedDocsList[index],
          };
          newList.push(newObj);
        } else {
          newList.push(obj);
        }
      }
      this.threadList = newList;
      this.updateStateList();
    }
  };
  setupParticipantListener = async (userId: any) => {
    this.participantSubscriber = firestore()
      .collection(PARTICIPATION_COLLECTION)
      .where('user', '==', userId)
      .onSnapshot(snapshot => {
        var newDocs: any = [];
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            if (this.checkThreadExist(change.doc.data()['channel']) == false) {
              newDocs.push(change.doc.data());
            }
          }
          if (change.type === 'modified') {
          }
          if (change.type === 'removed') {
            this.removeThreadObj(change.doc.data()['channel']);
          }
        });
        newDocs.map((doc: any) => {
          this.addNewThread(doc);
        });
      });
  };
  clearUnreadCount = (thread: any, userId: any) => {
    let data: any = {};
    data[`${userId}$$`] = 0;
    firestore()
      .collection(CHANNEL_COLLECTION)
      .doc(thread.channelID)
      .update(data);
  };
  removeThreadObj = (channelId: any) => {
    let index = this.threadList.findIndex(
      (item: any) => item.channelID == channelId,
    );
    if (index != -1) {
      firestore()
        .collection(CHANNEL_COLLECTION)
        .doc(channelId)
        .delete()
        .finally(() => {
          this.threadList.splice(index, 1);
          this.updateStateList();
        });
    }
  };
  //delete specific message
  deleMessage = async (channelID: any, msgId: any, onComplete: any) => {
    let index = this.threadList.findIndex(
      (item: any) => item.channelID == channelID,
    );
    if (index !== -1) {
      firestore()
        .collection(CHANNEL_COLLECTION)
        .doc(channelID)
        .collection(THREAD_COLLECITON)
        .doc(msgId)
        .delete()
        .finally(() => {
          console.log(
            'this.threadList====>',
            JSON.stringify(this.threadList[index]),
          );
          onComplete();
          // this.threadList.splice(index, 1);
          // this.updateStateList();
        })
        .catch(err => console.log('err========>', err));
    }
  };

  removeThreadFromDB = (channelId: any) => {
    firestore()
      .collection(PARTICIPATION_COLLECTION)
      .where('channel', '==', channelId)
      .get()
      .then(snapDoc => {
        if (snapDoc.docs.length > 0) {
          snapDoc.docs.forEach(doc => {
            firestore()
              .collection(PARTICIPATION_COLLECTION)
              .doc(doc.id)
              .delete();
          });
        }
      });
  };

  checkThreadExist = (threadId: any) => {
    let isExist = false;
    if (this.threadList.length > 0) {
      let index = this.threadList.findIndex(
        (item: any) => item.channelID == threadId,
      );
      if (index != -1) {
        isExist = true;
      }
    }
    return isExist;
  };
  addNewThread = (findedDoc: any) => {
    var collectionRef = firestore().collection(PARTICIPATION_COLLECTION);
    var channelFilter = collectionRef.where(
      'channel',
      '==',
      findedDoc['channel'],
    );
    var userFilter = channelFilter.where('user', '!=', findedDoc['user']);
    userFilter.get().then(snapDoc => {
      if (snapDoc.docs.length > 0) {
        let firstDoc = snapDoc.docs[0].data();
        firestore()
          .collection(CHANNEL_COLLECTION)
          .doc(findedDoc['channel'])
          .get()
          .then(findedThread => {
            let thread = {
              ...findedThread.data(),
              participants: [findedDoc, firstDoc],
            };
            this.threadList.push(thread);
            this.updateStateList();
          });
      }
    });
  };
  removeThreadObserver = () => {
    if (this.threadSubscriber) {
      this.threadSubscriber();
      this.participantSubscriber();
      this.userSubscriber();
    }
  };
  onSendCall = async (
    sender: any,
    receiver: any,
    docId: any,
    msg: any,
    onComplete: any,
  ) => {
    this.createThread(sender, receiver, docId, msg)
      .then(() => {
        this.createParticipant(sender, receiver, docId)
          .then(() => {
            let participantsList = [
              {
                channel: docId,
                user: sender.id,
                isAdmin: true,
                status: 'accept',
                userName: sender?.username
                  ? sender?.username
                  : sender?.firstName,
                userProfileImageUrl: sender?.image ? sender?.image : '',
              },
              {
                channel: docId,
                user: receiver.id,
                isAdmin: false,
                status: 'request',
                userName: receiver?.username
                  ? receiver?.username
                  : receiver?.firstname,
                userProfileImageUrl: receiver?.image ? receiver?.image : '',
              },
            ];
            let threadData = {
              lastMessage: msg,
              name: '',
              creatorID: sender.id,
              channelID: docId,
              id: docId,
              users: [sender.id, receiver.id],
              participants: participantsList,
            };
            this.threadList = [...this.threadList, threadData];
            onComplete(threadData);
          })
          .catch(error => {
            console.log('printError - > ', error);
            onComplete('error');
          });
      })
      .catch(err => {
        onComplete('error===>', err);
      });
  };
  createParticipant = async (sender: any, receiver: any, docId: any) => {
    let senderPromise = new Promise((resolve, reject) => {
      let senderPic = sender?.image
        ? sender?.image
        : sender.profileImage
        ? sender.profileImage
        : sender.profile_image;

      let data = {
        channel: docId,
        user: sender.id,
        isAdmin: true,
        status: 'accept',
        userName: sender?.username
          ? sender.username
          : sender.firstName
          ? sender.firstName
          : '',
        userProfileImageUrl: senderPic ? senderPic : '',
      };
      firestore()
        .collection(PARTICIPATION_COLLECTION)
        .add(data)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(true);
        });
    });
    let receiverPromise = new Promise((resolve, reject) => {
      let data = {
        channel: docId,
        user: receiver.id,
        isAdmin: false,
        status: 'request',
        userName: receiver?.username ? receiver?.username : receiver?.firstname,
        userProfileImageUrl: receiver?.image ? receiver?.image : '',
      };

      firestore()
        .collection(PARTICIPATION_COLLECTION)
        .add(data)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(true);
        });
    });
    return Promise.all([senderPromise, receiverPromise]);
  };
  // REQUEST METHODS
  getUserThread = async (userId: any, onComplete: any) => {
    firestore()
      .collection(PARTICIPATION_COLLECTION)
      .where('user', '==', userId)
      .get()
      .then(snapDoc => {
        if (snapDoc.docs.length > 0) {
          var promiseList = [];
          this.threadList = [];
          for (let i = 0; i < snapDoc.docs.length; i++) {
            let snapObj = snapDoc.docs[i].data();
            let promise = new Promise((resolve, reject) => {
              firestore()
                .collection(CHANNEL_COLLECTION)
                .doc(snapObj['channel'])
                .get()
                .then(snapDoc => {
                  let threadData = snapDoc.data();
                  firestore()
                    .collection(PARTICIPATION_COLLECTION)
                    .where('user', '!=', userId)
                    .where('channel', '==', snapObj['channel'])
                    .get()
                    .then(snapData => {
                      let findedData = {
                        ...threadData,
                        participants: [snapData.docs[0].data(), snapObj],
                      };
                      this.threadList = [...this.threadList, findedData];
                      // this.threadList.push(findedData);
                      resolve(true);
                    })
                    .catch(error => {
                      console.log('error------>', error);
                      reject(true);
                    });
                })
                .catch(error => {
                  console.log('error===---==>', error);
                  reject(error);
                });
            });
            promiseList.push(promise);
          }

          Promise.all(promiseList).finally(() => {
            this.updateStateList();
            onComplete(this.threadList);
          });
        } else {
          onComplete([]);
        }
      });
  };

  // UPDATE STATE LIST
  updateStateList = () => {
    let newArray = [];
    for (let i = 0; i < this.threadList.length; i++) {
      let obj = this.threadList[i];
      let index = newArray.findIndex(item => item.channelID == obj.channelID);

      if (index == -1) {
        newArray.push(obj);
      }
    }
    this.threadList = newArray;
    this.dispatch(setThreadList(newArray));
  };
  // MESSAGES METHOD
  sendMessage = async (docId: any, data: any) => {
    return firestore()
      .collection(CHANNEL_COLLECTION)
      .doc(docId)
      .collection(THREAD_COLLECITON)
      .doc(data.messageId)
      .set(data);
  };
  // SEND PUSH NOTIFICATION
  generatePushNotification = async (
    thread: any,
    sender: any,
    receiver: any,
    message: any,
    type: any,
  ) => {
    console.log(
      'sender.userName====>',
      sender?.userName,
      '====',
      receiver?.user,
    );
    let title = sender.userName;
    let findedUserIndex = this.userList.findIndex(
      (item: any) => item.userId == receiver?.user?.toString(),
    );
    if (findedUserIndex != -1) {
      let finededUserToken = this.userList[findedUserIndex].FCM_Token;
      let notification = {
        title: title,
        body: message,
      };
      let params = {
        to: finededUserToken,
        notification: notification,
        data: {
          ...thread,
          type: type,
        },
      };
      sendPushNotification(params, (type: any) => {
        if (type) {
          console.log('notification send', type);
        }
      });
    }
  };
  // MESSAGE LISTNERS
  getInitialThreadMessages = (threadId: any, onMessageUpdates: any) => {
    firestore()
      .collection(CHANNEL_COLLECTION)
      .doc(threadId)
      .collection(THREAD_COLLECITON)
      .limit(50)
      .orderBy('created', 'desc')
      .get()
      .then(snapShot => {
        var messagesList: any = [];
        snapShot.docs.forEach(doc => {
          messagesList.push(doc.data());
        });
        onMessageUpdates(messagesList);
      })
      .catch(() => {
        onMessageUpdates([]);
      });
  };
  setUpMessageListener = (threadId: any, onMessageUpdates: any) => {
    this.messageSubscriber = firestore()
      .collection(CHANNEL_COLLECTION)
      .doc(threadId)
      .collection(THREAD_COLLECITON)
      .onSnapshot(snapDocs => {
        var docsList: any = [];
        snapDocs.docChanges().forEach(change => {
          if (change.type == 'added') {
            docsList.push({
              type: 'added',
              data: change.doc.data(),
            });
          }
          if (change.type == 'modified') {
            docsList.push({
              type: 'modified',
              data: change.doc.data(),
            });
          }
        });
        if (docsList.length > 0) {
          onMessageUpdates(docsList);
        }
      });
  };
  updateMessageSeener = (docId: any, messagesList: any, userId: any) => {
    let promiseList: any = [];
    console.log('mMessageList - > ', userId);
    messagesList.forEach((item: any) => {
      let promise = new Promise((resolve: any, reject) => {
        firestore()
          .collection(CHANNEL_COLLECTION)
          .doc(docId)
          .collection(THREAD_COLLECITON)
          .doc(item.messageId)
          .update({
            lastMessageSeeners: [userId],
          })
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
      promiseList.push(promise);
    });
    Promise.all(promiseList).finally(() => {});
  };
  removeMessageListener = () => {
    if (this.messageSubscriber) {
      this.messageSubscriber();
    }
  };
  updateLastThreadMessage = (
    thread: any,
    lastMessage: any,
    otherUser: any,
    createAt: any,
    payload: any,
  ) => {
    let data: any = {};
    data['createdAt'] = createAt;
    if (payload?.reply) {
      data['reply'] = payload?.reply;
    }
    if (payload?.marked) {
      data['marked'] = payload.marked;
    }
    if (payload?.messageId) {
      data['messageId'] = payload.messageId;
    }
    data['lastMessage'] = lastMessage;

    if (otherUser) {
      data[`${otherUser.user}$$`] = 1;
      if (thread[`${otherUser.user}$$`]) {
        let count = thread[`${otherUser.user}$$`] + 1;
        thread[`${otherUser.user}$$`] = count;
        data[`${otherUser.user}$$`] = count;
      }
    }
    firestore()
      .collection(CHANNEL_COLLECTION)
      .doc(thread.channelID)
      .update(data)
      .catch(err => {
        console.log('errrrorr=====>', err);
      });
  };
  setupUserListener = () => {
    this.userSubscriber = firestore()
      .collection(Collections.Users)
      .onSnapshot(snapDocs => {
        this.userList = snapDocs.docs.map(doc => {
          return doc.data();
        });
      });
  };

  // SET FIREBASE TOKEN FOR FCM
  updateUserToken = async (token: any, userId: any) => {
    firestore()
      .collection(Collections.Users)
      .doc(userId)
      .update({
        FCM_Token: token,
      })
      .then(() => {
        console.log('Token Update at Firebase');
      })
      .catch(err => {
        console.log('updateUserToken====>', err);
      });
  };

  // COMMON METHOD
  makeid = (length: any) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  showPopUpWithOption = (title: any, message: any, okPress: any) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'Yes', onPress: () => okPress()},
        {text: 'No', onPress: () => console.log('no')},
      ],
      {cancelable: true},
    );
  };
  showPickerPop = (optionPress: any) => {
    Alert.alert(
      '',
      '',
      [
        {text: 'Camera', onPress: () => optionPress(0)},
        {text: 'Gallery', onPress: () => optionPress(1)},
      ],
      {cancelable: true},
    );
  };

  fetchMessageData = async (docId: any, messageId: any, onComplete: any) => {
    await firestore()
      .collection(CHANNEL_COLLECTION)
      .doc(docId)
      .collection(THREAD_COLLECITON)
      .where('messageId', '==', messageId)
      .get()
      .then(snapDoc => {
        if (snapDoc.docs.length > 0) {
          onComplete(snapDoc.docs[0]?._data?.lastMessageSeeners);
        }
      });
  };

  removeUserThread = async (thread: any) => {
    for (let i = 0; i < thread?.length; i++) {
      let id = thread[i]?.channelID;
      if (id) {
        await firestore()
          .collection(CHANNEL_COLLECTION)
          .doc(id)
          .delete()
          .finally(() => {});
      }
    }
    this.threadList = [];
  };
  removeParticpant = async (id: any) => {
    await firestore()
      .collection(PARTICIPATION_COLLECTION)
      .where('user', '==', id)
      .get()
      .then(snapDoc => {
        if (snapDoc.docs.length > 0) {
          snapDoc.docs.forEach(doc => {
            if (doc.id) {
              firestore()
                .collection(PARTICIPATION_COLLECTION)
                .doc(doc.id)
                .delete();
            }
          });
        }
      });
  };

  // IMAGE MESSAGE
  uploadMedia = async (uri: any, videoType: boolean, onComplete: any) => {
    let filename = this.makeid(6) + uri.substring(uri.lastIndexOf('/') + 1);
    let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    console.log('before fileName----->', filename);
    if (videoType && uploadUri.includes('mov')) {
      let fileArr = filename.split('.');
      const ext = fileArr[fileArr.length - 1];
      if (ext.toLowerCase() == 'mov') {
        filename = filename.replace(/mov/g, 'mp4');
      }
    }
    console.log('after fileName----->', filename);
    const ref = storage().ref(filename);
    const task = ref.putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      console.log(snapshot.state);
    });
    try {
      await task
        .then(item => {
          ref.getDownloadURL().then(url => {
            onComplete(url);
          });
        })
        .catch(error => {
          console.log('error getting url ', error);
          onComplete('error');
        });
    } catch (e) {
      onComplete('error');
    }
  };

  //Check is Already Connection or Not

  checkIsConnectionExist = async (
    senderId: any,
    reciverId: any,
    onComplete: any,
  ) => {
    let threadListArr: any = this.threadList;
    let newArr: any = [];
    console.log('threadListArr.length----->,', threadListArr.length);
    for (let i = 0; i < threadListArr.length; i++) {
      let threadObj = threadListArr[i];
      let participants = threadObj.participants;
      let isSenderIndex: any = participants.findIndex(
        (value: any) => value.user == senderId,
      );
      let isReciverIndex: any = participants.findIndex(
        (value: any) => value.user == reciverId,
      );
      console.log('senderIndex------>', isSenderIndex);
      console.log('reciverIndex------>', isReciverIndex);
      if (isSenderIndex != -1 && isReciverIndex != -1) {
        newArr.push(threadObj);
      }
    }
    onComplete(newArr?.length > 0 ? newArr[0] : null);
  };

  ////
  uploadVoiceMedia = async (uri: any, onComplete: any) => {
    const filename = this.makeid(6) + uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const ref = storage().ref(filename);
    const task = ref.putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {});
    try {
      await task
        .then(item => {
          ref.getDownloadURL().then(url => {
            onComplete(url);
          });
        })
        .catch(error => {
          console.log('error getting url ', error);
          onComplete('error');
        });
    } catch (e) {
      onComplete('error');
    }
  };

  createPost = async (params: any, onComplete: any) => {
    await firestore()
      .collection(POST_COLLECTION)
      .doc(params?.videoId)
      .set(params)
      .then(() => {
        onComplete('created Successfully');
      })
      .catch(err => {
        onComplete('error!');
        console.log('update====>', err);
      });
  };

  ////////////////////
}
export default ThreadManager;
