import { createContext, useContext } from 'react'

const AuthContext = createContext();

export const useUsername = () => {
    const { user } = useContext(AuthContext);
    return user ? user.username: null;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
