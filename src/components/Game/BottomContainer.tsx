import React, { FC } from 'react';

import { Languages } from '../../lang/i18n';
import Card from '../Card';

interface BottomContainersProps {
    cards: number[];
    lang: Languages
};

const BottomContainer: FC<BottomContainersProps> = ({ cards, lang }) => {
    return (
        <div className='flex w-full flex-row flex-wrap justify-center gap-2'>
            {
                cards.map((cardId: number) => (
                    <div key={cardId}>
                        <Card id={cardId} lang={lang} />
                    </div>
                ))
            }
        </div>
    );
};

export default BottomContainer;
