// Ulam spiral by Sufian
/*
 * Definition:
 * The Ulam spiral or prime spiral is a graphical depiction of
 * the set of prime numbers constructed by writing the positive
 * integers in a square spiral and specially marking the prime numbers.
 */
// Definition copied from https://en.wikipedia.org/wiki/Ulam_spiral.

// Set canvas
"use strict";
var canvas = document.querySelector("canvas");
canvas.width = 640;
canvas.height = 640;
var g = canvas.getContext("2d");

// Rectangle for drawing canvas background
var bgColor = "#69fd9a";
var bgRect = { x: 0, y: 0, w: 640, h: 640 };

// Spiral variables
var step = 0;
// Step size
const dS = 30;
// Length of the spiral
const spiralLength = 3;
var spiral = new Array(length);

// Set starting position at center of canvas
const cX = canvas.width / 2;
const cY = canvas.height / 2;

// Current position on the spiral
var x = 0;
var y = 0;

// Previous position on the spiral
var px = 0;
var py = 0;

// Circle constants
const circleRad = 10;
const circleColor = "#000000";

// Variables for a timer that keeps track of the current step in the loop
var timer = 0;
var gen = 0;

// Delay between every step on the loop
const loopDelay = 100;
// Main loop
var loopInterval;

// Function for drawing rectangles to the screen
function fillRect(r, color) {
  g.fillStyle = color;
  g.fillRect(r.x, r.y, r.w, r.h);
}

// Function for drawing a circle at a given position
function drawCircle(x, y) {
  // Draw arc at x, y
  g.beginPath(); // Create a new line
  g.arc(x, y, circleRad, 0, 2 * Math.PI, true); // Line is arc at x, y

  // Set color for the inside of the circle
  g.fillStyle = circleColor;
  g.fill();

  // Set width and color for the surrounding circumference
  g.lineWidth = 3;
  g.strokeStyle = circleColor;
  g.stroke();
}

// Function for drawing a line from point x, y to point px, py
function drawLine(x1, y1, x2, y2) {
  // Create the line
  g.beginPath();
  g.moveTo(x1, y1);
  g.lineTo(x2, y2);

  // Set line width and color
  g.lineWidth = 3;
  g.strokeStyle = circleColor;
  g.stroke();
}

// Set all the values of the spiral to be 0
function clearSpiral(arr) {
  // Assign all values in spiral to 0
  for (let i = 0; i < spiralLength; i++) {
    arr[i] = 0;
  }
  return arr;
}

// Initialize program before entering loop
// Set font for the text used
g.font = "20px Georgia";

// Draw starting screen
fillRect(bgRect, bgColor);

// Set initial state
px = cX;
py = cY;

// Initialize the spiral
spiral = clearSpiral(spiral);

// Enter game loop
function main() {
  // Draw the background
  fillRect(bgRect, bgColor);

  // Go to next position if we aren't at the end of the spiral
  if (step < spiralLength) {
    // Set current position in the spiral to be drawn
    spiral[step] = 1;
    step++;
  }

  // Draw the current state of the spiral
  // Iterate through all elements in spiral
  for (let i = 0; i < spiralLength; i++) {
    // If current position on the spiral is not empty
    if (spiral[i] == 1) {
      // Calculate (x, y) position of the circle to be drawn
      x = cX + i * dS;
      y = cY + i * dS;
      drawCircle(x, y);
      drawLine(x, y, px, py);
      // Set previous point to be this point after completing the drawing step
      px = x;
      py = y;
    }
  }

  // Keep track of the current step on the screen.
  timer++;
  gen = "Generation: " + timer.toString();
  document.getElementById("genCount").innerHTML = gen;
}

// Stop loop on any state
function stop() {
  clearInterval(loopInterval);
}

// Start loop if it hasn't been started yet
function start() {
  if (loopInterval != null) {
    clearInterval(loopInterval);
  }
  loopInterval = setInterval(main, loopDelay);
}

// Reset loop state
function reset() {
  // Draw the background
  fillRect(bgRect, bgColor);

  // Reset x and y values
  x = cX;
  y = cY;
  px = cX;
  py = cY;
  step = 0;

  // Reset spiral values to 0
  spiral = clearSpiral(spiral);

  // Reset the counter for generations
  timer = 0;
  gen = "Generation: " + timer.toString();
  document.getElementById("genCount").innerHTML = gen;
}
