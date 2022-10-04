import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import globalEn from './en/global.json';
import globalEs from './es/global.json';

i18n
    .use(initReactI18next)
    .init({
        lng: 'es',
        resources: {
            es: {
                global: globalEs
            },
            en: {
                global: globalEn
            }
        }
    });

export default i18n;
