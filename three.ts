import drawRectangle from './draw/draw-rectangle';

const funStuff = () => {
    let currentAngle = 0;
    let currentGrey = 0;
    let isLightening = false;
    const canvasNotCleared = document.getElementById('draw-no-clear') as HTMLCanvasElement;
    const canvasCleared = document.getElementById('draw-with-clear') as HTMLCanvasElement;
    const canvasWild = document.getElementById('draw-wild') as HTMLCanvasElement;
    const currentContextNotCleared = canvasNotCleared.getContext('2d') as CanvasRenderingContext2D;
    const currentContextCleared = canvasCleared.getContext('2d') as CanvasRenderingContext2D;
    const currentContextWild = canvasWild.getContext('2d') as CanvasRenderingContext2D;

    currentContextNotCleared.strokeStyle = currentContextCleared.strokeStyle = `rgba(0,0,0,255)`;

    const drawCenteredFrame = (ctx, x, y, width, height) => {
        const radians = currentAngle * Math.PI / 180;
        ctx.translate(x + width, y + height);
        ctx.rotate(radians);
        drawRectangle(ctx, -(width / 2), -(height / 2), width, height);
        ctx.rotate(-radians);
        ctx.translate(-(x + width), -(y + height));
    }

    const drawWildFrame = (ctx) => {
        const radians = currentAngle * Math.PI / 180;
        ctx.translate(225, 225);
        ctx.rotate(radians);
        drawRectangle(ctx, 100, 100, 50, 50, currentGrey);
        ctx.rotate(-radians);
        ctx.translate(-225, -225);
    }

    const wipeTheCanvasClean = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 255)';
        ctx.fillRect(0, 0, 300, 300);
    }

    const sixtyFPS = 1000 / 60;
    window.setInterval(() => {
        drawCenteredFrame(currentContextNotCleared, 100, 100, 50, 50);
        wipeTheCanvasClean(currentContextCleared);
        drawCenteredFrame(currentContextCleared, 100, 100, 50, 50);
        drawWildFrame(currentContextWild);

        if (currentAngle <= 359) {
            currentAngle++;
        } else {
            currentAngle = 0;
        }

        if (isLightening) {
            if (currentGrey <= 254) {
                currentGrey++;
            } else {
                isLightening = false;
            }
        } else {
            if (currentGrey > 0) {
                currentGrey--;
            } else {
                isLightening = true;
            }
        }


    }, sixtyFPS)
}

window.onload = funStuff;
