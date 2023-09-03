import firestore from '@react-native-firebase/firestore';
import {Collections, CommentActionType} from '../../Utils/Strings';
import {getUserData} from '../../Utils/AsyncStorage';
export const addNUpdateCommentReq = async (
  obj: any,
  action: any,
  videoId: any,
  onComplete: any,
) => {
  await firestore()
    .collection(Collections.POST_COLLECTION)
    .where('videoId', '==', videoId)
    .get()
    .then((snapDoc: any) => {
      if (snapDoc.docs.length > 0) {
        snapDoc.docs.forEach(async (doc: any) => {
          let data = doc.data();
          let commentsArr: any =
            data?.comments?.length > 0 ? data?.comments : [];
          if (action == CommentActionType.addComment) {
            commentsArr = [...commentsArr, {...obj, reply: []}];
          } else if (action == CommentActionType.reply) {
            const indexToUpdate = commentsArr.findIndex(
              (item: any) => item?.commentId === obj?.PCommentId,
            );
            if (indexToUpdate !== -1) {
              let replyArr: any =
                commentsArr[indexToUpdate]?.reply?.length > 0
                  ? [...commentsArr[indexToUpdate]?.reply, obj]
                  : [{...obj}];

              commentsArr[indexToUpdate].reply = replyArr;
            }
          } else if (action == CommentActionType.deleteComment) {
            if (obj?.type == 'reply') {
              const indexToUpdate = commentsArr.findIndex(
                (item: any) => item?.commentId === obj?.PCommentId,
              );
              if (indexToUpdate !== -1) {
                let replyArr: any = commentsArr[indexToUpdate]?.reply.filter(
                  function (returnableObjects: any) {
                    return returnableObjects.commentId !== obj?.commentId;
                  },
                );
                commentsArr[indexToUpdate].reply = replyArr;
              }
            } else {
              const indexToUpdate = commentsArr.findIndex(
                (item: any) => item?.commentId === obj?.commentId,
              );
              if (indexToUpdate != -1) {
                commentsArr[indexToUpdate].isDeleted = true;
              }
            }
          } else if (action == CommentActionType.reportComment) {
            await checkIsAlreadyReported(obj, async (result: any) => {
              if (result?.action) {
                onComplete(
                  `you already reported ${obj?.reportedTo?.name} against this comment!`,
                );
              } else {
                if (result?.data) {
                  let updateArr = [
                    ...result?.data,
                    {
                      reportedTo: obj?.reportedTo,
                      commentId: obj?.commentId,
                      PCommentId: obj?.PCommentId ? obj?.PCommentId : '',
                      type: obj?.type ? obj?.type : 'comment',
                      reason: obj?.reason,
                    },
                  ];

                  await firestore()
                    .collection(Collections.REPORTED_USER)
                    .doc(obj?.reportedBy?.userId)
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
                    reportedById: obj?.reportedBy?.userId,
                    reported_User_List: [
                      {
                        reportedTo: obj?.reportedTo,
                        commentId: obj?.commentId,
                        PCommentId: obj?.PCommentId ? obj?.PCommentId : '',
                        type: obj?.type ? obj?.type : 'comment',
                        reason: obj?.reason,
                      },
                    ],
                  };
                  await firestore()
                    .collection(Collections.REPORTED_USER)
                    .doc(obj?.reportedBy?.userId)
                    .set(updateObj)
                    .then(() => {
                      onComplete('reported Successfully!');
                    })
                    .catch((error: any) => {
                      onComplete('error!');
                      console.error('Error updating array value:', error);
                    });
                }
              }
            });
          }
          if (action != CommentActionType.reportComment) {
            // Set the modified array back into the document
            await firestore()
              .collection(Collections.POST_COLLECTION)
              .doc(videoId)
              .update({
                comments: commentsArr,
              })
              .then(() => {
                onComplete(commentsArr);
              })
              .catch((error: any) => {
                onComplete('error!');
                console.error('Error updating array value:', error);
              });
          }
        });
      }
    })
    .catch((e: any) => {
      onComplete('error!');
      console.log('e-------->', e);
    });
};
export const likeNDisListReq = async (
  userId: any,
  action: any,
  videoId: any,
  onComplete: any,
) => {
  await firestore()
    .collection(Collections.POST_COLLECTION)
    .where('videoId', '==', videoId)
    .get()
    .then((snapDoc: any) => {
      if (snapDoc.docs.length > 0) {
        snapDoc.docs.forEach(async (doc: any) => {
          let data = doc.data();
          let likeArr: any = data?.like?.length > 0 ? data?.like : [];

          if (action == 'add') {
            likeArr = [...likeArr, userId];
          } else if (action == 'remove') {
            likeArr = likeArr.filter((el: any) => el != userId);
          }
          await firestore()
            .collection(Collections.POST_COLLECTION)
            .doc(videoId)
            .update({
              like: likeArr,
            })
            .then(() => {
              onComplete(likeArr);
            })
            .catch((error: any) => {
              onComplete('error!');
              console.error('Error updating array value:', error);
            });
        });
      }
    });
};
const checkIsAlreadyReported = async (val: any, onResponse: any) => {
  await firestore()
    .collection(Collections.REPORTED_USER)
    .doc(val?.reportedBy?.userId)
    .get()
    .then((snapDoc: any) => {
      if (snapDoc?._data) {
        for (let i = 0; i < snapDoc?._data?.reported_User_List?.length; i++) {
          let singleVal: any = snapDoc?._data?.reported_User_List[i];
          if (
            singleVal?.commentId == val?.commentId &&
            singleVal?.reportedTo?.userId == val?.reportedTo?.userId
          ) {
            onResponse({action: true});
            return;
          }
        }
        onResponse({action: false, data: snapDoc?._data?.reported_User_List});
      } else {
        onResponse({action: false});
      }
    })
    .catch((e: any) => {
      console.log('error----------', e);
    });
};
export const getCommentListingAgainstVideo = async (
  videoId: any,
  onComplete: any,
) => {
  console.log('videoId======>', videoId);
  await firestore()
    .collection(Collections.POST_COLLECTION)
    .where('videoId', '==', videoId)
    .get()
    .then((snapDoc: any) => {
      if (snapDoc.docs.length > 0) {
        snapDoc.docs.forEach(async (doc: any) => {
          let data = doc.data();
          onComplete(data?.comments?.length > 0 ? data?.comments : []);
        });
      }
    })
    .catch((e: any) => {
      onComplete('error!');
      console.log('e at get Comment List-------->', e);
    });
};

