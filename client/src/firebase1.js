import firebase from "firebase/app";

const base = firebase.initializeApp({
  apiKey: "AIzaSyArWZtAOVwy219cNjZDMMT1k_IOhJAP8Yk",
  authDomain: "disastermap-2b555.firebaseapp.com",
  databaseURL: "https://disastermap-2b555.firebaseio.com",
  projectId: "disastermap-2b555",
  storageBucket: "disastermap-2b555.appspot.com",
  messagingSenderId: "764441341779"
});

export default base;