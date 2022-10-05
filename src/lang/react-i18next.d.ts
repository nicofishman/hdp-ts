import 'react-i18next';

import globalEs from './es/global.json';

declare module 'react-i18next' {
    // and extend them!
    interface CustomTypeOptions {
        // custom namespace type if you changed it
        defaultNS: 'global';
        // custom resources type
        resources: {
            global: typeof globalEs;
        };
    };
};
