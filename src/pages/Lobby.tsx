import { doc, onSnapshot } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../components/common/Button';
import SpinningWheel from '../components/common/SpinningWheel';
import PlayersCard from '../components/Lobby/PlayersCard';
import ShortCodeCard from '../components/Lobby/ShortCodeCard';
import { useAuthContext } from '../context/AuthContext';
import { Firestore } from '../firebase/Firestore';
import { Game, Player } from '../types/game';

interface LobbyProps {

};

const Lobby: FC<LobbyProps> = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [game, setGame] = useState<Game>({} as Game);
    const { t } = useTranslation('global');

    useEffect(() => {
        const unsuscribe = onSnapshot(doc(Firestore.db, `Games/${id}`), (snapshot) => {
            const data = snapshot.data() as Omit<Game, 'id'>;

            if (!data) return;

            setGame({ id, ...data } as Game);
            const playersIdArray = data.players.map((p: Player) => p.id);

            if (!playersIdArray.includes(user.uid)) {
                toast(t('playernotingame'), {
                    type: 'error',
                    containerId: 'A',
                    theme: 'colored',
                    closeOnClick: false,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: false,
                    closeButton: false,
                    onClose: () => {
                        navigate('/');
                    }
                });
            } else {
                if (data.isStarted) {
                    navigate(`/game/${id}`);
                }
            }
        });

        return () => unsuscribe();
    }, [user]);

    const startGameClick = () => {
        if (game.players.length < 2) {
            toast(t('minplayers'), {
                type: 'error',
                containerId: 'A',
                theme: 'colored',
                closeOnClick: false,
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: false
            });
        } else {
            Firestore.startGame(game.id);
        }
    };

    return game.id
        ? (
            <div className='relative mx-[10%] flex h-screen w-full min-w-[215px] flex-col items-center justify-center gap-8 sm:mx-[17%] md:mx-[15%] lg:mx-[25%] xl:mx-[35%]'>
                <PlayersCard gameId={game.id} gameOwner={game.owner} gamePlayers={game.players} userId={user.uid}/>
                {
                    game.owner === user.uid && (
                        <Button className='h-10 w-1/2 min-w-[160px] text-lg' text={t('startgame')} onClick={startGameClick}/>
                    )
                }
                <div className='absolute bottom-5 w-1/2 min-w-[160px]'>
                    <ShortCodeCard code={game.shortCode}/>
                </div>
            </div>
        )
        : (
            <SpinningWheel />
        );
};

export default Lobby;
