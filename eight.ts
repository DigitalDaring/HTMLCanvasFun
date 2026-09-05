import {drawText, drawSizedText} from './draw/draw-text';
import drawLine from './draw/draw-line';
import {drawRectangle, fillRectangle, fillRectangleNotGrey} from './draw/draw-rectangle';

// const heightColors = [
//     'rgba(140,171,161,255)',
//     'rgba(209,177,135,255)',
//     'rgba(179,165,85,255)',
//     'rgba(146,116,65,255)',
//     'rgba(132,120,117,255)',
//     'rgba()',
// ]

// const shadowColors = [
//     'rgba(75,114,110,255)',
//     'rgba(186,145,88,255)',
//     'rgba(119,116,59,255)',
//     'rgba(77,69,57,255)',
//     'rgba(87,72,82,255)',
//     'rgba()',
// ]

// const heightMap = [
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,1,1,2,3,2,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,1,1,1,2,3,3,3,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,1,1,1,1,2,3,4,3,2,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,1,1,1,2,3,4,4,2,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,1,2,2,3,3,4,3,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,1,0,1,2,2,3,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,1,0,1,1,1,3,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// ];

// const tileMap = [
//     [0,1,1,1,1,1,1,4],
//     [2,8,8,8,8,8,8,3],
//     [2,8,8,8,8,8,8,3],
//     [2,8,8,8,8,8,8,3],
//     [2,8,8,8,8,8,8,3],
//     [2,8,8,8,8,8,8,3],
//     [2,8,8,8,8,8,8,3],
//     [2,8,8,8,8,8,8,3],
//     [5,6,6,6,6,6,6,7]
// ]

const tileMap = [
    [0,1,1,1,4],
    [2,9,9,9,3],
    [2,9,9,9,3],
    [2,9,9,9,3],    
    [5,6,6,6,7]
]

// y, x, z
let pointLightPosition = {x: 10, y: 10, z: 30};

const forEveryTexel = (texelMap, doThing) => {
    for (let y = 0; y < texelMap.length; y++) {
        for(let x = 0; x < texelMap[y].length; x++) {
            const z = texelMap[y][x];
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
    potentialShadowCasterDangle: number;
    lightDangle: number;
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

const pixelByPixel = (ctx: CanvasRenderingContext2D, width: number, height: number, todo: (pixelData, x:number, y:number) => void) => {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelInfo = ctx.getImageData(x, y, 1, 1).data;
            todo(pixelInfo, x, y);
        }
    }
}

const generateBlank2DMap = (width: number, height: number) => {
    const blankMap: Array<Array<number>> = [];
    for (let y = 0; y < height; y++) {
        const newLine: Array<number> = [];
        for (let x = 0; x < width; x++) {
            newLine.push(0);
        }
        blankMap.push(newLine);
    }
    return blankMap;
}

const loadPalette = async(ctx: CanvasRenderingContext2D, paletteImgUrl) => 
    new Promise((resolve) => {
        const allPixelColors = {};
        const img = new window.Image();
        img.addEventListener('load', () => {
            ctx.drawImage(img, 0, 0);
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            
            let currentColorId = 0;

            allPixelColors[-1] = 'rgba(0,0,0,0)';
            allPixelColors['rgba(0,0,0,0)'] = -1;
            allPixelColors[0] = 'rgba(0,0,0,255)';
            allPixelColors['rgba(0,0,0,255)'] = 0;

            pixelByPixel(ctx, width, height, (pixelInfo) => {
                const inRGBA = `rgba(${pixelInfo[0]},${pixelInfo[1]},${pixelInfo[2]},${pixelInfo[3]})`;
                // is it evil to store both directions in the hash? Maybe 🤭
                allPixelColors[inRGBA] = currentColorId;
                allPixelColors[currentColorId] = inRGBA;
                currentColorId++;
            });

            resolve(allPixelColors);
        });
        img.setAttribute('src', paletteImgUrl);
        
    });

const loadImageWithPalette = async (ctx: CanvasRenderingContext2D, imgUrl, palette) =>
    new Promise<Array<Array<number>>>((resolve) => {
        const img = new window.Image();
        img.addEventListener('load', () => {
            ctx.clearRect(0,0,img.naturalHeight, img.naturalWidth);
            ctx.drawImage(img, 0, 0);  // specify width + height as well if you want to scale
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            const imageColorMap = generateBlank2DMap(width, height);
            pixelByPixel(ctx, width, height, (pixelInfo, x, y) => {
                const inRGBA = `rgba(${pixelInfo[0]},${pixelInfo[1]},${pixelInfo[2]},${pixelInfo[3]})`;
                const paletteColorId = palette[inRGBA];
                if (paletteColorId == undefined) {
                    imageColorMap[y][x] = -1;
                } else {
                    imageColorMap[y][x] = paletteColorId;
                }
                
            });
            resolve(imageColorMap);
        });
        img.setAttribute('src', imgUrl);
    });

const drawPixelsWithMapAndPalette = (ctx: CanvasRenderingContext2D, palette, map, offsetX, offsetY) => {
    let height = map.length;
    let width = map[0].length;

    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            const colorId = map[y][x];
            ctx.fillStyle = palette[colorId];
            ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
        }
    }
}

