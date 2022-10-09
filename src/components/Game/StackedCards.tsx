import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import React, { FC } from 'react';

import { useDragAndDropContext } from '../../context/DragAndDropContext';
import { Languages } from '../../lang/i18n';
import { createHashFromToCards, getCardById } from '../../utils/game';
import Card from '../Card';

import DraggableCardStack from './DraggableCardStack';

interface StackedCardsProps {
    cards: number[];
    lang: Languages;
    draggable: boolean;
    playerId: string
};

const StackedCards: FC<StackedCardsProps> = ({ cards, lang, draggable, playerId }) => {
    const stackId = createHashFromToCards(cards);
    const myCards = cards.map((cardId) => getCardById(cardId, lang));

    const { setNodeRef, attributes, listeners, transform } = useDraggable({
        id: stackId.toString(),
        disabled: !draggable,
        data: {
            type: 'card',
            playerId,
            isStacked: true
        }
    });

    const style = {
        transform: CSS.Translate.toString(transform)
    };

    const { draggedCards } = useDragAndDropContext();

    return (
        <div className={clsx('h-full w-full',
            draggable && ('cursor-grab hover:translate-y-[-0.8em]')
        )}>
            {!draggedCards?.includes(cards[0])
                ? (cards.map((cardId: number, idx: number) => {
                    const myCard = getCardById(cardId, lang);
                    const offset = idx === 0 ? 'top-0' : 'top-20';

                    // if (draggedCards?.includes(cardId)) return <></>;

                    return (
                        <div key={cardId} className={clsx('absolute', offset)}>
                            <Card isStacked bgColor={myCard.color} draggable={draggable} id={cardId} lang={lang} stackId={stackId} text={myCard.text}/>
                        </div>
                    );
                }))
                : (
                    <div ref={setNodeRef} className='absolute z-20 h-52 w-52 bg-transparent' {...listeners} {...attributes} role='none'>
                        <DraggableCardStack cards={myCards} style={style}/>
                    </div>
                )}
        </div>
    );
};

export default StackedCards;
