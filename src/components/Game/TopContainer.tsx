import React, { FC, useEffect } from 'react';

import { useDragAndDropContext } from '../../context/DragAndDropContext';
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
    const blackCard = getCardById(currentBlackCard, lang);

    useEffect(() => {
        setCurrentPick(blackCard.pick!);
    }, [currentBlackCard]);

    return (
        <div className='flex w-full flex-row flex-wrap justify-center gap-8'>
            <Card bgColor={blackCard.color} draggable={false} id={blackCard.id} text={blackCard.text}/>
            <DroppableSection lang={lang} numberOfCards={blackCard.pick}/>
        </div>
    );
};

export default TopContainer;
