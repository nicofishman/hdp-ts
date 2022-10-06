import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import globalEn from './en/global.json';
import globalEs from './es/global.json';

const i18nConfig = {
    lng: 'es',
    resources: {
        es: {
            global: globalEs
        },
        en: {
            global: globalEn
        }
    }
};

export type Languages = keyof typeof i18nConfig.resources;

i18n
    .use(initReactI18next)
    .init(i18nConfig);

export default i18n;
