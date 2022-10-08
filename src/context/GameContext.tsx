import React, { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

import { Game as GameType } from '../types/game';

interface GameContextType {
    game: GameType;
    setGame: (game: GameType) => void;
    sentCards: {playerId: string; cards: number[]}[];
    setSentCards: (sentCards: {playerId: string; cards: number[]}[]) => void;
}

export const GameContext = createContext<GameContextType | null >(null);

const GameProvider: FC<PropsWithChildren> = ({ children }) => {
    const [game, setGame] = useState({} as GameType);
    const [sentCards, setSentCards] = useState<{playerId: string; cards: number[]}[]>([]);
    const value: GameContextType = {
        game,
        setGame,
        sentCards,
        setSentCards
    };

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
