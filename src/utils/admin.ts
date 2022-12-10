export const isFishman = (userId: string) => {
    return userId === import.meta.env.VITE_adminId;
};
