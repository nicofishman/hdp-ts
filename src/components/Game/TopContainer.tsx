import React, { FC, useEffect } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

import { useAuthContext } from '../../context/AuthContext';
import { useDragAndDropContext } from '../../context/DragAndDropContext';
import { useGameContext } from '../../context/GameContext';
import { Languages } from '../../lang/i18n';
import { getCardById } from '../../utils/game';
import Card from '../Card';
import Button from '../common/Button';

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
        <div className="flex h-full w-full flex-col justify-center">
            <div className='flex w-full flex-row flex-wrap items-center justify-center gap-8'>
                <Card bgColor={blackCard.color} draggable={false} id={blackCard.id} text={blackCard.text}/>
                <DroppableSection lang={lang} numberOfCards={isHDP ? game.players.length : blackCard.pick}/>
            </div>
            <div className='flex w-full justify-center'>
                <Button className='mt-4 ml-[-16px] aspect-square p-3'>
                    <RiSendPlaneFill size={25}/>
                </Button>
            </div>
        </div>
    );
};

export default TopContainer;
