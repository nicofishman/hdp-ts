import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { MdLeaderboard } from 'react-icons/md';
import { isMobile } from 'react-device-detect';

import { useAuthContext } from '../../context/AuthContext';
import { useDragAndDropContext } from '../../context/DragAndDropContext';
import { useGameContext } from '../../context/GameContext';
import { Firestore } from '../../firebase/Firestore';
import { Languages } from '../../lang/i18n';
import { getCardById } from '../../utils/game';
import Card from '../Card';
import Button from '../common/Button';
import PlayersCard from '../Lobby/PlayersCard';

import DroppableSection from './DroppableSection';
import PointsModal from './PointsModal';

interface TopContainerProps {
    currentBlackCard: number;
    lang: Languages;
};

const TopContainer: FC<TopContainerProps> = ({ currentBlackCard, lang }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const { setCurrentPick, droppedCards, hdpDroppedCards } = useDragAndDropContext();
    const { game, hasSentCards } = useGameContext();
    const { user } = useAuthContext();
    const { t } = useTranslation('global');
    const blackCard = getCardById(currentBlackCard, lang);

    const isHDP = game.players.filter(p => p.id === user.uid)[0].isHdp;

    useEffect(() => {
        setCurrentPick(blackCard.pick!);
    }, [currentBlackCard]);

    const handleSendCards = async () => {
        if (isHDP) {
            if (hdpDroppedCards.length !== 1) {
                toast(t('numbercardserror'), {
                    position: 'top-right',
                    type: 'error',
                    containerId: 'A',
                    theme: 'colored',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true
                });
                toast.clearWaitingQueue();
            } else {
                await Firestore.finishRound(game.id, hdpDroppedCards[0].playerId);
            }
        } else {
            if (droppedCards.length === blackCard.pick) {
                Firestore.sendCards(game.id, user.uid, droppedCards);
            } else {
                toast(t('numbercardserror'), {
                    position: 'top-right',
                    type: 'error',
                    containerId: 'A',
                    theme: 'colored',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true
                });
                toast.clearWaitingQueue();
            }
        }
    };

    return (
        <div className="flex h-full w-full flex-col justify-center">
            <div className={clsx('absolute top-0 m-2 flex aspect-square h-16', !isMobile && 'w-28')}>

                <Button className='w-full justify-around' onClick={() => setModalOpen(true)}>
                    {!isMobile && (<span>{`${t('round')} ${game.currentRound}`}</span>)}
                    <MdLeaderboard color="#000" size={30}/>
                </Button>
            </div>
            <PointsModal open={modalOpen} setOpen={setModalOpen}>
                <PlayersCard points gameId={game.id} gameOwner={game.owner} gamePlayers={game.players} userId={user.uid}/>
            </PointsModal>
            <div className='flex w-full flex-row flex-wrap items-center justify-center gap-8'>
                <Card bgColor={blackCard.color} draggable={false} id={blackCard.id} text={blackCard.text}/>
                <DroppableSection lang={lang} numberOfCards={blackCard.pick}/>
            </div>
            {
                (
                    <div className='flex w-full justify-center'>
                        <Button className={clsx('mt-4 ml-[-16px] aspect-square p-3', hasSentCards && 'cursor-not-allowed')} onClick={handleSendCards}>
                            {
                                hasSentCards
                                    ? (
                                        <IoMdCheckmarkCircle className='text-2xl text-green-700 dark:text-green-500'/>
                                    )
                                    : (

                                        <RiSendPlaneFill size={25}/>
                                    )
                            }
                        </Button>
                    </div>
                )
            }

        </div>
    );
};

export default TopContainer;
