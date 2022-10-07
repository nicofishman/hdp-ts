import React, { FC, useEffect } from 'react';

import { useAuthContext } from '../../context/AuthContext';
import { useDragAndDropContext } from '../../context/DragAndDropContext';
import { useGameContext } from '../../context/GameContext';
import { Languages } from '../../lang/i18n';
import { getCardById } from '../../utils/game';
import Card from '../Card';

import DroppableSection from './DroppableSection';

interface TopContainerProps {
    currentBlackCard: number;
    lang: Languages;
};

const TopContainer: FC<TopContainerProps> = ({ currentBlackCard, lang }) => {
    const { setCurrentPick } = useDragAndDropContext();
    const { game } = useGameContext();
    const { user } = useAuthContext();
    const blackCard = getCardById(currentBlackCard, lang);

    const isHDP = game.players.filter(p => p.id === user.uid)[0].isHdp;

    useEffect(() => {
        setCurrentPick(blackCard.pick!);
    }, [currentBlackCard]);

    return (
        <div className='flex h-full w-full flex-wrap items-center justify-center gap-8'>
            <Card bgColor={blackCard.color} draggable={false} id={blackCard.id} text={blackCard.text}/>
            <DroppableSection lang={lang} numberOfCards={isHDP ? game.players.length : blackCard.pick}/>
        </div>
    );
};

export default TopContainer;
