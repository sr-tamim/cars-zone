import React, { createContext } from 'react';

export const AuthContext = createContext()
const AuthContextProvider = ({ children, firebaseFunctions }) => {
    return (
        <AuthContext.Provider value={{ ...firebaseFunctions }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;