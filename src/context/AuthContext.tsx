import React, {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    updateProfile,
    User,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { ImCross } from 'react-icons/im';
import { useTranslation } from 'react-i18next';

import FirebaseErrors from '../firebase/Errors';
import { FirebaseApp } from '../firebase/FirebaseApp';
import { Firestore } from '../firebase/Firestore';

interface AuthContextType {
    mySignInWithEmailAndPassword: (
        email: string,
        password: string
    ) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logOut: () => Promise<void>;
    user: User;
    loading: boolean;
    changeDisplayName: (displayName: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const firebaseApp = FirebaseApp;
    const auth = getAuth(firebaseApp);
    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('global');

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                if (
                    currentUser.providerData.length > 0 &&
                    currentUser.providerData[0].providerId === 'password' &&
                    auth.currentUser
                ) {
                    updateProfile(auth.currentUser, {
                        displayName: currentUser.email?.split('@')[0]
                    });
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
            })
            .catch((error) => {
                toast(error, {
                    type: 'error',
                    containerId: 'A',
                    theme: 'colored',
                    icon: () => <ImCross size={40} />,
                    pauseOnFocusLoss: false
                });
            });
    };

    const mySignInWithEmailAndPassword = async (
        email: string,
        password: string
    ) => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password).then(
                async () => {
                    if (!auth.currentUser) return;
                    updateProfile(auth.currentUser, {
                        displayName: email.split('@')[0]
                    })
                        .then(() => {
                            if (!auth.currentUser) return;
                            Firestore.setUserDB(auth.currentUser);
                        })
                        .then(() => {
                            setLoading(false);
                        });
                }
            );
        } catch (error: any) {
            if (error.code === FirebaseErrors.emailInUse) {
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                } catch (error: any) {
                    toast(t(error.code), {
                        type: 'error',
                        containerId: 'A',
                        theme: 'colored',
                        icon: () => <ImCross size={40} />,
                        pauseOnFocusLoss: false
                    });
                }
            } else {
                toast(t('firebaseErrors.auth/email-already-in-use'), {
                    type: 'error',
                    containerId: 'A',
                    theme: 'colored',
                    icon: () => <ImCross size={40} />,
                    pauseOnFocusLoss: false
                });
            }
        }
    };

    const changeDisplayName = async (displayName: string) => {
        if (!auth.currentUser) return;
        await updateProfile(auth.currentUser, { displayName });

        const activeGames = await Firestore.getShortCodes();

        for (const shortCode of activeGames) {
            const game = await Firestore.getGameByShortCode(shortCode);

            if (!game) return;
            const player = game.players.find(
                (player) => player.id === auth.currentUser?.uid
            );

            if (!player) return;
            await Firestore.updatePlayerDisplayName(
                auth.currentUser,
                shortCode,
                displayName
            );
        }

        setUser(auth.currentUser);
    };

    const logOut = async () => {
        await auth.signOut();
        setUser({} as User);
    };

    const value: AuthContextType = useMemo(
        () => ({
            mySignInWithEmailAndPassword,
            signInWithGoogle,
            logOut,
            user,
            loading,
            changeDisplayName
        }),
        [user, loading]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuthContext = () => {
    const context = useContext<AuthContextType>(AuthContext as any);

    if (context === undefined) {
        throw new Error(
            'useAuthContext must be used within a AuthContextProvider'
        );
    }

    return context;
};
