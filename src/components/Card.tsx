import { useDraggable } from '@dnd-kit/core';
import clsx from 'clsx';
import { CSS } from '@dnd-kit/utilities';
import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';

import { useDragAndDropContext } from '../context/DragAndDropContext';
import mono from '../public/img/Mono.png';
import { getCardById } from '../utils/game';
import { Card as CardType } from '../types/game';
import { CardSet } from '../lang/cardSets';
import { cn } from '../utils/cn';

import DraggableCard from './Game/DraggableCard';

interface CardProps {
    bgColor?: CardType['color'];
    text?: string;
    id: number;
    lang?: CardSet;
    draggable?: boolean;
    isStacked?: boolean;
    stackId?: string;
    playerId?: string;
    onClick?: () => void;
}

const Card: FC<CardProps> = ({
    bgColor,
    text,
    draggable = true,
    id,
    lang,
    isStacked = false,
    stackId = '',
    playerId = '',
    onClick
}) => {
    const { draggedCards } = useDragAndDropContext();
    const { setNodeRef, attributes, listeners, transform } = useDraggable({
        id: isStacked ? stackId : id.toString(),
        disabled: isMobile || !draggable,
        data: {
            type: 'card',
            isStacked,
            playerId
        }
    });

    const style = {
        transform: CSS.Translate.toString(transform)
    };

    if (draggedCards?.includes(id) && !isStacked) {
        return (
            <div className="absolute z-20 h-52 w-52 bg-transparent">
                <DraggableCard
                    bgColor={bgColor || 'white'}
                    style={style}
                    text={text || ''}
                />
            </div>
        );
    }

    if (id && lang && !isStacked) {
        const card = getCardById(id, lang);

        return (
            <Card
                bgColor={card.color}
                draggable={draggable}
                id={id}
                text={card?.text}
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'shadow-my-card relative mr-0.5 mb-0.5 h-60 w-40 min-w-[160px] select-none break-words rounded-md border-[1px] border-black p-2 text-center transition-transform duration-200',
                bgColor === 'white'
                    ? 'bg-white text-black'
                    : 'cursor-default bg-black text-white',
                !isStacked &&
                    draggable &&
                    !isMobile &&
                    'cursor-grab hover:translate-y-[-0.8em]'
            )}
            onClick={onClick}
            {...attributes}
            {...listeners}
            role="none"
            style={style}
        >
            <p
                className={
                    'flex h-auto w-full select-none p-1 text-left font-card text-card font-bold leading-5'
                }
            >
                {text}
            </p>
            <img
                alt="Mono"
                className={clsx('absolute bottom-0 right-0 h-auto w-16')}
                src={mono}
            />
        </div>
    );
};

export default Card;
