const wipeTheCanvasClean = (ctx: CanvasRenderingContext2D, color?: string, width = 2000, height = 2000) => {
    ctx.fillStyle = color || 'rgba(255, 255, 255, 255)';
    ctx.fillRect(0, 0, width, height);
}

export default wipeTheCanvasClean;