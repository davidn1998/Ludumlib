import firebase from "firebase/app";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBNn79ajHf-XZ9hLbdP3paIM_s0BWg6v04",
  authDomain: "ludumlib.firebaseapp.com",
  projectId: "ludumlib",
  storageBucket: "ludumlib.appspot.com",
  messagingSenderId: "1095146337648",
  appId: "1:1095146337648:web:ec3461733ae68b65534bb5",
  measurementId: "G-3590SJRJMZ",
};

const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export default initFirebase;
