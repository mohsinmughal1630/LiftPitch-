import firestore from '@react-native-firebase/firestore';
import {Collections, CommentActionType} from '../../Utils/Strings';
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
          }

          // Set the modified array back into the document
          await firestore()
            .collection(Collections.POST_COLLECTION)
            .doc(videoId)
            .update({
              comments: commentsArr,
            })
            .then(() => {
              onComplete(commentsArr);
              console.log('Array value successfully updated!');
            })
            .catch((error: any) => {
              onComplete('error!');
              console.error('Error updating array value:', error);
            });
        });
      }
    })
    .catch((e: any) => {
      onComplete('error!');
      console.log('e-------->', e);
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
