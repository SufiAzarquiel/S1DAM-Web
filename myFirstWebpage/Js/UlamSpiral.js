// Ulam spiral by Sufian
/*
 * Definition:
 * The Ulam spiral or prime spiral is a graphical depiction of
 * the set of prime numbers constructed by writing the positive
 * integers in a square spiral and specially marking the prime numbers.
 */
// Definition copied from https://en.wikipedia.org/wiki/Ulam_spiral.

"use strict";
var canvas = document.querySelector("canvas");
canvas.width = 640;
canvas.height = 640;
var g = canvas.getContext("2d");

// Rectangle for drawing canvas background
var bgColor = "#69fd9a";
var bgRect = { x: 0, y: 0, w: 640, h: 640 };

// Spiral variables
var length = 3;
var step = 0;
var dS = 0;

// Set starting position at center of canvas
const cX = canvas.width / 2;
const cY = canvas.height / 2;
var x = 0;
var y = 0;
var px = 0;
var py = 0;

// Circle constants
const circleRad = 10;
const circleColor = "#000000";

// Keep track of current frame
g.font = "20px Georgia";
var timer = 0;
var gen = 0;

// Main loop variables
var loopDelay = 100;
var loopInterval;

function fillRect(r, color) {
  g.fillStyle = color;
  g.fillRect(r.x, r.y, r.w, r.h);
}

// Draw starting screen
fillRect(bgRect, bgColor);

// Set initial state
x = cX;
y = cY;
px = cX;
py = cY;
dS = 30;

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

// Enter game loop
function main() {
  // Draw the background
  fillRect(bgRect, bgColor);

  // Update position with a condition
  if (step < length) {
    // Update x and y
    x += dS;
    y += dS;
    step++;
  }

  // Draw a circle to the screen
  drawCircle(x, y);

  // Draw line from current point to previous point
  drawLine(x, y, px, py);

  // Set previous point to be this point after completing the drawing step
  px = x;
  py = y;

  // Keep track of the current step on the screen.
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
  loopInterval = setInterval(main, loopDelay);
}

// Reset progress
function reset() {
  // Draw the background
  fillRect(bgRect, bgColor);

  // Reset x and y values
  x = cX;
  y = cY;
  px = cX;
  py = cY;
  step = 0;

  // Reset the counter for generations
  timer = 0;
  gen = "Generation: " + timer.toString();
  document.getElementById("genCount").innerHTML = gen;
}
