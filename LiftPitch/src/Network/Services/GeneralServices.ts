import {Platform} from 'react-native';
import {makeid} from '../../Utils/AppConstants';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import {PUSH_NOTIFICATION_URL} from '../Urls';

// Uploading File
export const uploadMedia = async (
  uri: string,
  onComplete: (url: string | null) => void,
) => {
  const filename = makeid(6) + uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
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
          console.log('url is ', url);
          onComplete(url);
        });
      })
      .catch(error => {
        console.log('error getting url ', error);
        onComplete(null);
      });
  } catch (e) {
    onComplete(null);
  }
};

export const sendPushNotification = async (params: any, onComplete: any) => {
  const urlForApiCall = PUSH_NOTIFICATION_URL;
  const authToken = `Bearer AAAA875doQE:APA91bGhsaO3JE2A_PzT3vZVgl2B358wDjgIEr42bzCRTzy7k1ipKWnsL9tKrrSPpdyb7rFM2o4YjkQCpKrN5bH5dVSKsAo1DoMVoe8cLsXXdxN3rVUc5P72YnfRPtNBDj67nYJ3R0Z_`;
  console.log('push Params=====>', params);
  await axios({
    method: 'post',
    url: urlForApiCall,
    data: params,
    headers: {
      Authorization: authToken,
      'Content-Type': `application/json`,
    },
  })
    .then(() => {
      console.log('succesFully Send Notification====>');
      onComplete(true);
    })
    .catch(async error => {
      console.log('error Send Notification====>', error);
      onComplete(false);
    });
};
