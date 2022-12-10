export const isFishman = (userId: string) => {
    console.log('isFishman', userId, import.meta.env.VITE_adminId);

    return userId === import.meta.env.VITE_adminId;
};
