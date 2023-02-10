import * as admin from "firebase-admin";
import * as serviceAccount from "../../db/backend-coder-ccfef-firebase-adminsdk-j1h60-2397d93286.json" assert { type: "json" };

const init = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://backend-coder-ccfef.firebaseio.com",
    });
    console.log("Connection with FirebaseDB established");
  } catch (error) {
    console.log(error);
  }
};
export const FirebaseDBService = {
  init,
};

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAW57YRtnk0IFiSIzgBu6N5GVsMuM0svRo",
//   authDomain: "backend-coder-ccfef.firebaseapp.com",
//   projectId: "backend-coder-ccfef",
//   storageBucket: "backend-coder-ccfef.appspot.com",
//   messagingSenderId: "507165599081",
//   appId: "1:507165599081:web:09db63c5e7b4b7518309f8",
// };
// // Initialize Firebase

// const init = async () => {
//   try {
//     const app = initializeApp(firebaseConfig);

//     const db = getFirestore(app);
//     console.log("Connection with FirebaseDB established");
//     return db;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const FirebaseDBService = {
//   init,
// }
