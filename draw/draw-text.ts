const drawText = (ctx: CanvasRenderingContext2D, text, x, y) => {
    ctx.font = '30px Roboto';
    ctx.fillText(text, x, y);
}

export default drawText;