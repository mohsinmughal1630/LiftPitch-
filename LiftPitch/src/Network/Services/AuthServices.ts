import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AppStrings, Collections} from '../../Utils/Strings';
// import { notifications } from "react-native-firebase-push-notifications";
import {LoginManager, AccessToken} from 'react-native-fbsdk';

import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const userSignupRequest = async (
  userInput: any,
  getResponse: (userObj: any) => void,
) => {
  try {
    await auth()
      .createUserWithEmailAndPassword(userInput.email, userInput.password)
      .then(() => {
        let userId = auth()?.currentUser?.uid;
        firestore()
          .collection(Collections.Users)
          .doc(userId)
          .set({
            userName: userInput.userName,
            email: userInput.email,
            password: userInput.password,
            companyName: userInput?.companyName,
            companyRegNo: userInput?.companyRegNo,
            companyType: userInput?.companyType,
            companyLocation: userInput?.companyLocation,
            companyLogo: userInput?.companyLogo,
            // fcmToken: tk,
          })
          .then(docRef => {
            let loginObj = {
              ...userInput,
              userId: userId,
            };
            getResponse({status: true, data: loginObj});
          })
          .catch(error => {
            console.log('Error at adding user ', error);
            getResponse({status: false, message: ''});
          });
      })
      .catch(error => {
        let errorMsg = '';
        if (error.code === 'auth/email-already-in-use') {
          errorMsg = AppStrings.Network.emailAlreadyUse;
        } else if (error.code === 'auth/invalid-email') {
          errorMsg = AppStrings.Network.invalidEmail;
        } else if (error.code === 'auth/user-not-found') {
          errorMsg = AppStrings.Network.userNotFound;
        }
        getResponse({status: false, message: errorMsg});
      });
  } catch (e) {
    console.log(e);
    getResponse({status: false, message: e});
  }
};

export const loginRequest = async (
  userInput: any,
  complete: (userObj: any) => void,
) => {
  try {
    await auth()
      .signInWithEmailAndPassword(userInput.email, userInput.password)
      .then(() => {
        firestore()
          .collection(Collections.Users)
          .where('email', '==', userInput.email)
          .get()
          .then((querySnapshot: any) => {
            querySnapshot.forEach(async (doc: any) => {
              let loginObj = {
                ...doc.data(),
                userId: doc.id,
              };
              complete({status: true, data: loginObj});
            });
          })
          .catch(error => {
            console.log('Error while getting data', error);
            complete({status: false, message: ''});
          });
      });
  } catch (error: any) {
    let errorMsg = '';
    console.log('error?.code => ', error?.code);
    if (error?.code === 'auth/user-not-found') {
      errorMsg = AppStrings.Network.userNotFound;
    } else if (error?.code == 'auth/wrong-password') {
      errorMsg = AppStrings.Network.invalidPassword;
    }
    complete({status: false, message: errorMsg});
  }
};

export const logoutRequest = async (userId: string) => {
  try {
    // await setFCMTokenFirst(userId, null);
    // await CommonDataManager.getSharedInstance().logoutUser();
    await auth().signOut();
  } catch (e) {
    console.log(e);
  }
};
export const getUserFromFirebaseRequest = async (email: string) => {
  try {
    const snapshot = await firestore()
      .collection(Collections.Users)
      .where('email', '==', email)
      .get();
    if (snapshot.docs[0]) {
      const data = snapshot.docs[0].data();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error:', e);
    return null;
  }
};

export const onFacebookButtonPress = async () => {
  // Settings.setAppID('1693334904423187');
  // Settings.initializeSDK();

  try {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  } catch (error) {
    console.log(error);
  }

  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    console.log('result-------->', result);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log('data--------->', data);

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    console.log('facebookCredential------>', facebookCredential);

    if (!facebookCredential) {
      throw 'Something went wrong obtaining facebookCredential';
    }
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  } catch (error) {
    console.log('Signin with Facebook Error', error);
  }
};

export const onGoogleButtonPress = async () => {
  GoogleSignin.signOut();

  console.log('clicked111');

  try {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  } catch (error) {
    console.log(error);
  }

  try {
    // Get the users ID token
    const {user, idToken} = await GoogleSignin.signIn();

    if (!idToken) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    if (!googleCredential) {
      throw 'Something went wrong obtaining googleCredential';
    }

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then(() => {})
      .catch(error => {
        console.log('Google SignInWithCredential Error:', error);
        throw '';
      });
  } catch (error: any) {
    if (error.message == 'Sign in action cancelled') {
      console.log('printError - > ', error.message);
      return;
    }
    console.log('Signin with Google Error', error.message);
  }
};