export const getUpdatedVideoListing = async (
  currentUserData: any,
  tab: any,
  limit: any,
  currentPage: any,
  onUpdates: any,
) => {
  await firestore()
    .collection(Collections.POST_COLLECTION)
    .orderBy('createdAt', 'desc')
    .limit(limit * currentPage)
    .get()
    .then(snapShot => {
      var list: any = [];
      snapShot?.docs.forEach((doc, index) => {
        if (tab == 0) {
          checkIsUserExistInMyFollowerFolloingList(
            currentUserData,
            doc.data()?.creatorData?.userId,
            (result: any) => {
              if (result) {
                list = [...list, doc.data()];
              }
            },
          );
        } else {
          list.push(doc.data());
        }
      });
      setTimeout(() => {
        console.log('list-------->', list?.length);
        onUpdates(list);
      }, 1000);
    })
    .catch(() => {
      onUpdates([]);
    });
};

export const getVideoListSize = async (onComplete: any) => {
  await firestore()
    .collection(Collections.POST_COLLECTION)
    .get()
    .then(snapShot => {
      onComplete(snapShot.docs?.length);
    })
    .catch(() => {});
};

export const checkIsUserExistInMyFollowerFolloingList = async (
  currentUser: any,
  otherUserId: any,
  onComplete: any,
) => {
  let status = false;
  if (otherUserId == currentUser?.userId) {
    status = true;
  } else if (currentUser?.follower?.length > 0) {
    for (let i = 0; i < currentUser?.follower?.length; i++) {
      let followerId = currentUser?.follower[i]?.id;
      if (followerId == otherUserId) {
        status = true;
      }
    }
  } else if (currentUser?.following?.length > 0) {
    for (let i = 0; i < currentUser?.following?.length; i++) {
      let followingId = currentUser?.following[i]?.id;
      if (followingId == otherUserId) {
        status = true;
      }
    }
  }

  onComplete(status);
};
