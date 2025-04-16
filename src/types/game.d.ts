import { CardSet } from '../lang/cardSets';

export interface Player {
    displayName: string | null;
    id: string;
    isHdp: boolean;
    points: number;
    cards: number[];
}

export interface Game {
    id: string;
    state: 'waiting' | 'playing' | 'finished';
    currentRound: number;
    lang: CardSet;
    owner: string;
    players: Player[];
    sentCards: { playerId: string; cards: number[] }[];
    shortCode: string;
    usedCards: number[];
    usedBlackCards: number[];
    currentBlackCard: number | null;
    pointsToWin: number;
}

export interface Card {
    id: number;
    text: string;
    color: 'white' | 'black';
    extension: string | number;
    pick?: number;
}
