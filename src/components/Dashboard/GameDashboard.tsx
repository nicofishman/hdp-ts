import clsx from 'clsx';
import React, { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

import { Game } from '../../types/game';
import Container from '../common/Container';

import { Firestore } from './../../firebase/Firestore';

interface GameDashboardProps {
    game: Game;
};

const GameDashboard: FC<GameDashboardProps> = ({ game }) => {
    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this game!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            reverseButtons: true,
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await Firestore.deleteGame(game.id);
                Swal.fire(
                    'Deleted!',
                    'Your game has been deleted.',
                    'success'
                );
            }
        });
    };

    return (
        <Container className='relative h-48 p-4'>
            <div className='absolute top-4 right-4 flex flex-row gap-4'>
                <div className={clsx('h-5 w-5 rounded-full', game.isStarted ? 'bg-green-500' : 'bg-red-500')} title={game.isStarted ? 'Empezó' : 'Juego no empezado'} />
                <FaTrash className='cursor-pointer fill-red-700 dark:fill-red-500' size={20} onClick={handleDelete} />
            </div>

            <div className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <span className='text-2xl uppercase'>Game ID: {game.id}</span>
                    <span className='text-xl'>Short Code: {game.shortCode}</span>
                </div>
                <div>
                    {
                        game.players.length > 0 && (
                            <div className='flex flex-row flex-wrap gap-2'>
                                {
                                    game.players.map(p => (
                                        <div key={p.id} className='rounded-full bg-gray-200 px-2 py-1 dark:bg-gray-800'>
                                            <span className='font-main text-2xl' title={p.id}>{p.displayName}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </Container>
    );
};

export default GameDashboard;
