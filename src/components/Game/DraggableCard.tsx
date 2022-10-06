import clsx from 'clsx';
import React, { FC } from 'react';

import mono from '../../public/img/Mono.png';

interface DraggableCardProps {
    bgColor: 'white' | 'black';
    text: string;
};

const DraggableCard: FC<DraggableCardProps> = ({ bgColor, text }) => {
    return (
        <div className={clsx('shadow-my-card relative mr-0.5 mb-0.5 h-60 w-40 min-w-[160px] cursor-grabbing select-none break-words rounded-md border-[1px] border-black p-2 text-center transition-transform duration-200',
            bgColor === 'white' ? ('bg-white text-black') : ('bg-black text-white')
        )}>
            <p className={'flex h-auto w-full select-none p-1 text-left font-card text-card font-bold leading-5'}>{text}</p>
            <img alt="Mono" className={clsx('absolute bottom-0 right-0 h-auto w-16')} src={mono} />
        </div>
    );
};

export default DraggableCard;
