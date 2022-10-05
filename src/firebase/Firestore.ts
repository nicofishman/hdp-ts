import { User } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, getDocs, query, where, arrayUnion, updateDoc } from 'firebase/firestore';
import { TFunction } from 'react-i18next';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Game } from '../types/game';
import { generateShortCode } from '../utils/game';

import { FirebaseApp } from './FirebaseApp';

const firebaseApp = FirebaseApp;

export const db = getFirestore(firebaseApp);
const gamesRef = collection(db, 'Games').withConverter({
    toFirestore: (game: Game) => {
        return {
            ...game
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);

        return {
            ...data
        } as Game;
    }
});
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

const getGameByShortCode = async (shortCode: string) => {
    const docs: Game[] = [];
    const q = query(gamesRef, where('shortCode', '==', shortCode));

    const querySnapshot = await getDocs(q);

    console.log('querySnapshot', querySnapshot);

    querySnapshot.forEach(doc => {
        docs.push(doc.data() as Game);
    });

    if (docs.length === 0) {
        return null;
    }

    return docs[0];
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

    await setDoc(newGameRef, { id: newGameRef.id, ...newGameData })
        .then(() => {
            console.log('GAME CREATED', newGameRef.id);
            navigate(`lobby/${newGameRef.id}`);
        });
};

export const addPlayerToGame = async (user: User, gameId: string) => {
    const gameRef = doc(gamesRef, gameId);

    await updateDoc(gameRef, {
        players: arrayUnion({
            id: user.uid,
            displayName: user.displayName,
            isHdp: false,
            points: 0
        })
    });
};

export const joinGame = async (user: User, shortCode: string, navigate: NavigateFunction, t: TFunction<'global'>) => {
    // if (shortCode.length !== 6) {
    //     toast(t('invalidshortcode'), {
    //         type: 'error',
    //         containerId: 'A',
    //         theme: 'colored',
    //         autoClose: 3000
    //     });
    //     toast.clearWaitingQueue();
    // }
    const game = await getGameByShortCode(shortCode);

    if (!game || !game?.id) {
        toast(t('invalidshortcode'), {
            type: 'error',
            containerId: 'A',
            theme: 'colored',
            autoClose: 3000
        });
        toast.clearWaitingQueue();

        return;
    }

    if (game.isStarted) {
        toast(t('gamestarted'), {
            type: 'error',
            containerId: 'A',
            theme: 'colored',
            autoClose: 3000
        });
        toast.clearWaitingQueue();

        return;
    }

    if (game.players.find(player => player.id === user.uid)) {
        toast(t('alreadyingame'), {
            type: 'error',
            containerId: 'A',
            theme: 'colored',
            autoClose: 3000
        });
        toast.clearWaitingQueue();
        navigate(`/lobby/${game.id}`);

        return;
    }

    await addPlayerToGame(user, game.id);
    navigate(`/lobby/${game.id}`);
};
