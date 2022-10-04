export const getTheme = () => {
    const isDark = document.querySelector('.layout')?.classList.contains('dark');

    return isDark ? 'dark' : 'light';
};
