const hardRamp = (column, row, rgba) => {
    const [r,g,b,a] = rgba;
    const biggest = Math.max(r,g,b);
    const highlow = biggest > 125 ? 255 : 0;
    return [highlow, highlow, highlow, 255];
}

export default hardRamp;