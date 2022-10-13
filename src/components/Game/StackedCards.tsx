import clsx from 'clsx';
import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';

import { useDragAndDropContext } from '../../context/DragAndDropContext';
import { Languages } from '../../lang/i18n';
import { createHashFromToCards, getCardById, getCardsFromHash } from '../../utils/game';
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

    console.log('StackedCards', myCards, cards, draggable);

    const { draggedCards } = useDragAndDropContext();

    return (
        <div className={clsx('relative h-full w-full transition-transform',
            draggable && !isMobile && ('cursor-grab hover:translate-y-[-0.8em]')
        )}>
            {!draggedCards?.includes(cards[0])
                ? (cards.map((cardId: number, idx: number) => {
                    const myCard = getCardById(cardId, lang);

                    // const offset = idx === 0 ? 'top-0' : 'top-20';

                    const rotation = cards.length === 1 ? 'rotate-0' : idx === 0 ? 'rotate-[-7deg] -translate-x-20 z-20' : 'rotate-[7deg] translate-x-20 z-10';

                    return (
                        <div key={cardId} className={clsx('absolute transition-transform', rotation)}>
                            <Card isStacked bgColor={myCard.color} draggable={draggable} id={cardId} lang={lang} stackId={stackId} text={myCard.text}/>
                        </div>
                    );
                }))
                : (
                    <DraggableCardStack cards={myCards} draggable={draggable} playerId={playerId} stackId={stackId} />
                )}
        </div>
    );
};

export default StackedCards;
