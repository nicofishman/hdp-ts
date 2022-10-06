import clsx from 'clsx';
import React, { FC } from 'react';

import { Languages } from '../lang/i18n';
import mono from '../public/img/Mono.png';
import { getCardById } from '../utils/game';

interface CardProps {
    bgColor?: 'black' | 'white';
    text?: string;
    calledBy?: 'top' | 'bottom';
    id?: number;
    lang?: Languages
}

const Card: FC<CardProps> = ({ bgColor, text, calledBy = 'bottom', id, lang }) => {
    if (id && lang) {
        const card = getCardById(id, lang);

        return (
            <Card bgColor={card.color} text={card?.text}/>
        );
    }

    return (
        <div className={clsx('shadow-my-card relative mr-0.5 mb-0.5 h-60 w-40 min-w-[160px] select-none break-words rounded-md border-[1px] border-black p-2 text-center transition-transform duration-200',
            bgColor === 'white' ? ('bg-white text-black') : ('bg-black text-white'),
            calledBy === 'bottom' && bgColor === 'white' ? ('cursor-grab hover:translate-y-[-0.8em]') : ('translate-y-0')
        )}>
            <p className={'flex h-auto w-full select-none p-1 text-left font-card text-card font-bold leading-5'}>{text}</p>
            <img alt="Mono" className={clsx('absolute bottom-0 right-0 h-auto w-16')} src={mono} />
        </div>

    );
};

export default Card;