const cutTilesFromMap = (map: Array<Array<number>>, tileWidth, tileHeight) => {
    // This is only gonna work if the maps are exactly divisible by the tile width
    // TODO:  come back and use % to grab straggler pixels maybe?  Throw an error?
    const height = map.length;
    const width = map[0].length;
    const tilesTall = map.length / tileHeight;
    const tilesWide = map[0].length / tileWidth;
    const allTileCount = tilesTall * tilesWide;
    const allTiles: Array<Array<Array<number>>> = [];

    for(let i = 0; i < allTileCount; i++) {
        allTiles.push(generateBlank2DMap(tileWidth, tileHeight));
    }

    for(let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const yTile = Math.floor(y / tileHeight);
            const xTile = Math.floor(x / tileWidth);
            const tileNumber = yTile * tilesWide + xTile;
            const relativeX = x % tileWidth;
            const relativeY = y % tileHeight;
            allTiles[tileNumber][relativeY][relativeX] = map[y][x];
        }
    }

    return allTiles;
}

const assembleTilesIntoImageMap = (tileMap: Array<Array<number>>, tiles, tileWidth, tileHeight) => {
    const fullImageMap = generateBlank2DMap(tileMap[0].length * tileWidth, tileMap.length * tileHeight);
    const fullHeight = fullImageMap.length;
    const fullWidth = fullImageMap[0].length; 
    for(let y = 0; y < fullHeight; y++) {
        for (let x = 0; x < fullWidth; x++) {
            const projectedTile = tiles[tileMap[Math.floor(y/tileHeight)][Math.floor(x/tileWidth)]]
            fullImageMap[y][x]=projectedTile[y%tileHeight][x%tileWidth];
        }
    }
    return fullImageMap;
}

const generateFakeHeightMap = (inputMap: Array<Array<number>>) => {
    const width = inputMap[0].length;
    const height = inputMap.length;
    const newMap = generateBlank2DMap(width, height);

    for (let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            if (inputMap[y][x] === 20) {
                newMap[y][x] = 3;
            } else if (inputMap[y][x] === -1){
                newMap[y][x] = -1;
            } else {
                newMap[y][x] = 0;
            }
        }
    }
    return newMap;
}

