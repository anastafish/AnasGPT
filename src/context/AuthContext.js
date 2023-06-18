import { useContext, useState, useEffect, createContext} from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { ClipLoader } from 'react-spinners';

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading && !user ? <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
                <ClipLoader size={80}/>
                </div> :
                children}
        </AuthContext.Provider>
    );
};