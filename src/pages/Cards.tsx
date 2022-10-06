import React, { FC } from 'react';

import cartasEs from '../public/cartas/es.json';
import cartasEn from '../public/cartas/en.json';
import Card from '../components/Card';
import { Languages } from '../lang/i18n';

interface CardsProps {
    lang: Languages
}

const Cards: FC<CardsProps> = ({ lang = 'es' }) => {
    const cartas = lang === 'es' ? cartasEs : cartasEn;

    return (
        <div className='grid w-full grid-cols-6 gap-8 p-8'>

            {
                cartas.blackCards.map((carta, index) => {
                    return (
                        <Card key={index} bgColor={'black'} text={carta.text} />
                    );
                })
            }
            {
                cartas.whiteCards.map((carta, index) => {
                    return (
                        <Card key={index} bgColor={'white'} text={carta.text} />
                    );
                })
            }
        </div>
    );
};

export default Cards;
