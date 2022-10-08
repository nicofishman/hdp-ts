import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import clsx from 'clsx';
import React, { FC, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { ImCancelCircle } from 'react-icons/im';

import { useAuthContext } from '../../context/AuthContext';
import { useDragAndDropContext } from '../../context/DragAndDropContext';
import { useGameContext } from '../../context/GameContext';
import { Languages } from '../../lang/i18n';
import Card from '../Card';

interface DroppableSectionProps extends HTMLAttributes<HTMLDivElement> {
    numberOfCards?: number;
    lang: Languages;
};

const DroppableSection: FC<DroppableSectionProps> = ({ className, lang, numberOfCards = 1, ...props }) => {
    const { droppedCards, addCardToDroppedCards, setDraggedCard, setIsDragging, undoCard } = useDragAndDropContext();
    const { t } = useTranslation('global');
    const { game, sentCards } = useGameContext();
    const { user } = useAuthContext();
    const isHDP = game.players.filter(p => p.id === user.uid)[0].isHdp;

    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
        disabled: droppedCards.length === numberOfCards,
        data: {
            accepts: ['card']
        }
    });

    useDndMonitor({
        onDragEnd: ({ active, over }) => {
            if (active.id && over?.id === 'droppable') {
                addCardToDroppedCards(Number(active.id));
            }
            setDraggedCard(null);
            setIsDragging(false);
        }
    });

    const width = numberOfCards ? (numberOfCards * 40) + (numberOfCards * 4) : 40;

    return (
        <div className={clsx('flex h-64 border-spacing-5 items-center justify-center gap-4 rounded-md border-[3px] border-dashed border-gray-500 py-2 px-4 text-center transition-colors dark:border-gray-400', isOver && 'border-lime-500 dark:border-lime-500', className)} style={{ width: `${width * 4}px` }} {...props} ref={setNodeRef}>

            {!isHDP
                ? (droppedCards.length === 0 && (
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <span className='font-bold'>{t('drophere')}</span>
                        {
                            numberOfCards > 1 && (
                                <span className='text-sm text-gray-700 dark:text-gray-500'>{t('cardsorder')}</span>
                            )
                        }
                    </div>
                ))
                : (
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <span className='font-bold'>{t('youarehdp')}</span>
                        <span>{sentCards.length} / {game.players.length - 1}</span>
                    </div>
                )}
            {
                droppedCards.map((cardId: number) => (
                    <div key={cardId} className='relative'>
                        <div className='absolute -top-1 -right-1 z-20 cursor-pointer rounded-full bg-red-500 p-1' onClick={() => undoCard(cardId)}>
                            <ImCancelCircle color='#fff' />
                        </div>
                        <Card draggable={false} id={cardId} lang={lang} />
                    </div>
                ))
            }
        </div>
    );
};

export default DroppableSection;
