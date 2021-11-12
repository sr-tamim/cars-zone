import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import firebaseConfig from "../Firebase/firebase.config";
import register from "../Firebase/register";
import signInEmail from "../Firebase/sign-in-email";
import signInGoogle from "../Firebase/sign-in-google";

initializeApp(firebaseConfig); // initialize firebase
const auth = getAuth(); // get auth info


// this custom hook contains all of firebase user related info
const useFirebase = () => {
    const [user, setUser] = useState(null);
    const [loadingUserOnReload, setLoadingUserOnRelaod] = useState(true);
    const [authError, setAuthError] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    // modify firebase error to show in UI
    const modifyError = (error) => {
        if (error.message.startsWith('Firebase: Error')) {
            const modifiedError = error.message.split('/')[1].split('-').join(' ').split(')')[0];
            setAuthError(modifiedError)
        }
    }


    onAuthStateChanged(auth, usr => {
        usr && setAuthError(null); // clear error
        usr && (user || saveUserToDB(usr)); // save user to database
        usr || (user && setUser(null)); // set user to null if not found
        usr || (loadingUserOnReload && setLoadingUserOnRelaod(false)) // set loading false
    })

    // save user info in database
    function saveUserToDB(userInfo) {
        const { email, displayName, photoURL } = userInfo;
        axios.post('http://localhost:5000/users', {
            email, displayName, photoURL, role: 'public'
        })
            .then(({ data }) => data.upsertedCount && console.log('user added to database'))
            .catch(err => console.log(err))
            .finally(() => getUserFromDB(email))
    }
    // get user info from database
    function getUserFromDB(email) {
        axios.get(`http://localhost:5000/users/${email}`)
            .then(({ data }) => {
                setUser(data);
                loadingUserOnReload && setLoadingUserOnRelaod(false);
            })
            .catch(err => console.log(err))
    }


    // starting authentication process
    function authStart() {
        setAuthLoading(true)
        setAuthError(null)
    }

    // authentication functions
    const logOut = () => {
        signOut(auth).catch(err => modifyError(err))
    }
    const googleLogin = () => {
        authStart()
        signInGoogle(auth).catch(err => modifyError(err))
            .finally(() => setAuthLoading(false))
    }
    const signUp = (name, email, password) => {
        authStart()
        register(auth, name, email, password)
            .catch(err => modifyError(err))
            .finally(() => setAuthLoading(false));
    }
    const loginEmail = (email, password) => {
        authStart();
        signInEmail(auth, email, password).catch(err => modifyError(err))
            .finally(() => setAuthLoading(false))
    }

    return {
        user, setUser, loadingUserOnReload, authLoading, setAuthLoading,
        authError, setAuthError,
        logOut, googleLogin, signUp, loginEmail
    }
};

export default useFirebase;