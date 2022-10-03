import React, { FC } from 'react';

import cartasEs from '../public/cartas/es.json';
import Card from '../components/Card';

interface CardsProps {

}

const Cards: FC<CardsProps> = () => {
    return (
        <div className='grid grid-cols-6 gap-8 w-full p-8'>

            {
                cartasEs.blackCards.map((carta, index) => {
                    return (
                        <Card key={index} bgColor={'black'} text={carta.text} />
                    );
                })
            }
            {
                cartasEs.whiteCards.map((carta, index) => {
                    return (
                        <Card key={index} bgColor={'white'} text={carta.text} />
                    );
                })
            }
        </div>
    );
};

export default Cards;
