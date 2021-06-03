import grayScale from './filters/gray-scale';
import hardRamp from './filters/hard-ramp';
import solarize from './filters/solarize';

const pageSevenStuff = () => {
    const video = document.getElementById('video') as HTMLVideoElement;
    const inputCanvas = document.getElementById('input') as HTMLCanvasElement;
    const outputCanvas = document.getElementById('output') as HTMLCanvasElement;
    const inputContext = inputCanvas.getContext('2d') as CanvasRenderingContext2D;
    const outputContext = outputCanvas.getContext('2d') as CanvasRenderingContext2D;
    const rocketButton = document.getElementById('switch-filter-button') as HTMLAnchorElement;
    const cameraButton = document.getElementById('take-picture-button') as HTMLAnchorElement;

    navigator.mediaDevices.getUserMedia({video: true})
        .then((stream) => {
            video.srcObject = stream;
        }).catch((e) => console.log('a terrible thing has befallen us', e));

    const pixelsPerRow = 640;

    const draw = () => {
        inputContext.drawImage(video, 0, 0, inputCanvas.clientWidth, inputCanvas.clientHeight);
        const imageData = inputContext.getImageData(0, 0, inputCanvas.clientWidth, inputCanvas.clientHeight);
        stylizeImage(imageData);
        outputContext.putImageData(imageData, 0, 0);
    }

    const noChange = (column, row, rgba) => {
        return rgba;
    }


    const ghosting = (column, row, rgba) => {
        const [r,g,b,a] = rgba;
        return [r,g,b,125];
    }

    const greenScreen = (column, row, rgba) => {
        const [r,g,b,a] = rgba;
        const isMostlyGreen = g > r && g > b && g > 100;
        if(isMostlyGreen) {
            return [r,g,b,0];
        } else {
            return rgba;
        }
    }

    const solarPlusGreenScreen = (column, row, rgba) => {
        const solar = solarize(column,row, rgba);
        return greenScreen(column, row, solar);
    }

    const doubleReverse = (column, row, rgba) => {
        const solar = solarize(column,row,rgba);
        const greenSolar = greenScreen(column, row, solar);
        return solarize(column, row, greenSolar);
    }

    const filtersKinda = [noChange, solarize, hardRamp, grayScale, ghosting, greenScreen, solarPlusGreenScreen, doubleReverse];
    let currentFilter = 0;

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
        currentFilter = currentFilter >= filtersKinda.length - 1 ? 0 : currentFilter + 1;
    }

    cameraButton.onclick = () => {
        const takePicture = outputCanvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
        window.location.href=takePicture;
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
}


window.onload = pageSevenStuff;