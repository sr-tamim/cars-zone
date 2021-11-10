import React, { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';

export const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
    const firebaseFunctions = useFirebase()
    return (
        <AuthContext.Provider value={{ ...firebaseFunctions }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;