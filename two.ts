import drawText from './draw/draw-text';

const pageTwoStuff = async () => {
    const canvas = document.getElementById('draw-on-me') as HTMLCanvasElement;
    const currentContext = canvas.getContext('2d') as CanvasRenderingContext2D;
    currentContext.strokeStyle = `rgba(0,0,0,255)`;

    const drawImageFromUrl = async (ctx: CanvasRenderingContext2D, imgUrl) =>
        new Promise((resolve) => {
            const img = new window.Image();
            img.addEventListener('load', () => {
                ctx.drawImage(img, 0, 0);  // specify width + height as well if you want to scale
                resolve();
            });
            img.setAttribute('src', imgUrl);
        });

    await drawImageFromUrl(currentContext, 'meowt.png');

    const textAngle = -30; // -30 degrees angle;
    const radians = textAngle * Math.PI / 180;
    currentContext.rotate(radians);
    drawText(currentContext, 'Check meowt!', -50, 200);
    currentContext.rotate(-radians);
}

window.onload = pageTwoStuff;