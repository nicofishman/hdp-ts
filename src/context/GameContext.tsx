import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { Game as GameType } from '../types/game';

interface GameContextType {
    game: GameType;
    setGame: (game: GameType) => void;
    sentCards: {playerId: string; cards: number[]}[];
    setSentCards: (sentCards: {playerId: string; cards: number[]}[]) => void;
    hasSentCards: boolean;
    setHasSentCards: (hasSentCards: boolean) => void;
}

export const GameContext = createContext<GameContextType | null >(null);

const GameProvider: FC<PropsWithChildren> = ({ children }) => {
    const [game, setGame] = useState({} as GameType);
    const [sentCards, setSentCards] = useState<{playerId: string; cards: number[]}[]>([]);
    const [hasSentCards, setHasSentCards] = useState<boolean>(false);

    const value: GameContextType = useMemo(() => ({
        game,
        setGame,
        sentCards,
        setSentCards,
        hasSentCards,
        setHasSentCards
    }), [game, sentCards, hasSentCards]);

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;

export const useGameContext = () => {
    const context = useContext<GameContextType>(GameContext as any);

    if (context === undefined) {
        throw new Error('useGameContext must be used within a GameContextProvider');
    }

    return context;
};
