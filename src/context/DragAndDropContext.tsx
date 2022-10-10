import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { Game as GameType } from '../types/game';

interface DragAndDropContextType {
    isDragging: boolean;
    setIsDragging: (isDragging: boolean) => void;
    draggedCards: number[] | null;
    setDraggedCards: (draggedCards: number[] | null) => void;
    droppedCards: number[];
    setDroppedCards: (droppedCards: number[]) => void;
    hdpSentCards: GameType['sentCards'];
    setHdpSentCards: (hdpDroppedCards: GameType['sentCards']) => void;
    hdpDroppedCards: GameType['sentCards'];
    setHdpDroppedCards: (hdpDroppedCards: GameType['sentCards']) => void;
    myCards: number[];
    setMyCards: (myCards: number[]) => void;
    currentPick: number;
    setCurrentPick: (currentPick: number) => void;
    currentRound: number;
    setCurrentRound: (currentRound: number) => void;
    addCardToDroppedCards: (cardId: number) => void;
    undoCard: (cardId: number) => void;
    undoCardHdp: (playerId: string) => void;
    addCardsToHdpDroppedCards: (cards: GameType['sentCards']) => void;
}

export const DragAndDropContext = createContext<DragAndDropContextType | null >(null);

const DragAndDropProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedCards, setDraggedCards] = useState<number[]|null>(null);
    const [droppedCards, setDroppedCards] = useState<number[]>([]);
    const [hdpSentCards, setHdpSentCards] = useState<GameType['sentCards']>([]);
    const [hdpDroppedCards, setHdpDroppedCards] = useState<GameType['sentCards']>([]);
    const [currentPick, setCurrentPick] = useState(0);
    const [myCards, setMyCards] = useState<number[]>([]);
    const [currentRound, setCurrentRound] = useState(0);

    const addCardToDroppedCards = (cardId: number) => {
        setDroppedCards([...droppedCards, cardId]);
        setMyCards(myCards.filter((card) => card !== cardId));
    };

    const addCardsToHdpDroppedCards = (c: GameType['sentCards']) => {
        console.log(hdpSentCards.filter((card) => card.playerId !== c[0].playerId));
        if (!c[0].playerId) return;
        setHdpDroppedCards([...hdpDroppedCards, c[0]]);
        setHdpSentCards(hdpSentCards.filter((card) => card.playerId !== c[0].playerId));
    };

    const undoCard = (cardId: number) => {
        setDroppedCards(droppedCards.filter((card) => card !== cardId));
        setMyCards([...myCards, cardId]);
    };

    const undoCardHdp = (playerId: string) => {
        setHdpDroppedCards(hdpDroppedCards.filter((card) => card.playerId !== playerId));
        setHdpSentCards([...hdpSentCards, hdpDroppedCards.filter((card) => card.playerId === playerId)[0]]);
    };

    const value = useMemo(() => ({
        isDragging,
        setIsDragging,
        draggedCards,
        setDraggedCards,
        droppedCards,
        setDroppedCards,
        hdpSentCards,
        setHdpSentCards,
        hdpDroppedCards,
        setHdpDroppedCards,
        currentPick,
        setCurrentPick,
        currentRound,
        setCurrentRound,
        myCards,
        setMyCards,
        addCardToDroppedCards,
        undoCard,
        undoCardHdp,
        addCardsToHdpDroppedCards
    }), [isDragging, draggedCards, droppedCards, currentPick, myCards, hdpSentCards, hdpDroppedCards, currentRound]);

    return (
        <DragAndDropContext.Provider value={value}>
            {children}
        </DragAndDropContext.Provider>
    );
};

export default DragAndDropProvider;

export const useDragAndDropContext = () => {
    const context = useContext<DragAndDropContextType>(DragAndDropContext as any);

    if (context === undefined) {
        throw new Error('useDragAndDropContext must be used within a DragAndDropProvider');
    }

    return context;
};
