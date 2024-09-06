export const generateColorFromName = (name: string): string => {
    const lastThreeLetters = name.slice(-3).toUpperCase();
    let hash = 0;
    for (let i = 0; i < lastThreeLetters.length; i++) {
        hash = (hash << 5) - hash + lastThreeLetters.charCodeAt(i);
        hash = hash & hash;
    }
    const r = (hash >> 16) & 0xFF;
    const g = (hash >> 8) & 0xFF;
    const b = hash & 0xFF;
    const color = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;

    return color;
};
