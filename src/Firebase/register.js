import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const register = async (auth, name, email, password, updateUserRole) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(() => updateProfile(auth.currentUser, { displayName: name }))
};

export default register;
