import { DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import clsx from 'clsx';
import React, { FC } from 'react';

import mono from '../../public/img/Mono.png';
import { Card } from '../../types/game';

interface DraggableCardStackProps {
    cards: Card[];
    style: React.CSSProperties;
};

const DraggableCardStack: FC<DraggableCardStackProps> = ({ cards, style }) => {
    return (
        <DragOverlay modifiers={[restrictToWindowEdges]} style={style}>
            {
                cards.map((card, index) => {
                    const offset = index === 0 ? 'top-0' : 'top-20';

                    return (
                        <div key={card.id} className={clsx('absolute bg-yellow-500', offset)}>
                            <div className={clsx('shadow-my-card relative mr-0.5 mb-0.5 h-60 w-40 min-w-[160px] cursor-grabbing select-none break-words rounded-md border-[1px] border-black p-2 text-center transition-transform duration-200',
                                card.color === 'white' ? ('bg-white text-black') : ('bg-black text-white')
                            )}>
                                <p className={'flex h-auto w-full select-none p-1 text-left font-card text-card font-bold leading-5'}>{card.text}</p>
                                <img alt="Mono" className={clsx('absolute bottom-0 right-0 h-auto w-16')} src={mono} />
                            </div>
                        </div>
                    );
                }
                )
            }
        </DragOverlay>
    );
};

export default DraggableCardStack;
