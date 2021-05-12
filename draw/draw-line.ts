const drawLine = (ctx: CanvasRenderingContext2D, startX, startY, endX, endY) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
};

export default drawLine;