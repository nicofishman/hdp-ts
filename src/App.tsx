import React, { FC } from 'react';

import Card from './components/Card';
import cartasEs from './public/cartas/es.json';

interface AppProps {

};

const App: FC<AppProps> = () => {
    return (
        <div className="bg-slate-600 text-white flex h-full w-full justify-center items-center text-3xl">
            <div className='grid grid-cols-6 gap-8 w-full'>

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
        </div>
    );
};

export default App;
