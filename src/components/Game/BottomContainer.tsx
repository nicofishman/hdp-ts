import clsx from 'clsx';
import React, { FC, useEffect } from 'react';

import { useAuthContext } from '../../context/AuthContext';
import { useDragAndDropContext } from '../../context/DragAndDropContext';
import { useGameContext } from '../../context/GameContext';
import { Languages } from '../../lang/i18n';
import { getCardById } from '../../utils/game';
import Card from '../Card';

import StackedCards from './StackedCards';

interface BottomContainersProps {
    cards: number[];
    lang: Languages
};

const BottomContainer: FC<BottomContainersProps> = ({ cards, lang }) => {
    const { currentPick, droppedCards, hdpSentCards, setHdpSentCards, hdpDroppedCards, addCardToDroppedCards } = useDragAndDropContext();

    const { game } = useGameContext();
    const { user } = useAuthContext();

    const isHDP = game.players.filter(p => p.id === user.uid)[0].isHdp;

    const allPlayerSentTheirCards = game.sentCards.length === game.players.length - 1;

    useEffect(() => {
        if (isHDP && allPlayerSentTheirCards && hdpDroppedCards.length === 0) {
            setHdpSentCards(game.sentCards);
        }
    }, [game.sentCards]);

    return (
        <div className={clsx('relative mt-5 flex w-full flex-row flex-wrap justify-center gap-2', currentPick > 1 && isHDP && 'gap-x-64 gap-y-10')}>
            {
                !isHDP
                    ? (cards.map((cardId: number) => {
                        const myCard = getCardById(cardId, lang);

                        return (
                            <div key={cardId}>
                                {
                                    !droppedCards.includes(cardId) && (
                                        <Card bgColor={myCard.color} draggable={!(currentPick === droppedCards.length)} id={myCard.id} text={myCard.text} onClick={() => addCardToDroppedCards(cardId)}/>
                                    )
                                }

                            </div>

                        );
                    }))
                    : allPlayerSentTheirCards && (
                        hdpSentCards.map((c) => (
                            <div key={c.playerId} className={clsx('flex h-64 w-40 flex-col')}>
                                { c.cards.length === 1
                                    ? (
                                        <Card bgColor={getCardById(c.cards[0], lang).color} draggable={hdpDroppedCards.length === 0} id={getCardById(c.cards[0], lang).id} playerId={c.playerId} text={getCardById(c.cards[0], lang).text}/>
                                    )
                                    : (
                                        <StackedCards cards={c.cards} draggable={hdpDroppedCards.length === 0} lang={lang} playerId={c.playerId}/>

                                    )
                                }
                            </div>
                        ))
                    )
            }
        </div>
    );
};

export default BottomContainer;
