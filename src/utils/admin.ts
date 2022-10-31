export const isFishman = (userId: string) => {
    if (!userId || !import.meta.env.VITE_adminId) return false;

    return userId === import.meta.env.VITE_adminId;
};
