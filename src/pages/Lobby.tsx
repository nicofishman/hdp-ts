import { doc, onSnapshot } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMdSend } from 'react-icons/io';

import Button from '../components/common/Button';
import SpinningWheel from '../components/common/SpinningWheel';
import PlayersCard from '../components/Lobby/PlayersCard';
import ShortCodeCard from '../components/Lobby/ShortCodeCard';
import { useAuthContext } from '../context/AuthContext';
import { Firestore } from '../firebase/Firestore';
import { Game, Player } from '../types/game';
import Input from '../components/common/Input';
import { CardSet, cardSets } from '../lang/cardSets';
import Select from '../components/common/Select';

interface LobbyProps {}

const Lobby: FC<LobbyProps> = () => {
    const { id } = useParams();
    const { user, changeDisplayName } = useAuthContext();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);
    const usernameRef = React.useRef<HTMLInputElement>(null);
    const [game, setGame] = useState<Game>({} as Game);
    const { t } = useTranslation('global');

    useEffect(() => {
        setUsername(user.displayName || null);

        const unsuscribe = onSnapshot(
            doc(Firestore.db, `Games/${id}`),
            (snapshot) => {
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
                    if (data.state === 'playing') {
                        navigate(`/game/${id}`);
                    }
                }
            }
        );

        return () => unsuscribe();
    }, [user]);

    const startGameClick = async () => {
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
            const { error } = await Firestore.startGame(game.id);

            if (error) {
                toast(t(error) as string, {
                    type: 'error',
                    containerId: 'A',
                    theme: 'colored',
                    closeOnClick: false,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: false
                });
            }
        }
    };

    const handleChangeUsername: React.MouseEventHandler<SVGElement> = async (
        e
    ) => {
        e.preventDefault();
        const usernameValue = usernameRef.current?.value || null;

        if (!usernameValue) {
            toast(t('usernameError'), {
                type: 'error',
                containerId: 'A',
                theme: 'colored',
                closeOnClick: false,
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: false
            });
        } else {
            await changeDisplayName(usernameValue);
            toast(t('usernameChanged'), {
                type: 'success',
                containerId: 'A',
                theme: 'colored',
                closeOnClick: false,
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: false
            });
        }
    };

    const handleLanguageChange = (lang: CardSet) => {
        Firestore.updateGameCardSet(game.id, lang);
        setGame({ ...game, lang });
    };

    const handlePointsToWinChange = (points: number) => {
        Firestore.updateGamePointsToWin(game.id, points);
        setGame({ ...game, pointsToWin: points });
    };

    return game.id ? (
        <div className="relative mx-[10%] flex h-screen w-full min-w-[215px] flex-col items-center justify-center gap-8 sm:mx-[17%] md:mx-[15%] lg:mx-[25%] xl:mx-[35%]">
            <PlayersCard
                gameId={game.id}
                gameOwner={game.owner}
                gamePlayers={game.players}
                userId={user.uid}
            />
            {game.owner === user.uid && (
                <>
                    <div className="flex h-28 w-full flex-col gap-4 md:h-14 md:flex-row [&>*]:flex-1">
                        <Select
                            className="h-14"
                            mainOption={'Card Set'}
                            options={Object.entries(cardSets).map(
                                ([key, value]) => {
                                    return {
                                        text: value,
                                        value: key,
                                        selected: game.lang === key
                                    };
                                }
                            )}
                            onChange={(value) =>
                                handleLanguageChange(value as CardSet)
                            }
                        />
                        <div className="w-full place-self-end">
                            <label className="font-main text-base">
                                {t('pointsToWin')}
                            </label>
                            <Input
                                className="h-10"
                                min={1}
                                type="number"
                                value={game.pointsToWin}
                                onChange={(e) =>
                                    handlePointsToWinChange(
                                        parseInt(e.target.value)
                                    )
                                }
                            />
                        </div>
                    </div>
                    <Button
                        className="h-10 w-1/2 min-w-[160px] text-lg"
                        text={t('startgame')}
                        onClick={startGameClick}
                    />
                </>
            )}
            <div className="absolute bottom-5 flex w-full min-w-[160px] flex-col gap-4 md:flex-row">
                <div className="relative flex h-full min-h-[40px] w-full flex-1 flex-col gap-y-0.5 place-self-end">
                    <label className="absolute -top-6 font-main text-base">
                        {t('username')}
                    </label>
                    <Input
                        className="h-full min-h-[40px]"
                        divClassName="h-full min-h-[40px]"
                        endDecorator={
                            <IoMdSend
                                className="h-full w-full translate-y-[-20%] scale-50 cursor-pointer"
                                onClick={handleChangeUsername}
                            />
                        }
                        myRef={usernameRef}
                        placeholder={t('enterUsername')}
                        style={{ height: '40px' }}
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <ShortCodeCard code={game.shortCode} />
            </div>
        </div>
    ) : (
        <SpinningWheel />
    );
};

export default Lobby;
