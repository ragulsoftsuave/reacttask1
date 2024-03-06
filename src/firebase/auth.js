import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password, setError) => {
  return signInWithEmailAndPassword(auth,email,password)
  .then( (userCredentials)=>{console.log(userCredentials);setError('')})
  .catch(err=>{console.log(err);setError(err.code.split("/")[1])})
};

export const doSignInWithGoogle = async () => {
//   const provider = new AuthProvider();
//   const result = await signInWithPopup(auth, provider);
//   const user = result.user;

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };