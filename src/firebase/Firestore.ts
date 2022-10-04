import { User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection } from 'firebase/firestore';

import { FirebaseApp } from './FirebaseApp';

const firebaseApp = FirebaseApp;
const db = getFirestore(firebaseApp);
const gamesRef = collection(db, 'Games');
const usersRef = collection(db, 'Users');

export const setUserDB = async (user: User) => {
    console.log('dbdbdbdbdbdbbd', user.uid);
    await setDoc(doc(db, `Users/${user.uid}`), { username: user.displayName });
};

export const changeDisplayName = async (user: User, newDisplayName: string) => {
    await setDoc(doc(db, `Users/${user.uid}`), { username: newDisplayName });
};
