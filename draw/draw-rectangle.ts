const drawRectangle = (ctx: CanvasRenderingContext2D, x, y, width, height, grey = 0) => {
    ctx.strokeStyle = `rgba(${grey},${grey},${grey},255)`;
    ctx.strokeRect(x, y, width, height);
}

export default drawRectangle;