const funStuff = () => {
    const canvas = document.getElementById('draw-on-me') as HTMLCanvasElement;
    const currentContext = canvas.getContext('2d') as CanvasRenderingContext2D;
    currentContext.strokeStyle = `rgba(0,0,0,255)`;
    const drawLine = (ctx: CanvasRenderingContext2D, startX, startY, endX, endY) => {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    };

    const drawCircle = (ctx: CanvasRenderingContext2D, x, y, radius) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
    }

    const drawRectangle = (ctx: CanvasRenderingContext2D, x, y, width, height) => {
        ctx.fillRect(x, y, width, height);
    }

    const drawText = (ctx: CanvasRenderingContext2D, text, x, y) => {
        ctx.font = '30px Roboto';
        ctx.fillText(text, x, y);
    }

    const drawDeathlyHallows = (ctx: CanvasRenderingContext2D, x, y) => {
        const bottom = y - 150;
        const bottomLeftX = x - 150;
        const bottomLeftY = bottom;
        const bottomRightX = x + 150;
        const bottomRightY = bottom;
        const top = y - 350;
        const circleMiddleY = y - 225;
        const circleRadius = 75;

        drawLine(currentContext, bottomLeftX,bottomLeftY,x,top);
        drawLine(currentContext, bottomRightX,bottomRightY,x,top);
        drawLine(currentContext, bottomLeftX,bottomLeftY,bottomRightX,bottomRightY);
        drawLine(currentContext, x, bottom, x, top);
        drawCircle(currentContext, x, circleMiddleY, circleRadius);
    }

    const drawCheckbox = (ctx: CanvasRenderingContext2D, x, y) => {
        drawRectangle(ctx, x,y,50,50);
        ctx.strokeStyle = `rgba(35,155,40,255)`;
        drawLine(ctx, x + 5, y + 5, x + 25, y + 35);
        drawLine(ctx, x + 25, y + 35, x + 75, y - 30)
        ctx.strokeStyle = `rgba(0,0,0,255)`;
    }

    drawDeathlyHallows(currentContext, 450, 450);
    drawCheckbox(currentContext, 200, 200);
    drawText(currentContext, 'Check me out!', 100, 100);
}

window.onload = funStuff;