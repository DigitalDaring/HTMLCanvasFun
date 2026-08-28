const drawRectangle = (ctx: CanvasRenderingContext2D, x, y, width, height, grey = 0) => {
    ctx.strokeStyle = `rgba(${grey},${grey},${grey},255)`;
    ctx.strokeRect(x, y, width, height);
}

const fillRectangle = (ctx: CanvasRenderingContext2D, x, y, width, height, grey = 0) => {
    ctx.fillStyle = `rgba(${grey},${grey},${grey},255)`;
    ctx.fillRect(x, y, width, height);
}

const fillRectangleNotGrey = (ctx: CanvasRenderingContext2D, x, y, width, height) => {
    ctx.fillRect(x, y, width, height);
}

export {drawRectangle, fillRectangle, fillRectangleNotGrey};