const getPotentialShadowCasters = (texelX, texelY, texelZ, lightX, lightY, lightZ, heightMap): Array<TexelCoordinates> => {
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

                const lightDrise = lightZ - texelZ;
                const lightDrun = Math.sqrt(Math.pow(lightRise,2) + Math.pow(lightRun,2));

                const shadowStartX = Math.min(texelX, shadowCasterX);
                const shadowStartY = Math.min(texelY, shadowCasterY);
                const shadowEndX = Math.max(texelX, shadowCasterX);
                const shadowEndY = Math.max(texelY, shadowCasterY);

                const shadowRise = shadowEndY - shadowStartY;
                const shadowDrise = shadowCasterZ - texelZ;
                const shadowRun = shadowEndX - shadowStartX;
                const shadowAngle = Math.atan(shadowRun/shadowRise);
                const shadowDistance = Math.sqrt(Math.pow(shadowRise, 2) + Math.pow(shadowRun, 2));

                // okay brain, we've got our zDiff which is the difference in height between the caster and the shadowed texel
                // and we've got our shadowDistance which is how far it is from the caster to the shadowed texel
                // we also have our height difference between our point light (sun) and our caster
                // calculate the angle of the pointLight to the caster as A1
                // calculate the angle of the caster to the shadowed texel as A2
                // A2 is shallower than A1 then we aren't shadowed

                const lightDangle = Math.atan(lightDrise/lightDrun);
                const shadowDangle = Math.atan(shadowDrise/shadowDistance);

                const higherPoint: TexelCoordinates = {
                    x: shadowCasterX,
                    y: shadowCasterY,
                    z: shadowCasterZ,
                    lightAngle,
                    potentialShadowCasterAngle: shadowAngle,
                    potentialShadowCasterDistance: shadowDistance,
                    potentialShadowCasterDangle: shadowDangle,
                    lightDangle
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

const pageEightStuff = async () => {
    let currentAngle = 0;
    const tileSize = 24;
    const canvasCleared = document.getElementById('draw-with-clear') as HTMLCanvasElement;
    const currentContextCleared = canvasCleared.getContext('2d') as CanvasRenderingContext2D;
    const assetLoader = document.getElementById('asset-loader') as HTMLCanvasElement;
    const assetLoaderContext = assetLoader.getContext('2d') as CanvasRenderingContext2D;

    const sizePerTexel = 4;

    const paletteInfo = await loadPalette(assetLoaderContext, 'aren32-1x.png');
    const imageMap = await loadImageWithPalette(assetLoaderContext, 'green_card_tiles.png', paletteInfo);
    const tiles = cutTilesFromMap(imageMap, tileSize, tileSize);
    const baseLayer = assembleTilesIntoImageMap(tileMap, tiles, tileSize, tileSize);
    const fakeHeightMap = generateFakeHeightMap(baseLayer);

    console.log(fakeHeightMap);

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

        const calculateShadow = (x,y,z) => {
            const potentialShadowCasters = getPotentialShadowCasters(x, y, z, lightX, lightY, lightZ, fakeHeightMap);
            let returnMe = false;
            potentialShadowCasters.forEach((texel) => {
                const big = Math.max(texel.lightAngle, texel.potentialShadowCasterAngle);
                const lil = Math.min(texel.lightAngle, texel.potentialShadowCasterAngle);

                const distanceToShadowCaster = texel.potentialShadowCasterDistance;
                const angleDiff = big - lil;
                const combination = angleDiff * distanceToShadowCaster;
                if (combination <= .5) {
                    if (texel.potentialShadowCasterDangle > texel.lightDangle) {
                        returnMe = true;
                        //fillRectangle(ctx, startX, startY, sizePerTexel, sizePerTexel, 0);
                    }
                }
            });
            return returnMe;
        }

        const drawTexel = (x,y,paletteColor) => {
            const startX = x*sizePerTexel;
            const endX = x*sizePerTexel+sizePerTexel;
            const startY = y*sizePerTexel;
            const endY = y*sizePerTexel+sizePerTexel;
            const z = fakeHeightMap[y][x];
            const isInShadow = z < 0 ? false : calculateShadow(x,y,z);
            //const colorOfTexel = isInShadow ? shadowColors[height] : heightColors[height];
            const colorOfTexel = isInShadow ? 'rgba(50,50,50,255)' : (paletteInfo as any)[paletteColor];
            ctx.fillStyle = colorOfTexel;
            fillRectangleNotGrey(ctx, startX, startY, sizePerTexel, sizePerTexel);
            //drawSizedText(ctx, `${fakeHeightMap[y][x]}`, startX + 1, startY + 1, 10);
            //}

            // if (isInShadow) {
            //     ctx.fillStyle = 'rgba(100,0,0,255)';
            //     drawSizedText(ctx, `${fakeHeightMap[y][x]}`, startX + 1, startY + 1, 10);
            // }

            //drawRectangle(ctx, startX, startY, sizePerTexel, sizePerTexel);

            // drawLineToPointLight(ctx, {
            //     texelX: startX + midpoint, 
            //     texelY: startY + midpoint, 
            //     texelZ: z, 
            //     targetX: lightX * sizePerTexel + midpoint, 
            //     targetY: lightY * sizePerTexel + midpoint,
            //     targetZ: lightZ * sizePerTexel + midpoint
            // });
        }
        wipeTheCanvasClean(ctx);


        
       // drawPixelsWithMapAndPalette(currentContextCleared, paletteInfo, layer, 0,0);



        // tileMap.forEach((row, idy) => {
        //     row.forEach((cell, idx) => {
        //         const yOffset = idy * tileSize;
        //         const xOffset = idx * tileSize;
        //         drawPixelsWithMapAndPalette(currentContextCleared, paletteInfo, tiles[cell], xOffset, yOffset);
        //     });      
        // });
        
        forEveryTexel(baseLayer, drawTexel);
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
