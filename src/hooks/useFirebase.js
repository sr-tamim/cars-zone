import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, getIdTokenResult, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
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
        usr && (user || setUser({ ...usr.providerData[0] })); // save user to database
        usr || (user && setUser(null)); // set user to null if not found
        usr || (loadingUserOnReload && setLoadingUserOnRelaod(false)) // set loading false
    })
    useEffect(() => {
        if (!user) return
        if (user.role) {
            authLoading && setAuthLoading(false)
            loadingUserOnReload && setLoadingUserOnRelaod(false) // set loading false
            return
        }
        getIdTokenResult(auth.currentUser)
            .then(idToken => {
                idToken.claims.role ? setUser({ ...user, role: idToken.claims.role })
                    : updateUserRole('public')
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    // update user role
    async function updateUserRole(role, email) {
        const { currentUser } = auth
        const payload = { role }
        payload[email ? 'email' : 'uid'] = email || currentUser.uid
        return axios.post('https://cars-zone-server.netlify.app/.netlify/functions/server/user/role', payload)
            .then(({ data }) => {
                data.success && currentUser.getIdToken(true)
                return data
            })
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
        signInGoogle(auth)
            .catch(err => modifyError(err))
    }
    const signUp = (name, email, password) => {
        authStart()
        register(auth, name, email, password)
            .catch(err => modifyError(err))
    }
    const loginEmail = (email, password) => {
        authStart();
        signInEmail(auth, email, password).catch(err => modifyError(err))
    }

    return {
        user, setUser, loadingUserOnReload, authLoading, setAuthLoading,
        authError, setAuthError, updateUserRole,
        logOut, googleLogin, signUp, loginEmail
    }
};

export default useFirebase;