import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import CommonDataManager from "../../Utils/CommonManager";
import { AppStrings, Collections } from "../../Utils/Strings";
// import { notifications } from "react-native-firebase-push-notifications";
import { Alert } from "react-native";

export const userSignupRequest = async (
  userInput: any,
  getResponse: (userObj: any) => void
) => {
  // const tk = await getFirebaseTokenRequest();
  try {
    await auth()
      .createUserWithEmailAndPassword(userInput.email, userInput.password)
      .then(() => {
        let userId = auth()?.currentUser?.uid;
        firestore()
          .collection(Collections.Users)
          .doc(userId)
          .set({
            fullname: userInput.name,
            email: userInput.email,
            password: userInput.password,
            phone: userInput?.phone,
            // fcmToken: tk,
          })
          .then((docRef) => {
            let loginObj = {
              ...userInput,
              userId: userId,
            };

            CommonDataManager.getSharedInstance().saveUserData(loginObj);
            getResponse(loginObj);
          })
          .catch((error) => {
            console.log("Error at adding user ", error);
            getResponse(null);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert('Error', AppStrings.Network.emailAlreadyUse)
        } else if (error.code === "auth/invalid-email") {
          Alert.alert('Error', AppStrings.Network.invalidEmail)
        }
        console.error(error);
        getResponse(null);
      });
  } catch (e) {
    console.log(e);
    getResponse(null);
  }
};

export const loginRequest = async (
  userInput: any,
  complete: (userObj: any) => void
) => {
  try {
    await auth()
      .signInWithEmailAndPassword(userInput.email, userInput.password)
      .then(() => {
        firestore()
          .collection(Collections.Users)
          .where("email", "==", userInput.email)
          .get()
          .then((querySnapshot: any) => {
            querySnapshot.forEach(async (doc: any) => {
              let loginObj = {
                ...doc.data(),
                userId: doc.id,
              };
              console.log("login user is", loginObj);
              await CommonDataManager.getSharedInstance().saveUserData(
                loginObj
              );
              // const tk = await getFirebaseTokenRequest();
              // await setFCMTokenFirst(userRole, doc.id, tk);
              complete(loginObj);
            });
          })
          .catch((error) => {
            console.log("Error while getting data", error);
            complete(null);
          });
      });
  } catch (error: any) {
    console.log("error?.code => ", error?.code);
    if (error?.code === "auth/user-not-found") {
      Alert.alert('Error', AppStrings.Network.userNotFound)
    } else if (error?.code == "auth/wrong-password") {
      Alert.alert('Error', AppStrings.Network.invalidPassword)
    }
    console.log("Error => ", error);
    complete(null);
  }
};

export const logoutRequest = async (userRole: string, userId: string) => {
  try {
    // await setFCMTokenFirst(userId, null);
    await CommonDataManager.getSharedInstance().logoutUser();
    await auth().signOut();
  } catch (e) {
    console.log(e);
  }
};

// export const setFCMTokenFirst = async (
//   userId: string,
//   token: string | null
// ) => {
//   try {
//     const userRef = await firestore()
//       .collection(Collections.Users)
//       .doc(userId);
//     const userSnapShot = await userRef.get();
//     await userRef.set({ fcmToken: token }, { merge: true });
//   } catch (e) {
//     console.log("Error updating fcm token: ", e);
//   }
// };

export const getUserFromFirebaseRequest = async (
  email: string
) => {
  try {
    const snapshot = await firestore()
      .collection(Collections.Users)
      .where("email", "==", email)
      .get();
    if (snapshot.docs[0]) {
      const data = snapshot.docs[0].data();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log("Error:", e);
    return null;
  }
};


// const getFirebaseTokenRequest = async () => {
//     try {
//       let token = await notifications.getToken();
//       return token;
//     } catch (e) {
//       console.log("Error while getting firebase token", e);
//       return null;
//     }
//   };