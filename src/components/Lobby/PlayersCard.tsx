import clsx from 'clsx';
import React, { FC } from 'react';
import { FaTrash } from 'react-icons/fa';

import { Firestore } from '../../firebase/Firestore';
import { Player } from '../../types/game';
import Container from '../common/Container';

interface PlayersCardProps {
    players: Player[];
    gameOwner: string;
    userId: string;
    gameId: string;
};

const PlayersCard: FC<PlayersCardProps> = ({ players, gameOwner, userId, gameId }) => {
    return (
        <Container className='flex w-full flex-col'>
            <div className='divide-y divide-gray-400'>
                {
                    players.map((p, i) => (
                        <div key={p.id} className={clsx('w-full', i === 0 && 'rounded-t-md', i === players.length - 1 && 'rounded-b-md', p.id === userId && 'bg-green-500 dark:bg-green-700')}>
                            <div className={clsx('mx-2 flex flex-row items-center justify-between gap-2 py-2')}>
                                <span className='font-main text-2xl'>{p.displayName}</span>
                                {p.id === gameOwner && (
                                    <span className='font-main text-2xl'>👑</span>
                                )}
                                {gameOwner === userId && gameOwner !== p.id && (
                                    <FaTrash className='cursor-pointer fill-red-700 dark:fill-red-500' size={20} onClick={() => Firestore.removePlayerFromGame(p, gameId)} />
                                )}
                            </div>
                        </div>
                    ))
                }
            </div>
        </Container>
    );
};

export default PlayersCard;
