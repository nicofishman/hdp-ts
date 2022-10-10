import { DragOverlay, useDraggable } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import clsx from 'clsx';
import { CSS } from '@dnd-kit/utilities';
import React, { FC } from 'react';

import mono from '../../public/img/Mono.png';
import { Card } from '../../types/game';

interface DraggableCardStackProps {
    cards: Card[];
    draggable: boolean;
    stackId: string;
    playerId: string;
};

const DraggableCardStack: FC<DraggableCardStackProps> = ({ cards, draggable, stackId, playerId }) => {
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

    return (
        <div ref={setNodeRef} className='h-full w-full bg-red-500' {...attributes} {...listeners} role='none'>
            <DragOverlay dropAnimation={{
                duration: 500,
                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
            }} modifiers={[restrictToWindowEdges]} style={style}>
                {
                    cards.map((card, idx) => {
                    // const offset = index === 0 ? 'top-0' : 'top-20';

                        const rotation = cards.length === 1 ? 'rotate-0' : idx === 0 ? 'rotate-[7deg] translate-x-20' : 'rotate-[-7deg] -translate-x-20';

                        return (
                            <div key={card.id} className={clsx('absolute transition-transform', rotation)}>
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
        </div>

    );
};

export default DraggableCardStack;
