import drawText from './draw/draw-text';
import drawLine from './draw/draw-line';
import {drawRectangle, fillRectangle, fillRectangleNotGrey} from './draw/draw-rectangle';
import { NumberLiteralType } from 'typescript/lib/typescript';

const heightMap = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,3,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];

// y, x, z
let pointLightPosition = {x: 0, y: 4, z: 6};

const forEveryTexel = (doThing) => {
    for (let y = 0; y < heightMap.length; y++) {
        for(let x = 0; x < heightMap[y].length; x++) {
            const z = heightMap[y][x];
            doThing(x, y, z);
        }
    }
}

type LineCalcParams = {
    texelX: number;
    texelY: number;
    texelZ: number;
    targetX: number;
    targetY: number;
    targetZ: number;
}

type TexelCoordinates = {
    x: number;
    y: number;
    z: number;
    lightAngle: number;
    potentialShadowCasterAngle: number;
    potentialShadowCasterDistance: number;
}

const getQuadrant = (startX, startY, endX, endY) => {
    const xDif = endX - startX;
    const yDif = endY - startY;

    if (yDif >= 0) {
        return xDif >= 0 ? 1 : 2;
    } else {
        return xDif >= 0 ? 4 : 3;
    }
}

const drawLineToPointLight = (ctx: CanvasRenderingContext2D, params: LineCalcParams) => {
    ctx.strokeStyle = `rgba(0,0,0,255)`;
    drawLine(ctx, params.texelX, params.texelY, params.targetX, params.targetY);
}

const drawLineToPotentialShadowCaster = (ctx: CanvasRenderingContext2D, params: LineCalcParams) => {
    ctx.strokeStyle = `rgba(200,0,0,255)`;
    drawLine(ctx, params.texelX, params.texelY, params.targetX, params.targetY);
}

const getPotentialShadowCasters = (texelX, texelY, texelZ, lightX, lightY): Array<TexelCoordinates> => {
    const higherPoints: Array<TexelCoordinates> = [];

    const startX = Math.min(texelX, lightX);
    const startY = Math.min(texelY, lightY);
    const endX = Math.max(texelX, lightX);
    const endY = Math.max(texelY, lightY);

    for(let shadowCasterY = startY; shadowCasterY <= endY; shadowCasterY++) {
        for (let shadowCasterX = startX; shadowCasterX <= endX; shadowCasterX++) {
            const shadowCasterZ = heightMap[shadowCasterY][shadowCasterX];
            if (shadowCasterZ > texelZ){

                const lightRise = endY - startY;
                const lightRun = endX - startX;
                const lightAngle = Math.atan(lightRun/lightRise);

                const shadowStartX = Math.min(texelX, shadowCasterX);
                const shadowStartY = Math.min(texelY, shadowCasterY);
                const shadowEndX = Math.max(texelX, shadowCasterX);
                const shadowEndY = Math.max(texelY, shadowCasterY);

                const shadowRise = shadowEndY - shadowStartY;
                const shadowRun= shadowEndX - shadowStartX;
                const shadowAngle = Math.atan(shadowRun/shadowRise);
                const shadowDistance = Math.sqrt(Math.pow(shadowRise, 2) + Math.pow(shadowRun, 2));

                const higherPoint: TexelCoordinates = {
                    x: shadowCasterX,
                    y: shadowCasterY,
                    z: shadowCasterZ, 
                    lightAngle,
                    potentialShadowCasterAngle: shadowAngle,
                    potentialShadowCasterDistance: shadowDistance
                } 
                higherPoints.push(higherPoint);
            }
        }
    }

    // forEveryTexel((x,y,z) => {
    //     if (z > texelZ){
    //         const higherPoint: TexelCoordinates = {x, y, z} 
    //         higherPoints.push(higherPoint);
    //     }
    // });

    return higherPoints;
}

