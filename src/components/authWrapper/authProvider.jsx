import React, { useState } from "react";
import authContext from "./authContext";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = (username) => {
        setUser({username});
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <authContext.Provider value={{
            user,
            login,
            logout
        }}
        >
            {children}
        </authContext.Provider>
    );
};