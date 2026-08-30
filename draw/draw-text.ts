const drawText = (ctx: CanvasRenderingContext2D, text, x, y) => {
    ctx.font = '30px Roboto';
    ctx.fillText(text, x, y);
}

const drawSizedText = (ctx: CanvasRenderingContext2D, text, x, y, size) => {
    ctx.font = `${size}px Roboto`;
    ctx.fillText(text, x, y);
}

export {drawText, drawSizedText};