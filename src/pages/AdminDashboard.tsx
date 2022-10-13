import { collection, onSnapshot } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SpinningWheel from '../components/common/SpinningWheel';
import GameDashboard from '../components/Dashboard/GameDashboard';
import { useAuthContext } from '../context/AuthContext';
import { Firestore } from '../firebase/Firestore';
import { Game } from '../types/game';
import { isFishman } from '../utils/admin';

interface AdminDashboardProps {

};

const AdminDashboard: FC<AdminDashboardProps> = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [games, setGames] = useState<Game[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user.uid) return;
        if (!isFishman(user.uid)) {
            navigate('/');
        } else {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!user) return;
        const unsuscribe = onSnapshot(collection(Firestore.db, 'Games'), (snapshot) => {
            const games = snapshot.docs.map(doc => doc.data()) as Game[];

            setGames(games);
        });

        return () => unsuscribe();
    }, []);

    if (loading || !games.length) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <SpinningWheel />
            </div>
        );
    }

    return (
        <div className='relative flex h-screen w-full flex-row flex-wrap items-center justify-center gap-4'>
            <div className='absolute top-4 left-4'>
                <button className='rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700' onClick={() => navigate('/')}>Back</button>
            </div>
            {
                games.map(game => (
                    <div key={game.id} className='w-1/3'>
                        <GameDashboard game={game} />
                    </div>
                ))
            }
        </div>
    );
};

export default AdminDashboard;
