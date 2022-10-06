import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import clsx from 'clsx';
import React, { FC, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { useDragAndDropContext } from '../../context/DragAndDropContext';
import { Languages } from '../../lang/i18n';
import Card from '../Card';

interface DroppableSectionProps extends HTMLAttributes<HTMLDivElement> {
    numberOfCards?: number;
    lang: Languages;
};

const DroppableSection: FC<DroppableSectionProps> = ({ className, lang, numberOfCards = 1, ...props }) => {
    const { droppedCards, addCardToDroppedCards, setDraggedCard, setIsDragging } = useDragAndDropContext();
    const { t } = useTranslation('global');

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

                setDraggedCard(null);
                setIsDragging(false);
            }
        }
    });

    const width = numberOfCards ? (numberOfCards * 40) + (numberOfCards * 4) : 40;

    return (
        <div className={clsx('flex h-auto border-spacing-5 items-center justify-center gap-4 rounded-md border-2 border-dashed border-gray-500 py-2 px-4 dark:border-gray-400', isOver && 'bg-lime-500', className)} style={{ width: `${width * 4}px` }} {...props} ref={setNodeRef}>
            {
                droppedCards.length === 0 && (
                    <span>{t('drophere')}</span>
                )
            }
            {
                droppedCards.map((cardId: number) => (
                    <div key={cardId} className='relative'>
                        <span className='absolute -top-1 -right-1 z-20 bg-red-500'>X</span>
                        <Card draggable={false} id={cardId} lang={lang} />
                    </div>
                ))
            }
        </div>
    );
};

export default DroppableSection;
