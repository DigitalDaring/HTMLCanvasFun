import {Circle} from "../models/circle";

const drawCircle = (ctx: CanvasRenderingContext2D, circle: Circle, reverseAlpha = false) => {
    // I see a circle and I want to stroke style black.
    const alpha = reverseAlpha ? 255 - Math.floor(circle.currentRadius / circle.maxRadius * 255) : Math.floor(circle.currentRadius / circle.maxRadius * 255)
    ctx.strokeStyle = `rgba(${alpha},${alpha},${alpha}, 255)`;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.currentRadius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
}

export default drawCircle;