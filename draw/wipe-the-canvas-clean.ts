const wipeTheCanvasClean = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 255)';
    ctx.fillRect(0, 0, 900, 900);
}

export default wipeTheCanvasClean;