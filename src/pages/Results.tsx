import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, onSnapshot } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

import { Game, Player } from '../types/game';
import { useAuthContext } from '../context/AuthContext';
import { Firestore } from '../firebase/Firestore';
import SpinningWheel from '../components/common/SpinningWheel';
import { Confetti } from '../components/common/Confetti';
import { PodiumStand } from '../components/Results/PodiumStand';

interface ResultsProps {}

const Results: FC<ResultsProps> = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const { t } = useTranslation('global');

    const [game, setGame] = useState<Game>({} as Game);

    useEffect(() => {
        const unsuscribe = onSnapshot(
            doc(Firestore.db, `Games/${id}`),
            (snapshot) => {
                const data = snapshot.data() as Omit<Game, 'id'>;

                if (!data) return;

                setGame({ id, ...data } as Game);

                const playersIdArray = data.players.map((p: Player) => p.id);

                if (data.state === 'playing') {
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
                        navigate(`/game/${id}`);
                    }
                } else if (data.state === 'waiting') {
                    navigate(`/lobby/${id}`);
                }
            }
        );

        return () => unsuscribe();
    }, []);

    const sortedPlayers = (game?.players ?? []).sort(
        (a, b) => b.points - a.points
    );
    const winners = sortedPlayers.slice(0, 3).map((player, index) => {
        return {
            position: index + 1,
            name: player.displayName!,
            score: player.points
        };
    });

    const restPlayers = sortedPlayers.slice(3);

    return game.id ? (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <Confetti />
            <header className="mb-4 mt-2 w-full max-w-4xl text-center sm:mb-6 sm:mt-4 md:mb-8">
                <h1 className="mb-1 text-3xl font-bold sm:mb-2 sm:text-4xl md:text-6xl">
                    Resultados finales!
                </h1>
                <p className="text-lg text-zinc-600 sm:text-xl md:text-2xl">
                    Puto el que lee
                </p>
            </header>

            <div className="w-full md:max-w-4xl">
                <div className="mb-6 flex flex-col items-start justify-center gap-3 sm:mb-8 sm:flex-row sm:items-end sm:gap-4 md:mb-12">
                    {winners.map((winner) => (
                        <PodiumStand key={winner.position} winner={winner} />
                    ))}
                </div>
            </div>
            <div className="w-full md:max-w-4xl">
                <div className="mb-6 flex flex-col items-start justify-center gap-3 sm:mb-8 sm:gap-4 md:mb-12">
                    {restPlayers.map((player, index) => (
                        <div
                            key={player.id}
                            className="flex w-full items-center justify-between rounded bg-slate-200 px-4 py-2 text-lg font-bold text-zinc-800 shadow-md sm:text-xl md:text-2xl"
                        >
                            <p className="text-base font-bold sm:text-lg md:text-xl">
                                {index + 4}. {player.displayName}
                            </p>
                            <p className="text-base font-bold sm:text-lg md:text-xl">
                                {player.points} puntos
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <SpinningWheel />
    );
};

export default Results;
