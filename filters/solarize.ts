const solarize = (column, row, rgba) => {
    const [r,g,b,a] = rgba;
    const solarR = 255 - r;
    const solarG = 255 - g;
    const solarB = 255 - b;
    return [solarR, solarG, solarB, a];
}

export default solarize;