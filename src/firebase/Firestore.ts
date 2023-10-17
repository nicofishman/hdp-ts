import { User } from 'firebase/auth';
import {
    getFirestore,
    doc,
    setDoc,
    collection,
    getDocs,
    query,
    where,
    arrayUnion,
    updateDoc,
    arrayRemove,
    getDoc,
    deleteDoc
} from 'firebase/firestore';
import { TFunction } from 'react-i18next';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Languages } from '../lang/i18n';
import { Game, Player } from '../types/game';
import { generateShortCode, shuffleCards } from '../utils/game';

import { FirebaseApp } from './FirebaseApp';

const firebaseApp = FirebaseApp;
const WHITE_CARDS_PER_PLAYER = 6;

export class Firestore {
    static db = getFirestore(firebaseApp);
    static gamesRef = collection(Firestore.db, 'Games').withConverter({
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

    static setUserDB = async (user: User) => {
        await setDoc(doc(Firestore.db, `Users/${user.uid}`), {
            username: user.displayName
        });
    };

    static changeDisplayName = async (user: User, newDisplayName: string) => {
        await setDoc(doc(Firestore.db, `Users/${user.uid}`), {
            username: newDisplayName
        });
    };

    static getShortCodes = async () => {
        const gamesSnap = await getDocs(Firestore.gamesRef);
        const shortCodesList = gamesSnap.docs.map(
            (game) => game.data().shortCode
        );

        return shortCodesList;
    };

    static getGameByShortCode = async (shortCode: string) => {
        const docs: Game[] = [];
        const q = query(
            Firestore.gamesRef,
            where('shortCode', '==', shortCode)
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            docs.push(doc.data() as Game);
        });

        if (docs.length === 0) {
            return null;
        }

        return docs[0];
    };

    static createGame = async (
        user: User,
        lang: Languages,
        navigate: NavigateFunction
    ) => {
        const newGameRef = doc(Firestore.gamesRef);
        let shortCode = generateShortCode();

        const shortCodesList = await Firestore.getShortCodes();

        while (shortCodesList.includes(shortCode)) {
            shortCode = generateShortCode();
        }

        const newGameData = {
            players: [
                {
                    id: user.uid,
                    displayName: user.displayName,
                    isHdp: true,
                    points: 0,
                    cards: []
                }
            ],
            currentRound: 1, // Para poner el currentHDP se hace //? players[currentRound % players.length].isHdp = true
            owner: user.uid,
            isStarted: false,
            sentCards: [],
            usedCards: [],
            usedBlackCards: [],
            currentBlackCard: null,
            lang,
            shortCode
        };

        await setDoc(newGameRef, { id: newGameRef.id, ...newGameData }).then(
            () => {
                navigate(`lobby/${newGameRef.id}`);
            }
        );
    };

    static addPlayerToGame = async (user: User, gameId: string) => {
        const gameRef = doc(Firestore.gamesRef, gameId);

        await updateDoc(gameRef, {
            players: arrayUnion({
                id: user.uid,
                displayName: user.displayName,
                isHdp: false,
                points: 0
            })
        });
    };

    static removePlayerFromGame = async (player: Player, gameId: string) => {
        const gameRef = doc(Firestore.gamesRef, gameId);

        await updateDoc(gameRef, {
            players: arrayRemove(player)
        });
    };

    static joinGame = async (
        user: User,
        shortCode: string,
        navigate: NavigateFunction,
        t: TFunction<'global'>
    ) => {
        const game = await Firestore.getGameByShortCode(shortCode);

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

        if (game.players.find((player) => player.id === user.uid)) {
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

        await Firestore.addPlayerToGame(user, game.id);
        navigate(`/lobby/${game.id}`);
    };

    static startGame = async (gameId: string) => {
        const gameRef = doc(Firestore.gamesRef, gameId);
        const gameData = (await getDoc(gameRef).then((g) => g.data())) as Game;

        const newPlayers: Player[] = [];
        const usedCards: number[] = gameData.usedCards;

        const currentBlackCard = shuffleCards(
            gameData.lang,
            'Black',
            usedCards,
            1
        )[0];

        // TODO: usedBlackCards tiene que ser leido
        const usedBlackCards: number[] = gameData.usedBlackCards;

        usedBlackCards.push(currentBlackCard);

        gameData.players.forEach((player) => {
            const playerCards = shuffleCards(
                gameData.lang,
                'White',
                usedCards,
                WHITE_CARDS_PER_PLAYER
            );

            newPlayers.push({
                ...player,
                cards: playerCards
            });

            usedCards.push(...playerCards);
        });

        await updateDoc(gameRef, {
            players: newPlayers,
            currentBlackCard,
            isStarted: true,
            usedCards,
            usedBlackCards
        });
    };

    static sendCards = async (
        gameId: string,
        playerId: string,
        cards: number[]
    ) => {
        const gameRef = doc(Firestore.gamesRef, gameId);
        const gameData = (await getDoc(gameRef).then((g) => g.data())) as Game;

        const newPlayers = gameData.players.map((player) => {
            if (player.id === playerId) {
                return {
                    ...player,
                    cards: player.cards.filter((card) => !cards.includes(card))
                };
            } else {
                return player;
            }
        });

        await updateDoc(gameRef, {
            players: newPlayers,
            sentCards: arrayUnion({
                playerId,
                cards
            })
        });
    };

    static refillCards = (
        players: Game['players'],
        lang: Languages,
        usedCards: number[]
    ) => {
        const newPlayers: Player[] = [];
        const cardsUsed = [...usedCards];

        players.forEach((player) => {
            const newCards = shuffleCards(
                lang,
                'White',
                usedCards,
                WHITE_CARDS_PER_PLAYER - player.cards.length
            );

            newPlayers.push({
                ...player,
                cards: [...player.cards, ...newCards]
            });
            cardsUsed.push(...newCards);
        });

        return {
            newPlayers,
            cardsUsed
        };
    };

    static addPoint = (players: Game['players'], playerId: string) => {
        const newPlayers: Player[] = [];

        players.forEach((player) => {
            if (player.id === playerId) {
                newPlayers.push({
                    ...player,
                    points: player.points + 1
                });
            } else {
                newPlayers.push(player);
            }
        });

        return newPlayers;
    };

    static cycleHDP = (players: Game['players'], currentRound: number) => {
        const newPlayers: Game['players'] = [];

        players.forEach((player, index) => {
            if (index === currentRound % players.length) {
                newPlayers.push({
                    ...player,
                    isHdp: true
                });
            } else {
                newPlayers.push({
                    ...player,
                    isHdp: false
                });
            }
        });

        return newPlayers;
    };

    static finishRound = async (gameId: string, winnerId: string) => {
        const gameRef = doc(Firestore.gamesRef, gameId);
        const gameData = (await getDoc(gameRef).then((g) => g.data())) as Game;

        let newPlayers = Firestore.addPoint(gameData.players, winnerId);

        const { newPlayers: newPlayers2, cardsUsed: usedCards } =
            Firestore.refillCards(
                newPlayers,
                gameData.lang,
                gameData.usedCards
            );

        newPlayers = Firestore.cycleHDP(newPlayers2, gameData.currentRound);

        const newCurrentBlackCard = shuffleCards(
            gameData.lang,
            'Black',
            gameData.usedBlackCards,
            1
        )[0];

        const currentRound = gameData.currentRound + 1;

        await updateDoc(gameRef, {
            players: newPlayers,
            currentRound,
            usedCards,
            currentBlackCard: newCurrentBlackCard,
            sentCards: []
        });
    };

    static deleteGame = async (gameId: string) => {
        const gameRef = doc(Firestore.gamesRef, gameId);

        await deleteDoc(gameRef);
    };
}
