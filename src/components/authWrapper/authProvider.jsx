import { useEffect, useState } from "react";
import AuthContext from "./authContext";

const STORAGE_KEY = "auth.user";

const readStoredUser = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(readStoredUser);

    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch {
            // ignore storage errors (e.g. private mode)
        }
    }, [user]);

    const login = (username) => {
        setUser({ username });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};
