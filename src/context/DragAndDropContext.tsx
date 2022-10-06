import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface DragAndDropContextType {
    isDragging: boolean;
    setIsDragging: (isDragging: boolean) => void;
    draggedCard: number | null;
    setDraggedCard: (draggedCard: number | null) => void;
    droppedCards: number[];
    setDroppedCards: (droppedCards: number[]) => void;
    myCards: number[];
    setMyCards: (myCards: number[]) => void;
    currentPick: number;
    setCurrentPick: (currentPick: number) => void;
    addCardToDroppedCards: (cardId: number) => void;
    undoCard: (cardId: number) => void;
}

export const DragAndDropContext = createContext<DragAndDropContextType | null >(null);

const DragAndDropProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedCard, setDraggedCard] = useState<number|null>(null);
    const [droppedCards, setDroppedCards] = useState<number[]>([]);
    const [currentPick, setCurrentPick] = useState(0);
    const [myCards, setMyCards] = useState<number[]>([]);

    const addCardToDroppedCards = (cardId: number) => {
        setDroppedCards([...droppedCards, cardId]);
        setMyCards(myCards.filter((card) => card !== cardId));
    };

    const undoCard = (cardId: number) => {
        setDroppedCards(droppedCards.filter((card) => card !== cardId));
        setMyCards([...myCards, cardId]);
    };

    const value = useMemo(() => ({
        isDragging,
        setIsDragging,
        draggedCard,
        setDraggedCard,
        droppedCards,
        setDroppedCards,
        currentPick,
        setCurrentPick,
        myCards,
        setMyCards,
        addCardToDroppedCards,
        undoCard
    }), [isDragging, draggedCard, droppedCards, currentPick, myCards]);

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
