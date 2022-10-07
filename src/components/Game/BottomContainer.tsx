import React, { FC } from 'react';

import { useAuthContext } from '../../context/AuthContext';
import { useDragAndDropContext } from '../../context/DragAndDropContext';
import { useGameContext } from '../../context/GameContext';
import { Languages } from '../../lang/i18n';
import { getCardById } from '../../utils/game';
import Card from '../Card';

interface BottomContainersProps {
    cards: number[];
    lang: Languages
};

const BottomContainer: FC<BottomContainersProps> = ({ cards, lang }) => {
    const { currentPick, droppedCards } = useDragAndDropContext();

    const { game } = useGameContext();
    const { user } = useAuthContext();

    const isHDP = game.players.filter(p => p.id === user.uid)[0].isHdp;

    console.log(isHDP, user.displayName);

    return (
        <div className='mt-5 flex w-full flex-row flex-wrap justify-center gap-2'>
            {
                !isHDP
                    ? (cards.map((cardId: number) => {
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
                    }))
                    : (
                        <h1>SOS EL HDP</h1>
                    )
            }
        </div>
    );
};

export default BottomContainer;
