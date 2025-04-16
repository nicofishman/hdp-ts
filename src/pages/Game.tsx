import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { DndContext, DragStartEvent } from '@dnd-kit/core';

import { Game as GameType, Player } from '../types/game';
import { useAuthContext } from '../context/AuthContext';
import { Firestore } from '../firebase/Firestore';
import BottomContainer from '../components/Game/BottomContainer';
import TopContainer from '../components/Game/TopContainer';
import SpinningWheel from '../components/common/SpinningWheel';
import { useDragAndDropContext } from '../context/DragAndDropContext';
import { useGameContext } from '../context/GameContext';
import { decodeHash } from '../utils/game';

interface GameProps {}

const Game: FC<GameProps> = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const {
        setIsDragging,
        setDraggedCards,
        myCards,
        setMyCards,
        setDroppedCards,
        setHdpDroppedCards,
        currentRound,
        setCurrentRound
    } = useDragAndDropContext();
    const { t } = useTranslation('global');
    const { game, setGame, setSentCards, setHasSentCards } = useGameContext();

    useEffect(() => {
        if (!user) return;
        const unsuscribe = onSnapshot(
            doc(Firestore.db, `Games/${id}`),
            (snapshot) => {
                const data = snapshot.data() as Omit<GameType, 'id'>;

                if (!data) return;

                if (game.state === 'waiting') {
                    navigate(`/lobby/${id}`);
                }

                if (!data.players.map((p: Player) => p.id).includes(user.uid)) {
                    toast(t('playernotingame'), {
                        type: 'error',
                        containerId: 'A',
                        theme: 'colored',
                        closeOnClick: false,
                        autoClose: 3000,
                        hideProgressBar: false,
                        pauseOnHover: false,
                        onClose: () => navigate('/')
                    });
                    toast.clearWaitingQueue();

                    return;
                }
                if (
                    data.sentCards.map((st) => st.playerId).includes(user.uid)
                ) {
                    setHasSentCards(true);
                } else {
                    setHasSentCards(false);
                }

                if (currentRound !== data.currentRound) {
                    setDroppedCards([]);
                    setHdpDroppedCards([]);
                }

                setCurrentRound(data.currentRound);
                setGame({ id, ...data } as GameType);
                setSentCards(data.sentCards);
                setMyCards(
                    data.players.find((p: Player) => p.id === user.uid)
                        ?.cards || []
                );
            }
        );

        return () => unsuscribe();
    }, [user, currentRound]);

    if (!game || !game.currentBlackCard) {
        return <SpinningWheel />;
    }

    const handleDragStart = (e: DragStartEvent) => {
        setIsDragging(true);

        setDraggedCards(decodeHash(e.active.id.toString()));
    };

    return (
        <DndContext onDragStart={(e) => handleDragStart(e)}>
            <div className="flex h-auto min-h-screen w-full flex-col divide-y divide-gray-500 md:h-screen">
                <div className="w-full flex-1 py-2">
                    <TopContainer
                        currentBlackCard={game.currentBlackCard}
                        lang={game.lang}
                    />
                </div>

                <div className="flex-1">
                    <BottomContainer cards={myCards} lang={game.lang} />
                </div>
            </div>
        </DndContext>
    );
};

export default Game;
