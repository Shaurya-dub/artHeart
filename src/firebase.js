import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBLb-f-q9A6-rDWC-q2pI_wTMCMVjQy9DI",
  authDomain: "art-smart.firebaseapp.com",
  projectId: "art-smart",
  storageBucket: "art-smart.appspot.com",
  messagingSenderId: "923947903837",
  appId: "1:923947903837:web:ee0461d8a189ce39af96b4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
