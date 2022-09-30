import clsx from 'clsx';
import React, { FC } from 'react';

interface CardProps {
    bgColor: 'black' | 'white';
    text: string;
}

const Card: FC<CardProps> = ({ bgColor, text }) => {
    return (
        <div className={clsx('relative w-40 h-60 border-2 rounded-md border-["#666"] mr-0.5 mb-0.5 text-center overflow-wrap break-words shadow-[0.2em_0.2em_0.5em_#333] dark:shadow-[0.2em_0.2em_0.5em_#666] transition-all duration-500, select-none',
            bgColor === 'white' ? ('bg-white text-black') : ('bg-black text-white')
        )}>
            <p className={clsx('text-left flex w-full h-full p-1 select-none font-bold leading-5 text-lg')}>{text}</p>
        </div>
    );
};

export default Card;
