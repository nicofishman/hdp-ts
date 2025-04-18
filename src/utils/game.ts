import { CardSet } from '../lang/cardSets';
import { Languages } from '../lang/i18n';
import cartasEn from '../public/cartas/en.json';
import cartasEs from '../public/cartas/es.json';
import cartasJave from '../public/cartas/jave.json';
import { Card } from '../types/game';
const characters = 'CDEFHJKMNPRTVWXY23456789';

interface JSONCards {
    [key: string]: Card[];
}

const cardSet: Record<CardSet, JSONCards> = {
    en: cartasEn as JSONCards,
    es: cartasEs as JSONCards,
    jave: cartasJave as JSONCards
};

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

export const shuffleCards = (
    lang: CardSet,
    color: 'Black' | 'White',
    sentCards: number[],
    cardsPerPlayer: number
) => {
    const cards = cardSet[lang];

    const colorplusCards =
        color === 'Black' ? cards.blackCards : cards.whiteCards;

    const cardsToShuffle = colorplusCards
        .filter((card: Card) => !sentCards.includes(card.id))
        .map((card: Card) => card.id);

    const shuffledCards = cardsToShuffle.sort(() => 0.5 - Math.random());

    const cardsToReturn = [];

    for (let i = 0; i < cardsPerPlayer; i++) {
        cardsToReturn.push(shuffledCards[i]);
    }

    return cardsToReturn;
};

export const getCardById = (
    id: number,
    lang: CardSet
): Card & { color: 'white' | 'black' } => {
    const cardsLang = cardSet[lang];
    const cardsToUse = cardsLang.whiteCards.concat(cardsLang.blackCards);
    const card: Card = cardsToUse.find((c) => c.id === id)!;

    return {
        ...card,
        color: cardsLang.whiteCards.map((c) => c.id).includes(card.id)
            ? 'white'
            : 'black'
    };
};

export const createHashFromToCards = (cards: number[]) => {
    return cards.join('-');
};

export const decodeHash = (hash: string) => {
    return hash.split('-').map((c) => parseInt(c));
};

export const getCardsFromHash = (hash: string, lang: Languages) => {
    const cardIds = hash.split('-').map((c) => parseInt(c));
    const cards: Card[] = [];

    cardIds.forEach((id) => {
        cards.push(getCardById(id, lang));
    });

    return cards;
};
