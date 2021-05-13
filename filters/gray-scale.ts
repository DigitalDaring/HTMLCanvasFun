const grayScale = (column, row, rgba) => {
    const [r,g,b,a] = rgba;
    const biggest = Math.max(r,g,b);
    return [biggest, biggest, biggest, 255];
}

export default grayScale;