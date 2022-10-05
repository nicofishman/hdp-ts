import React, { FC } from 'react';

import Container from '../common/Container';

interface PlayersCardProps {
    players: {displayName: string; isOwner: boolean}[];
};

const PlayersCard: FC<PlayersCardProps> = ({ players }) => {
    return (
        <Container className='flex w-auto flex-col'>
            <div className='divide-y divide-gray-400'>
                {
                    players.map((p, i) => (
                        <div key={i} className='mx-2 flex flex-row justify-between gap-2 py-2'>
                            <span className='font-main text-2xl'>{p.displayName}</span>
                            {
                                p.isOwner &&
                            (
                                <span className='font-main text-2xl'>👑</span>
                            )
                            }
                        </div>
                    ))
                }
            </div>
        </Container>
    );
};

export default PlayersCard;
