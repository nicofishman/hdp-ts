import React, { FC } from 'react';

import { Languages } from '../../lang/i18n';
import { getCardById } from '../../utils/game';
import Card from '../Card';

import DraggableSection from './DraggableSection';

interface TopContainerProps {
    currentBlackCard: number;
    lang: Languages;
};

const TopContainer: FC<TopContainerProps> = ({ currentBlackCard, lang }) => {
    console.log(currentBlackCard);

    const blackCard = getCardById(currentBlackCard, lang);

    return (
        <div className='flex w-full flex-row flex-wrap justify-center gap-8'>
            <Card bgColor={blackCard.color} text={blackCard.text}/>
            <DraggableSection numberOfCards={blackCard.pick}/>
        </div>
    );
};

export default TopContainer;
