import { createContext, useContext } from 'react'

const authContext = createContext();

export const useUsername = () => {
    const { user } = useContext(authContext);
    return user ? user.username: null;
}

export const useAuth = () => useContext(authContext);

export default authContext;