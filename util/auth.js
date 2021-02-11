/* 
REFERENCE: CUSTOM USE-AUTH HOOK TAKEN FROM USEHOOKS BY GABE RAGLAND AT https://usehooks.com/useAuth/ 
THEN CUSTOMISED TO MY NEEDS.
*/

import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";

// Firebase credentials and config
import initFirebase from "./firebase";

initFirebase();

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

  const getIdToken = () => {
    const user = firebase.auth().currentUser;
    return user?.getIdToken();
  };

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        axios
          .get(`/api/users/${response.user.uid}`)
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
          .post(`/api/users`, {
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

  const updatePassword = (currPass, newPass) => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currPass
    );
    return user.reauthenticateWithCredential(credential).then(() => {
      return user.updatePassword(newPass).then(() => {
        return user;
      });
    });
  };

  const updateEmail = (email, password) => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    return user.reauthenticateWithCredential(credential).then(() => {
      return user.updateEmail(email).then(() => {
        return user;
      });
    });
  };

  const deleteAccount = (password) => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    return user.reauthenticateWithCredential(credential).then(() => {
      return axios.get(`/api/users/${user.uid}`).then((res) => {
        return user.getIdToken().then((idToken) => {
          return axios
            .delete(`api/users/${user.uid}/profilepic`, {
              headers: {
                authorization: `Bearer ${idToken}`,
              },
              data: {
                image: res.data.pfp?.name ? res.data.pfp?.name : null,
              },
            })
            .then(() => {
              axios
                .delete(`/api/users/${user.uid}`, {
                  headers: {
                    authorization: `Bearer ${idToken}`,
                  },
                })
                .then(() => {
                  user.delete().then(() => {
                    setUser(false);
                  });
                });
            });
        });
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
          .get(`/api/users/${user.uid}`)
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
    getIdToken,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateEmail,
    updatePassword,
    deleteAccount,
  };
}
