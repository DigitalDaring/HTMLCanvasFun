const drawRectangle = (ctx: CanvasRenderingContext2D, x, y, width, height) => {
    ctx.strokeStyle = `rgba(0,0,0,255)`;
    ctx.strokeRect(x, y, width, height);
}

export default drawRectangle;