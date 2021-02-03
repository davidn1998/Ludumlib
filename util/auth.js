/* 
REFERENCE: CUSTOM USE-AUTH HOOK TAKEN FROM USEHOOKS BY GABE RAGLAND AT https://usehooks.com/useAuth/ 
THEN CUSTOMISED TO MY NEEDS.
*/

import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";

// Firebase credentials and config
const firebaseConfig = {
  apiKey: "AIzaSyBNn79ajHf-XZ9hLbdP3paIM_s0BWg6v04",
  authDomain: "ludumlib.firebaseapp.com",
  projectId: "ludumlib",
  storageBucket: "ludumlib.appspot.com",
  messagingSenderId: "1095146337648",
  appId: "1:1095146337648:web:ec3461733ae68b65534bb5",
  measurementId: "G-3590SJRJMZ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        axios
          .get(`/api/user/${response.user.uid}`)
          .then((res) => {
            const user = { ...response.user, ...res.data };
            setUser(user);
            return user;
          })
          .catch((err) => {
            console.error(err);
          });
      });
  };

  const signup = (email, password, username) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        axios
          .post(`/api/user`, {
            _id: response.user.uid,
            username: username,
          })
          .then((res) => {
            const user = { ...response.user, ...res.data };
            setUser(user);
            return user;
          })
          .catch((err) => {
            console.error(err);
          });
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  const updateEmail = (currentEmail, email, password) => {
    return signin(currentEmail, password).then(() => {
      return firebase
        .auth()
        .currentUser.updateEmail(email)
        .then(() => {
          return user;
        });
    });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios
          .get(`/api/user/${user.uid}`)
          .then((res) => {
            const userData = { ...user, ...res.data };
            setUser(userData);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateEmail,
  };
}
