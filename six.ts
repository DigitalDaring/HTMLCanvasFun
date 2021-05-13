const funStuff = () => {
    const video = document.getElementById('video') as HTMLVideoElement;
    const inputCanvas = document.getElementById('input') as HTMLCanvasElement;
    const outputCanvas = document.getElementById('output') as HTMLCanvasElement;
    const inputContext = inputCanvas.getContext('2d') as CanvasRenderingContext2D;
    const outputContext = outputCanvas.getContext('2d') as CanvasRenderingContext2D;
    const rocketButton = document.getElementById('switch-filter-button') as HTMLAnchorElement;

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

    const filtersKinda = [noChange, hardRamp, grayScale, pixelated];
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

    let hiddenVideo = false;

    video.onplay = () => {
        window.setInterval(() => {
            if(!video.paused && !video.ended) {
                video.style.opacity = '0';
                hiddenVideo = true;
                outputCanvas.style.opacity = '1';
            }
            draw();
        }, 1000 / 20);
    }
}

window.onload = funStuff;