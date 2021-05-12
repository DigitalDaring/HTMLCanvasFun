
const funStuff = () => {
    type Circle = {
        x: number;
        y: number;
        speed: number;
        maxRadius: number;
        currentRadius: number;
        thickness: number;
    }

    const canvas = document.getElementById('draw-on-me') as HTMLCanvasElement;
    const currentContext = canvas.getContext('2d') as CanvasRenderingContext2D;
    const circles = [] as Array<Circle>;
    let deleteQueue = [] as Array<Circle>;

    const wipeTheCanvasClean = () => {
        currentContext.fillStyle = 'rgba(255, 255, 255, 255)';
        currentContext.fillRect(0, 0, 900, 900);
    }

    const drawCircle = (ctx: CanvasRenderingContext2D, circle: Circle) => {
        // I see a circle and I want to stroke style black.
        const alpha = Math.floor(circle.currentRadius / circle.maxRadius * 255)
        currentContext.strokeStyle = `rgba(${alpha},${alpha},${alpha}, 255)`;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.currentRadius, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
    }

    const enlargeCircle = (circle) => {
        if(circle.currentRadius < circle.maxRadius) {
            circle.currentRadius += circle.speed;
        } else {
            deleteQueue.push(circle);
        }
    };

    const addACircle = (startX, startY, startRadius, maxRadius, randomSpeed) => {
        const newCircle = {
            x: startX,
            y: startY,
            currentRadius: startRadius,
            maxRadius: maxRadius,
            speed: randomSpeed,
            thickness: 1
        };

        circles.push(newCircle);
    }

    const addRandomCircle = () => {
        const randomX = Math.floor((Math.random() * 800) + 100);
        const randomY = Math.floor((Math.random() * 800) + 100);
        const randomStartSize = Math.floor((Math.random() * 20) + 1);
        const randomMaxSize = Math.floor((Math.random() * 200) + 50);
        const randomSpeed = Math.random() * 2 + 1;
        addACircle(randomX, randomY, randomStartSize, randomMaxSize, randomSpeed);
    }

    const wipeOldCircles = () => {
        deleteQueue.forEach(toDelete => {
            const found = circles.indexOf(toDelete);
            if (found > -1) {
                circles.splice(found, 1);
            }
        });
        deleteQueue = [];
    }

    const drawCircles = () => {
        wipeTheCanvasClean();
        wipeOldCircles();
        circles.forEach(circle => {
            drawCircle(currentContext, circle);
            enlargeCircle(circle);
        })
    }



    const queueNextCircle = () => {
        let nextTimeout = Math.random() * 200 + 50;
        window.setTimeout(() => {
            addRandomCircle();
            queueNextCircle();
        }, nextTimeout)
    }

    queueNextCircle();

    // RENDER LOOP
    window.setInterval(() => {
        drawCircles();
    }, 1000 / 60);
}

window.onload = funStuff;