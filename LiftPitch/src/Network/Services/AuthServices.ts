// // import auth from '@react-native-firebase/auth';
// // import firestore from '@react-native-firebase/firestore';
// import {Alert} from 'react-native';
// import { setUserData } from '../../Redux/reducers/AppReducer';
// import { AppStrings, AsyncKeyStrings } from '../../Utils/Strings';
// import { clearAppData, saveUserData } from '../../Utils/AsyncStorage';
// export const loginFun = async (userInput:any, complete:any) => {
//   try {
//     await auth()
//       .signInWithEmailAndPassword(userInput.userEmail, userInput.userPassword)
//       .then(() => {
//         firestore()
//           .collection('Users')
//           .where('userEmail', '==', userInput.userEmail)
//           .get()
//           .then((querySnapshot:any) => {
//             querySnapshot.forEach((doc:any) => {
//               let loginObj = {
//                 ...doc.data(),
//                 userId: doc.id,
//               };
//               console.log('login user is', loginObj);
//               setUserData(loginObj)
//               saveUserData(loginObj);
//               complete(loginObj);
//             });
//           })
//           .catch((error:any) => {
//             console.log('Error while getting data', error);
//             complete(null);
//           });
//       });
//   } catch (e) {
//     console.log(e);
//     complete(null);
//   }
// };
// // GET USER DATA
// export const getUserData = (onComplete:any) => {
//   let userId = auth().currentUser.uid;
//   console.log(userId);
//   try {
//     firestore()
//       .collection('Users')
//       .doc(userId)
//       .get()
//       .then((data:any) => {
//         onComplete(data.data());
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };
// // changeListener
// export const userChangeListener = async (id:any, onComplete:any) => {
//   try {
//     firestore()
//       .collection('Users')
//       .doc(id)
//       .onSnapshot((data:any) => {
//         if (data != null) {
//           onComplete(data.data());
//         }
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };
// export const register = async (userInput:any, getResponse:any) => {
//   try {
//     await auth()
//       .createUserWithEmailAndPassword(
//         userInput.userEmail,
//         userInput.userPassword,
//       )
//       .then(() => {
//         let userId = auth().currentUser.uid;
//         firestore()
//           .collection('Users')
//           .doc(userId)
//           .set({
//             username: userInput.username,
//             userEmail: userInput.userEmail,
//             userPassword: userInput.userPassword,
//             preference: userInput.preference,
//           })
//           .then((docRef:any) => {
//             let loginObj = {
//               ...userInput,
//               userId: userId,
//             };
// setUserData(loginObj);
// saveUserData(loginObj);
//             getResponse(loginObj);
//           })
//           .catch((error:any) => {
//             console.log('Error at adding user ', error);
//             getResponse(null);
//           });
//       })
//       .catch((error:any) => {
//         if (error.code === 'auth/email-already-in-use') {
//           Alert.alert('That email address is already in use!');
//         } else if (error.code === 'auth/invalid-email') {
//           Alert.alert('That email address is invalid!');
//         }
//         console.error(error);
//         getResponse(null);
//       });
//   } catch (e) {
//     console.log(e);
//     getResponse(null);
//   }
// };
// export const logout = async (navigation:any) => {
//   try {
//     await clearAppData(AsyncKeyStrings.Auth.userdata);
//     await auth().signOut();
//     navigation.reset({
//       index: 0,
//       routes: [{name: ScreenNames.Authentication.LoginScreen}],
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
