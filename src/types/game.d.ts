import { Languages } from '../lang/i18n';

export interface Player {
    displayName: string | null;
    id: string;
    isHdp: boolean;
    points: number;
    cards?: number[];
}

export interface Game {
    id: string;
    isStarted: boolean;
    currentRound: number;
    lang: Languages;
    owner: string;
    players: Player[];
    sentCards: number[];
    shortCode: string;
    usedCards: number[];
    currentBlackCard: number | null;
}

export interface Card {
    id: number;
    text: string;
    color: string;
    extension: string | number;
    pick?: number
}
