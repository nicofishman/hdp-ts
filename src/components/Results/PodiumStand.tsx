'use client';

import { Trophy, Medal } from 'lucide-react';

type Winner = {
    position: number;
    name: string;
    score: number;
};

export const PodiumStand = ({ winner }: { winner: Winner }) => {
    const getHeight = () => {
        switch (winner.position) {
            case 1:
                return 'sm:h-48 h-20 sm:h-56 md:h-64 sm:w-24 md:w-32 w-[87.5%]';
            case 2:
                return 'sm:h-40 h-20 sm:h-48 md:h-52 sm:w-24 md:w-32 w-[75%]';
            case 3:
                return 'sm:h-32 h-20 sm:h-36 md:h-40 sm:w-24 md:w-32 w-[50%]';
            default:
                return 'sm:h-24 h-20 sm:h-28 md:h-32 sm:w-24 md:w-32 w-[87.5%]';
        }
    };

    const getPositionIcon = () => {
        switch (winner.position) {
            case 1:
                return (
                    <Trophy className="h-6 w-6 text-yellow-400 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                );
            case 2:
                return (
                    <Medal className="h-5 w-5 text-gray-400 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                );
            case 3:
                return (
                    <Medal className="h-4 w-4 text-amber-700 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                );
            default:
                return null;
        }
    };

    const getPositionColor = () => {
        switch (winner.position) {
            case 1:
                return 'bg-yellow-400';
            case 2:
                return 'bg-gray-400';
            case 3:
                return 'bg-amber-700';
            default:
                return 'bg-zinc-600';
        }
    };

    return (
        <div className="flex w-full flex-col justify-start sm:w-fit sm:items-center sm:justify-center">
            <div className="mb-1 ml-5 flex flex-col sm:mb-2 sm:ml-0 sm:items-center">
                {getPositionIcon()}
                <h2 className="text-base font-bold sm:text-lg md:text-xl">
                    {winner.name}
                </h2>
                <p className="text-sm text-zinc-600 sm:text-base">
                    {winner.score} puntos
                </p>
            </div>
            <div
                className={`${getHeight()} flex  items-center justify-center rounded-md bg-slate-200  ${
                    winner.position === 1
                        ? 'order-2'
                        : winner.position === 2
                        ? 'order-1'
                        : 'order-3'
                }`}
            >
                <div className="flex flex-col items-center gap-2">
                    <div
                        className={`${getPositionColor()} flex h-8 w-8 items-center justify-center rounded-full font-bold text-black sm:h-9 sm:w-9 md:h-10 md:w-10`}
                    >
                        {winner.position}
                    </div>
                </div>
            </div>
        </div>
    );
};
