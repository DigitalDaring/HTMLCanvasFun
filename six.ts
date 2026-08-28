import wipeTheCanvasClean from './draw/wipe-the-canvas-clean';
import { drawFilledCircle } from './draw/draw-circle';

type Circle = {
    row: number;
    col: number;
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

const pageSixStuff = () => {
    const video = document.getElementById('video') as HTMLVideoElement;
    const inputCanvas = document.getElementById('input') as HTMLCanvasElement;
    const outputCanvas = document.getElementById('output') as HTMLCanvasElement;
    const inputContext = inputCanvas.getContext('2d') as CanvasRenderingContext2D;
    const outputContext = outputCanvas.getContext('2d') as CanvasRenderingContext2D;
    const rocketButton = document.getElementById('switch-filter-button') as HTMLAnchorElement;

    const pixelsPerRow = 1920;
    const diameters = [4,8,12,16,20,32];
    let currentDiameter = 3;
    let diameter = diameters[3];

    const draw = () => {
        
        //wipeTheCanvasClean(outputContext, "rgba(255,255,255,255)");
        wipeTheCanvasClean(outputContext, "rgba(0,0,0,255)");
        inputContext.drawImage(video, 0, 0, inputCanvas.clientWidth, inputCanvas.clientHeight);
        //outputContext.drawImage(video, 0, 0, inputCanvas.clientWidth, inputCanvas.clientHeight);
        const imageData = inputContext.getImageData(0, 0, inputCanvas.clientWidth, inputCanvas.clientHeight);
        // stylizeImage(imageData);
        // outputContext.putImageData(imageData, 0, 0);
        const circles = getVideoCircles(imageData, diameter);
        console.log(circles.length);
        circles.forEach((circle) => {
            drawFilledCircle(outputContext, circle.col, circle.row, diameter/2 - 1, circle.red, circle.green, circle.blue);
        });
        // const drawMe = circles[200];
        // drawFilledCircle(outputContext, drawMe.col, drawMe.row, diameter, drawMe.red, drawMe.green, drawMe.blue);
        // console.log(drawMe);
    }

    const noChange = (column, row, rgba) => {
        return rgba;
    }

    const solarize = (column, row, rgba) => {
        const [r,g,b,a] = rgba;
        const solarR = 255 - r;
        const solarG = 255 - g;
        const solarB = 255 - b;
        return [solarR, solarG, solarB, a];
    }

    const hardRamp = (column, row, rgba) => {
        const [r,g,b,a] = rgba;
        const biggest = Math.max(r,g,b);
        const highlow = biggest > 125 ? 255 : 0;
        return [highlow, highlow, highlow, 255];
    }

    const grayScale = (column, row, rgba) => {
        const [r,g,b,a] = rgba;
        const biggest = Math.max(r,g,b);
        return [biggest, biggest, biggest, 255];
    }

    const pixelated = (column, row, rgba) => {
        const [r,g,b,a] = rgba;
        const newA = column % 4 === 0 || row % 4 === 0 ? 0 : 255;
        return [r,g,b,newA];
    }

    const filtersKinda = [noChange, solarize, hardRamp, grayScale, pixelated];
    let currentFilter = 0;

    const getVideoCircles = (frame, circleDiameter):Circle[] => {
        const subPixels = frame.data;
        const pixelCount = subPixels.length / 4;
        const circles: Circle[] = [];

        for (let i = Math.floor(circleDiameter/2); i < pixelCount; i+=circleDiameter) {
            const rPos = i * 4;
            const gPos = rPos + 1;
            const bPos = gPos + 1;
            const aPos = bPos + 1;

            const red = frame.data[rPos];
            const green = frame.data[gPos];
            const blue = frame.data[bPos];
            const alpha = frame.data[aPos];
            const col = i % pixelsPerRow;
            const row = Math.floor(i / pixelsPerRow);

            if (row % circleDiameter === 0) {
                const newCircle = {
                    row,
                    col,
                    red,
                    green,
                    blue,
                    alpha
                } as Circle;

                circles.push(newCircle);
            }

            
        }

        return circles;
    }

    const stylizeImage = (frame) => {
        const subPixels = frame.data;
        const pixelCount = subPixels.length / 4;

        for (let i = 0; i < pixelCount; i++) {
            const rPos = i * 4;
            const gPos = rPos + 1;
            const bPos = gPos + 1;
            const aPos = bPos + 1;

            const red = frame.data[rPos];
            const green = frame.data[gPos];
            const blue = frame.data[bPos];
            const alpha = frame.data[aPos];

            const col = i % pixelsPerRow;
            const row = Math.floor(i / pixelsPerRow);

            const filterToApply = filtersKinda[currentFilter];
            const [r,g,b,a] = filterToApply(col, row, [red, green, blue, alpha]);
            frame.data[rPos] = r;
            frame.data[gPos] = g;
            frame.data[bPos] = b;
            frame.data[aPos] = a;
        }
    }

    rocketButton.onclick = () => {
        //currentFilter = currentFilter >= filtersKinda.length - 1 ? 0 : currentFilter + 1;
        
    }

    const changeDiameter = () => {
        if (currentDiameter === diameters.length -1) {
            currentDiameter = 0;
        } else {
            currentDiameter++;
        }
        diameter = diameters[currentDiameter];
    }

    let hiddenVideo = false;

    video.onplay = () => {
        if(!video.paused && !video.ended) {
            video.style.opacity = '0';
            hiddenVideo = true;
            outputCanvas.style.opacity = '1';
        }
    }

    const catchAnimationFrame = () => {
        setTimeout(() => {
            window.requestAnimationFrame(catchAnimationFrame);
        }, 1000/24);
        draw();
    };
    catchAnimationFrame();

    addEventListener("keyup", (event) => { 
        changeDiameter();
    });
}

window.onload = pageSixStuff;