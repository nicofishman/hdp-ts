import React, { FC } from 'react';

import { useDragAndDropContext } from '../../context/DragAndDropContext';
import { Languages } from '../../lang/i18n';
import { getCardById } from '../../utils/game';
import Card from '../Card';

interface BottomContainersProps {
    cards: number[];
    lang: Languages
};

const BottomContainer: FC<BottomContainersProps> = ({ cards, lang }) => {
    const { currentPick, droppedCards } = useDragAndDropContext();

    return (
        <div className='flex w-full flex-row flex-wrap justify-center gap-2'>
            {
                cards.map((cardId: number) => {
                    const myCard = getCardById(cardId, lang);

                    return (
                        <div key={cardId}>
                            {
                                !droppedCards.includes(cardId) && (
                                    <Card bgColor={myCard.color} draggable={!(currentPick === droppedCards.length)} id={myCard.id} text={myCard.text}/>
                                )
                            }

                        </div>

                    );
                })
            }
        </div>
    );
};

export default BottomContainer;