const pageEightStuff = () => {
    let currentAngle = 0;
    const canvasCleared = document.getElementById('draw-with-clear') as HTMLCanvasElement;
    const currentContextCleared = canvasCleared.getContext('2d') as CanvasRenderingContext2D;

    const sizePerTexel = 100;

    document.onkeydown = function(evt) {
        
       switch(evt.code) {
         case "ArrowDown":
            pointLightPosition.y += 1;
            break;
         case "ArrowUp":
            pointLightPosition.y -= 1;
            break;
         case "ArrowLeft":
            pointLightPosition.x -= 1;
            break;
         case "ArrowRight":
            pointLightPosition.x += 1;
            break;
         default:
            console.log(evt.code);
            break;
       }
        
    }

    const wipeTheCanvasClean = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 255)';
        ctx.fillRect(0, 0, 800, 800);
    }
    

    const drawFrame = (ctx) => {
        const midpoint = Math.floor(sizePerTexel / 2);
        const lightX = pointLightPosition.x;
        const lightY = pointLightPosition.y;
        const lightZ = pointLightPosition.z;


        const drawTexel = (x,y,z) => {
            const startX = x*sizePerTexel;
            const endX = x*sizePerTexel+sizePerTexel;
            const startY = y*sizePerTexel;
            const endY = y*sizePerTexel+sizePerTexel;
            const height = z * 32;
            currentContextCleared.strokeStyle = `rgba(0,0,0,255)`;
            if(height > 0) {
                fillRectangle(ctx, startX, startY, sizePerTexel, sizePerTexel, 255 - height);
            }

            drawRectangle(ctx, startX, startY, sizePerTexel, sizePerTexel);
            // drawLineToPointLight(ctx, {
            //     texelX: startX + midpoint, 
            //     texelY: startY + midpoint, 
            //     texelZ: z, 
            //     targetX: lightX * sizePerTexel + midpoint, 
            //     targetY: lightY * sizePerTexel + midpoint,
            //     targetZ: lightZ * sizePerTexel + midpoint
            // });

            const potentialShadowCasters = getPotentialShadowCasters(x, y, z, lightX, lightY);
            ctx.fillStyle = `rgba(0,0,0,255)`;
            //drawText(ctx, `${potentialShadowCasters.length}`, startX + midpoint, startY + midpoint);

            potentialShadowCasters.forEach((texel) => {
                // drawLineToPotentialShadowCaster(ctx, {
                //     texelX: startX + midpoint, 
                //     texelY: startY + midpoint, 
                //     texelZ: z, 
                //     targetX: texel.x * sizePerTexel + midpoint, 
                //     targetY: texel.y * sizePerTexel + midpoint,
                //     targetZ: texel.z * sizePerTexel + midpoint
                // });

                const big = Math.max(texel.lightAngle, texel.potentialShadowCasterAngle);
                const lil = Math.min(texel.lightAngle, texel.potentialShadowCasterAngle);

                const distanceToShadowCaster = texel.potentialShadowCasterDistance;
                const angleDiff = big - lil;
                const combination = angleDiff * distanceToShadowCaster;
                if (combination <= .5) {
                    //drawText(ctx, `${combination.toFixed(2)}`, startX + midpoint, startY + midpoint);
                    fillRectangle(ctx, startX, startY, sizePerTexel, sizePerTexel, 0);
                }
                
                // if (angleDiff < 0.15) {
                //     //drawText(ctx, `${angleDiff.toFixed(2)}`, startX + midpoint, startY + midpoint);
                //     fillRectangle(ctx, startX, startY, sizePerTexel, sizePerTexel, 0);
                // }
                //drawText(ctx, `${texel.lightAngle.toFixed(2)}`, startX, startY);
                //drawText(ctx, `${texel.potentialShadowCasterAngle.toFixed(2)}`, startX + midpoint + 3, startY + midpoint + 3);

            });
            //drawText(ctx, `${z}`, startX + midpoint, startY + midpoint);
        }
        wipeTheCanvasClean(ctx);
        forEveryTexel(drawTexel);
        ctx.fillStyle = `rgba(255,255,143,255)`;
        fillRectangleNotGrey(ctx, lightX * sizePerTexel, lightY * sizePerTexel, sizePerTexel, sizePerTexel)


        // const radians = currentAngle * Math.PI / 180;
        // ctx.translate(x + width, y + height);
        // ctx.rotate(radians);
        // drawRectangle(ctx, -(width / 2), -(height / 2), width, height);
        // ctx.rotate(-radians);
        // ctx.translate(-(x + width), -(y + height));

    }


    const catchAnimationFrame = () => {
        window.requestAnimationFrame(catchAnimationFrame);
        wipeTheCanvasClean(currentContextCleared);
        drawFrame(currentContextCleared);

        // if (currentAngle <= 359) {
        //     currentAngle++;
        // } else {
        //     currentAngle = 0;
        // }

        // if (isLightening) {
        //     if (currentGrey <= 254) {
        //         currentGrey++;
        //     } else {
        //         isLightening = false;
        //     }
        // } else {
        //     if (currentGrey > 0) {
        //         currentGrey--;
        //     } else {
        //         isLightening = true;
        //     }
        // }
    }

    window.requestAnimationFrame(catchAnimationFrame);
}

window.onload = pageEightStuff;
