import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AppStrings, Collections } from '../../Utils/Strings';
// import { notifications } from "react-native-firebase-push-notifications";

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
            getResponse({ status: true, data: loginObj });
          })
          .catch(error => {
            console.log('Error at adding user ', error);
            getResponse({ status: false, message: '' });
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
        getResponse({ status: false, message: errorMsg });
      });
  } catch (e) {
    console.log(e);
    getResponse({ status: false, message: e });
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
              console.log(loginObj);
              complete({ status: true, data: loginObj });
              console.log('here 7');
            });
          })
          .catch(error => {
            console.log('Error while getting data', error);
            complete({ status: false, message: '' });
          });
      });
  } catch (error: any) {
    console.log("error (loginRequest): ", error);
    let errorMsg = '';
    console.log('error?.code => ', error?.code);
    if (error?.code === 'auth/user-not-found') {
      errorMsg = AppStrings.Network.userNotFound;
    } else if (error?.code == 'auth/wrong-password') {
      errorMsg = AppStrings.Network.invalidPassword;
    }
    console.log('here 10');
    complete({ status: false, message: errorMsg });
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

export const getAllUsers = async (userId: string) => {
  try {
    const querySnapshot = await firestore()
      .collection(Collections.Users)
      .get();

    let usersList: Array<any> = [];

    querySnapshot.forEach((doc) => {
      usersList.push(doc.data());
    });

    return usersList.filter(el => el.userId !== userId);
  } catch (e) {
    console.log("An error occurred while retrieving getAllUsers: ", e);
    return [];
  }
};