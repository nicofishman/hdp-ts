export const cardSets = {
    es: 'Español',
    en: 'English',
    jave: 'Javerim'
} as const;

export type CardSet = keyof typeof cardSets;
