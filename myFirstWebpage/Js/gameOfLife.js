"use strict";
var canvas = document.querySelector("canvas");
canvas.width = 640;
canvas.height = 640;

var g = canvas.getContext("2d");

g.font = "20px Georgia";

var bgColor = "#69fd9a";
var bgRect = { x: 0, y: 0, w: 640, h: 640 };

var resolution = 16; // Number of squares on the grid
var gridRect = {
  // Every cell on the grid
  x: 0,
  y: 0,
  w: resolution,
  h: resolution,
};
var gridCols = bgRect.w / resolution;
var gridRows = bgRect.h / resolution;

function fillRect(r, color) {
  g.fillStyle = color;
  g.fillRect(r.x, r.y, r.w, r.h);
}

function new2D_Array(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function drawScene(arr) {
  for (let i = 0; i < gridCols; i++) {
    for (let j = 0; j < gridRows; j++) {
      gridRect.x = i * resolution;
      gridRect.y = j * resolution;
      if (arr[i][j] == 1) {
        fillRect(gridRect, "#000000");
      } else if (arr[i][j] == 0) {
        // fillRect(gridRect, "#FFFFFF"); // Decomment this if you want black and white grid
      }
    }
  }
}
var grid;
var nextGrid;

grid = new2D_Array(gridCols, gridRows);
for (let i = 0; i < gridCols; i++) {
  for (let j = 0; j < gridRows; j++) {
    grid[i][j] = Math.floor(Math.random() * 2);
  }
}

var timer = 0;
var gen = 0;

var loopInterval;
// Draw the background and the grid
fillRect(bgRect, bgColor);

// Enter game loop
function main() {
  // Draw the background and the grid
  fillRect(bgRect, bgColor);
  drawScene(grid);

  // Update background
  nextGrid = new2D_Array(gridCols, gridRows);
  var newX;
  var newY;
  var neighbors = 0;
  for (let i = 0; i < gridCols; i++) {
    for (let j = 0; j < gridRows; j++) {
      for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
          newX = (i + dx + gridCols) % gridCols;
          newY = (j + dy + gridRows) % gridRows;
          neighbors += grid[newX][newY];
        }
      }
      neighbors -= grid[i][j];
      if (grid[i][j] == 0 && neighbors == 3) {
        nextGrid[i][j] = 1;
      } else if (grid[i][j] == 1 && (neighbors > 3 || neighbors < 2)) {
        nextGrid[i][j] = 0;
      } else {
        nextGrid[i][j] = grid[i][j];
      }
      neighbors = 0;
    }
  }
  grid = nextGrid;

  // Keep track of the current generation on the screen.
  timer++;
  gen = "Generation: " + timer.toString();
  document.getElementById("genCount").innerHTML = gen;
}

function stop() {
  clearInterval(loopInterval);
}

function start() {
  if (loopInterval != null) {
    clearInterval(loopInterval);
  }
  loopInterval = setInterval(main, 10);
}

function reset() {
  grid = new2D_Array(gridCols, gridRows);
  for (let i = 0; i < gridCols; i++) {
    for (let j = 0; j < gridRows; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
  // Draw the background and the grid
  fillRect(bgRect, bgColor);
  drawScene(grid); 

  // Reset the counter for generations
  timer = 0;
  gen = "Generation: " + timer.toString();
  document.getElementById("genCount").innerHTML = gen;
}
