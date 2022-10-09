import { Languages } from '../lang/i18n';

export interface Player {
    displayName: string | null;
    id: string;
    isHdp: boolean;
    points: number;
    cards: number[];
}

export interface Game {
    id: string;
    isStarted: boolean;
    currentRound: number;
    lang: Languages;
    owner: string;
    players: Player[];
    sentCards: { playerId: string, cards: number[] }[];
    shortCode: string;
    usedCards: number[];
    usedBlackCards: number[];
    currentBlackCard: number | null;
}

export interface Card {
    id: number;
    text: string;
    color: 'white' | 'black';
    extension: string | number;
    pick?: number
}
