/// <reference path="../p5jstemp/TSDef/p5.global-mode.d.ts"/>

let grid;
let futureGrid;
let cols;
let rows;
let squareSize = 10;

function setup() {
    frameRate(10);
    let canvas = createCanvas(800,800);
    canvas.parent('canvas-frame');
    cols = width / squareSize;
    rows = height / squareSize;
    
    grid = createGrid(cols, rows);
    futureGrid = createGrid(cols, rows);

    for(let i = 0; i < cols; i ++) {
        for(let j = 0; j < rows; j ++) {
           grid[i][j] = Math.floor(random(0, 2));  
        }
    }
}
function draw() {
    background(0);

    //draw the grid
    for(let i = 0; i < cols; i ++) {
        for(let j = 0; j < rows; j ++) {
           if(grid[i][j] == 0){
               fill(255);
               stroke(0);
               rect(i*squareSize, j*squareSize, squareSize, squareSize);
           } 
        }
    }
    console.table(grid);
    checkNeighbours();
    
}


function createGrid(cols, rows) {
    let array = new Array(cols);
    for(let i = 0; i < rows; i ++) {
        array[i] = new Array(rows);
    }
    return array;
}

function checkNeighbours(){
    for(let i = 1; i < cols-1; i ++) {
        for(let j = 1; j < rows-1; j ++) {
            let liveNeighbours = 0;

            if(grid[i+1][j] == 1) {
                liveNeighbours += 1;
            }
            if(grid[i-1][j] == 1) {
                liveNeighbours += 1;
            }
            if(grid[i][j+1] == 1) {
                liveNeighbours += 1;
            }
            if(grid[i][j-1] == 1) {
                liveNeighbours += 1;
            }
            if(grid[i+1][j+1] == 1) {
                liveNeighbours += 1;
            }
            if(grid[i+1][j-1] == 1) {
                liveNeighbours += 1;
            }
            if(grid[i-1][j+1] == 1) {
                liveNeighbours += 1;
            }
            if(grid[i-1][j-1] == 1) {
                liveNeighbours += 1;
            }

            if(grid[i][j] == 1) {        
                
                //rule 1, 2, 3.
                if(liveNeighbours < 2 || liveNeighbours > 3){
                    futureGrid[i][j] = 0;
                } else {
                    futureGrid[i][j] = 1;
                }
                
            } else {
                //rule 4.
                if(liveNeighbours == 3){
                    futureGrid[i][j] = 1;
                }
            }
        }
    }
    console.table(futureGrid);
    grid = futureGrid.slice(0);
}