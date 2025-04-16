import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export const Confetti = () => {
    const { width, height } = useWindowSize();
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsActive(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!isActive) return null;

    return (
        <ReactConfetti
            colors={['#000000', '#ffffff', '#ff0000', '#ffd700']}
            gravity={0.2}
            height={height}
            numberOfPieces={500}
            recycle={false}
            width={width}
        />
    );
};
