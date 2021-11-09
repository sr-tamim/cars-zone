import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import firebaseConfig from "../Firebase/firebase.config";
import register from "../firebase/register";
import signInEmail from "../firebase/sign-in-email";
import signInGoogle from "../firebase/sign-in-google";

initializeApp(firebaseConfig); // initialize firebase
const auth = getAuth(); // get auth info


// this custom hook contains all of firebase user related info
const useFirebase = () => {
    const [user, setUser] = useState(null);
    const [loadingUserOnReload, setLoadingUserOnRelaod] = useState(true);
    const [usrError, setUsrError] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const modifyError = (error) => {
        if (error.message.startsWith('Firebase: Error')) {
            const modifiedError = error.message.split('/')[1].split('-').join(' ').split(')')[0];
            setUsrError(modifiedError)
        }
    }


    onAuthStateChanged(auth, usr => {
        usr ? setUser(usr) : user && setUser(null);
        usr && setUsrError(null);
        user && saveUserToDB(); // save user to database
        loadingUserOnReload && setLoadingUserOnRelaod(false);
    })

    // save user info in database
    function saveUserToDB() {
        axios.post('http://localhost:5000/users', {
            email: user.email, displayName: user.displayName, role: 'public'
        }).then(({ data }) => data.upsertedCount && console.log('user added to database'))
    }


    // starting authentication process
    function authStart() {
        setAuthLoading(true)
        setUsrError(null)
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
        usrError, setUsrError,
        logOut, googleLogin, signUp, loginEmail
    }
};

export default useFirebase;