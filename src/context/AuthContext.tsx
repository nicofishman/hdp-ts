import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, updateProfile, User, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ImCross } from 'react-icons/im';
import { useTranslation } from 'react-i18next';

import FirebaseErrors from '../firebase/Errors';
import { FirebaseApp } from '../firebase/FirebaseApp';
import { setUserDB } from '../firebase/Firestore';

interface AuthContextType {
    mySignInWithEmailAndPassword : (email: string, password: string) => Promise<void>;
    signInWithGoogle : () => Promise<void>;
    logOut : () => Promise<void>;
    user: User;
    loading: boolean;
    changeDisplayName: (displayName: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null >(null);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const firebaseApp = FirebaseApp;
    const auth = getAuth(firebaseApp);
    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('global');

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('currentUser', currentUser);

            if (currentUser) {
                setUser(currentUser);
                if (currentUser.providerData[0].providerId === 'password' && auth.currentUser) {
                    updateProfile(auth.currentUser, { displayName: currentUser.email?.split('@')[0] });
                }
            }
        });

        return () => unsuscribe();
    }, [auth]);

    const signInWithGoogle = async () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;

                setUser(user);
            }).catch((error) => {
                console.log(error);
                toast(error, {
                    type: 'error',
                    containerId: 'A',
                    theme: 'colored',
                    icon: () => (<ImCross size={40} />),
                    pauseOnFocusLoss: false
                });
            });
    };

    const mySignInWithEmailAndPassword = async (email: string, password: string) => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password)
                .then(
                    async () => {
                        if (!auth.currentUser) return;
                        updateProfile(auth.currentUser, {
                            displayName: email.split('@')[0]
                        }).then(() => {
                            if (!auth.currentUser) return;
                            setUserDB(auth.currentUser);
                        })
                            .then(() => {
                                setLoading(false);
                            });
                    });
        } catch (error: any) {
            if (error.code === FirebaseErrors.emailInUse) {
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                } catch (error: any) {
                    toast(t(error.code), {
                        type: 'error',
                        containerId: 'A',
                        theme: 'colored',
                        icon: () => (<ImCross size={40} />),
                        pauseOnFocusLoss: false
                    });
                }
            } else {
                toast(t('firebaseErrors.auth/email-already-in-use'), {
                    type: 'error',
                    containerId: 'A',
                    theme: 'colored',
                    icon: () => (<ImCross size={40} />),
                    pauseOnFocusLoss: false
                });
            }
        }
    };

    const changeDisplayName = async (displayName: string) => {
        if (!auth.currentUser) return;
        await updateProfile(auth.currentUser, { displayName });
        console.log('Nombre de usuario cambiado', auth.currentUser.displayName);

        setUser(auth.currentUser);
    };

    const logOut = async () => {
        await auth.signOut();
        setUser({} as User);
        console.log('logged out');
    };

    const value: AuthContextType = useMemo(() => ({
        mySignInWithEmailAndPassword,
        signInWithGoogle,
        logOut,
        user,
        loading,
        changeDisplayName
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuthContext = () => {
    const context = useContext<AuthContextType>(AuthContext as any);

    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthContextProvider');
    }

    return context;
};
