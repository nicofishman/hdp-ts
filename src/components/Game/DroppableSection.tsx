import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import clsx from 'clsx';
import React, { FC, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { ImCancelCircle } from 'react-icons/im';

import { useAuthContext } from '../../context/AuthContext';
import { useDragAndDropContext } from '../../context/DragAndDropContext';
import { useGameContext } from '../../context/GameContext';
import { Languages } from '../../lang/i18n';
import { decodeHash } from '../../utils/game';
import Card from '../Card';

import StackedCards from './StackedCards';

interface DroppableSectionProps extends HTMLAttributes<HTMLDivElement> {
    numberOfCards?: number;
    lang: Languages;
};

const DroppableSection: FC<DroppableSectionProps> = ({ className, lang, numberOfCards = 1, ...props }) => {
    const { droppedCards, addCardToDroppedCards, setDraggedCards, setIsDragging, undoCard, currentPick, undoCardHdp, addCardsToHdpDroppedCards, hdpDroppedCards } = useDragAndDropContext();
    const { t } = useTranslation('global');
    const { game, sentCards, hasSentCards } = useGameContext();
    const { user } = useAuthContext();
    const isHDP = game.players.filter(p => p.id === user.uid)[0].isHdp;

    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
        disabled: droppedCards.length === numberOfCards,
        data: {
            accepts: ['card']
        }
    });

    const handleUndo = (cardId = 0) => {
        if (isHDP) {
            undoCardHdp(hdpDroppedCards[0].playerId);
        } else {
            undoCard(cardId);
        }
    };

    useDndMonitor({
        onDragEnd: ({ active, over }) => {
            if (active.id && active.data.current && over?.id === 'droppable') {
                if (isHDP) {
                    addCardsToHdpDroppedCards([{
                        cards: decodeHash(active.id.toString()),
                        playerId: active.data.current.playerId as string
                    }]);
                } else {
                    addCardToDroppedCards(Number(active.id));
                }
            }
            setDraggedCards(null);
            setIsDragging(false);
        }
    });

    const width = numberOfCards ? (numberOfCards * 40) + (numberOfCards * 4) : 40;
    const allPlayerSentTheirCards = game.sentCards.length === game.players.length - 1;

    console.log('allPlayerSentTheirCards', allPlayerSentTheirCards, game.sentCards, hdpDroppedCards.length);

    return (
        <div className={clsx('flex h-64 border-spacing-5 items-center justify-center rounded-md border-[3px] border-dashed border-gray-500 p-1 text-center transition-colors dark:border-gray-400', isOver && 'border-lime-500 dark:border-lime-500', currentPick > 1 && isHDP && 'h-[340px] w-72 gap-4', className)} style={{ width: `${width * 4}px` }} {...props} ref={setNodeRef}>

            <div className={clsx('relative flex h-full w-full items-center justify-center gap-2', isHDP ? 'flex-col' : 'flex-row')}>

                {!isHDP
                    ? (droppedCards.length === 0 && !hasSentCards && (
                        <div className='flex flex-col'>
                            <span className='font-bold'>{t('drophere')}</span>
                            {
                                numberOfCards > 1 && (
                                    <span className='text-sm text-gray-700 dark:text-gray-500'>{t('cardsorder')}</span>
                                )
                            }
                        </div>
                    ))
                    : (
                        <>
                            {
                                allPlayerSentTheirCards
                                    ? hdpDroppedCards.length === 0
                                        ? (
                                            <span className='font-bold'>{t('dropchoicehdp')}</span>
                                        )
                                        : (
                                            <>
                                                <div className='absolute -top-1 -right-1 z-20 cursor-pointer rounded-full bg-red-500 p-1' onClick={() => undoCardHdp(hdpDroppedCards[0].playerId)}>
                                                    <ImCancelCircle color='#fff' />
                                                </div>
                                                {
                                                    <StackedCards cards={hdpDroppedCards[0].cards} draggable={false} lang={lang} playerId={hdpDroppedCards[0].playerId} />
                                                }
                                            </>
                                        )
                                    : hdpDroppedCards.length === 0 && (
                                        <>
                                            <span className='font-bold'>{t('youarehdp')}</span>
                                            <span>{sentCards.length} / {game.players.length - 1}</span>
                                        </>
                                    )
                            }
                        </>
                    )}
                {
                    hasSentCards
                        ? (
                            game.sentCards.filter(st => st.playerId === user.uid)[0].cards.map((cardId: number) => (
                                <div key={cardId} className='relative'>
                                    {
                                        !hasSentCards && (
                                            <div className='absolute -top-1 -right-1 z-20 cursor-pointer rounded-full bg-red-500 p-1' onClick={() => handleUndo(cardId)}>
                                                <ImCancelCircle color='#fff' />
                                            </div>
                                        )
                                    }
                                    <Card draggable={false} id={cardId} lang={lang} />
                                </div>
                            ))
                        )
                        : (
                            droppedCards.map((cardId: number) => (
                                <div key={cardId} className='relative'>
                                    {
                                        !hasSentCards && (
                                            <div className='absolute -top-1 -right-1 z-20 cursor-pointer rounded-full bg-red-500 p-1' onClick={() => undoCard(cardId)}>
                                                <ImCancelCircle color='#fff' />
                                            </div>
                                        )
                                    }
                                    <Card draggable={false} id={cardId} lang={lang} />
                                </div>
                            ))
                        )
                }
            </div>
        </div>
    );
};

export default DroppableSection;
