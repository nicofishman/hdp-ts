import { User } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { NavigateFunction } from 'react-router-dom';

import { generateShortCode } from '../utils/game';

import { FirebaseApp } from './FirebaseApp';

const firebaseApp = FirebaseApp;

export const db = getFirestore(firebaseApp);
const gamesRef = collection(db, 'Games');
// const usersRef = collection(db, 'Users');

export const setUserDB = async (user: User) => {
    console.log('dbdbdbdbdbdbbd', user.uid);
    await setDoc(doc(db, `Users/${user.uid}`), { username: user.displayName });
};

export const changeDisplayName = async (user: User, newDisplayName: string) => {
    await setDoc(doc(db, `Users/${user.uid}`), { username: newDisplayName });
};

const getShortCodes = async () => {
    const gamesSnap = await getDocs(gamesRef);
    const shortCodesList = gamesSnap.docs.map(game => game.data().shortCode);

    return shortCodesList;
};

export const createGame = async (user: User, lang: string, navigate: NavigateFunction) => {
    const newGameRef = doc(gamesRef);
    let shortCode = generateShortCode();

    const shortCodesList = await getShortCodes();

    while (shortCodesList.includes(shortCode)) {
        shortCode = generateShortCode();
    }

    const newGameData = {
        players: [{
            id: user.uid,
            displayName: user.displayName,
            isHdp: true,
            points: 0
        }],
        currentRound: 1, // Para poner el currentHDP se hace //? players[currentRound % players.length].isHdp = true
        owner: user.uid,
        isStarted: false,
        sentCards: [],
        lang,
        shortCode
    };

    await setDoc(newGameRef, newGameData)
        .then(() => {
            console.log('GAME CREATED', newGameRef.id);
            navigate(`lobby/${newGameRef.id}`);
        });
};
