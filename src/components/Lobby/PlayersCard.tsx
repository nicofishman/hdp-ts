import clsx from 'clsx';
import React, { FC } from 'react';
import { FaTrash } from 'react-icons/fa';

import { Firestore } from '../../firebase/Firestore';
import { Player } from '../../types/game';
import Container from '../common/Container';

interface PlayersCardProps {
    gamePlayers: Player[];
    gameOwner: string;
    userId: string;
    gameId: string;
    points?: boolean
};

const PlayersCard: FC<PlayersCardProps> = ({ gamePlayers, gameOwner, userId, gameId, points = false }) => {
    const players = points ? gamePlayers.sort((a, b) => b.points - a.points) : gamePlayers;

    return (
        <Container className='flex w-full flex-col'>
            <div className='divide-y divide-gray-400'>
                {
                    players.map((p, i) => (
                        <div key={p.id} className={clsx('w-full', i === 0 && 'rounded-t-md', i === players.length - 1 && 'rounded-b-md', p.id === userId && 'bg-green-500 dark:bg-green-700')}>
                            <div className={clsx('mx-2 flex flex-row items-center justify-between gap-2 py-2')}>
                                <span className='font-main text-2xl'>{p.displayName}</span>
                                {p.id === gameOwner && !points && (
                                    <span className='font-main text-2xl'>👑</span>
                                )}
                                {gameOwner === userId && gameOwner !== p.id && !points && (
                                    <FaTrash className='cursor-pointer fill-red-700 dark:fill-red-500' size={20} onClick={() => Firestore.removePlayerFromGame(p, gameId)} />
                                )}
                                {
                                    points && (
                                        <span className='font-main text-2xl'>{p.points}</span>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </Container>
    );
};

export default PlayersCard;
