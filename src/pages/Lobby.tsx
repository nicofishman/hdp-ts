import { doc, onSnapshot } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import SpinningWheel from '../components/common/SpinningWheel';
import { useAuthContext } from '../context/AuthContext';
import { db } from '../firebase/Firestore';
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
        if (!user.uid) {
            toast(t('auth.loginRequired'), {
                type: 'error',
                containerId: 'A',
                theme: 'colored',
                position: 'top-right'
            });
            toast.clearWaitingQueue();

            return;
        };
        onSnapshot(doc(db, `Games/${id}`), (snapshot) => {
            const data = snapshot.data();

            if (!data) return;

            setGame({ id, ...data } as Game);
            const playersIdArray = data.players.map((p: Player) => p.id);

            if (!playersIdArray.includes(user.uid)) {
                console.log('not in game', playersIdArray, user.uid);

                toast(t('playernotingame'), {
                    type: 'error',
                    containerId: 'A',
                    theme: 'colored',
                    closeOnClick: false,
                    autoClose: false
                });
            } else {
                if (data.isStarted) {
                    navigate(`/game/${id}`);
                }
            }
        });
    }, [user]);

    return game.id
        ? (
            <div>
                {
                    game.players.map(p => (
                        <div key={p.id}>
                            {p.displayName}
                        </div>
                    ))
                }
                {game.shortCode}
            </div>
        )
        : (
            <SpinningWheel />
        );
};

export default Lobby;
