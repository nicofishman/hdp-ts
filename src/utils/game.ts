import { Languages } from '../lang/i18n';
import cartasEn from '../public/cartas/en.json';
import cartasEs from '../public/cartas/es.json';
import { Card } from '../types/game';
const characters = 'CDEFHJKMNPRTVWXY23456789';

export const generateShortCode = () => {
    const rand = new Uint32Array(1);

    crypto.getRandomValues(rand);
    let codeNumber = rand[0];

    let code = '';

    while (codeNumber > 0) {
        const index = codeNumber % characters.length;

        code = characters[index] + code;
        codeNumber = (codeNumber - index) / characters.length;
    }

    return code;
};

export const shuffleCards = (lang: Languages, color: 'Black' | 'White', sentCards: number[], cardsPerPlayer: number) => {
    const cards: { whiteCards: Card[], blackCards: Card[] } = lang === 'es' ? cartasEs : cartasEn;

    console.log(sentCards);

    const colorplusCards = color === 'Black' ? cards.blackCards : cards.whiteCards;

    const cardsToShuffle = colorplusCards.filter((card: Card) => !sentCards.includes(card.id)).map((card: Card) => card.id);

    const shuffledCards = cardsToShuffle.sort(() => 0.5 - Math.random());

    const cardsToReturn = [];

    for (let i = 0; i < cardsPerPlayer; i++) {
        cardsToReturn.push(shuffledCards[i]);
    }

    return cardsToReturn;
};
