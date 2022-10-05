export interface Player {
    displayName: string | null;
    id: string;
    isHdp: boolean;
    points: number;
}

export interface Game {
    id: string;
    isStarted: boolean;
    currentRound: number;
    lang: string;
    owner: string;
    players: Player[];
    sentCards: string[];
    shortCode: string;
}
