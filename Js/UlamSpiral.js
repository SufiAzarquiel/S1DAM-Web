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
var canvas = document.getElementById("canvas");
let canSize = 640;
canvas.width = canSize;
canvas.height = canSize;
var g = canvas.getContext("2d");

// Rectangle for drawing canvas background
var bgColor = "#69fd9a";
var bgRect = { x: 0, y: 0, w: canSize, h: canSize };

// Set starting position at center of canvas
const cX = canvas.width / 2;
const cY = canvas.height / 2;

// Spiral variables
var step = 1;
var dir = 0;
var stepsInDir = 1;
var timesTurned = 0;
// Step size
const dS = 10;
// Columns and rows on the spiral
const cols = canvas.width / dS;
const rows = canvas.height / dS;
// Length of the spiral, adjusting to canvas size
const spiralLength = cols*rows - rows*2 + 1;

// Current position on the spiral
var x = cX;
var y = cY;

// Previous position on the spiral
var px = cX;
var py = cY;

// Circle constants
const circleColor = "#000000";

// Variables for a timer that keeps track of the current step in the loop
var gen = "";

// Delay between every step on the loop
const loopDelay = 1;
// Main loop
var loopInterval = null;

// Function for drawing rectangles to the screen
function fillRect(r, color) {
  g.fillStyle = color;
  g.fillRect(r.x, r.y, r.w, r.h);
}

// Function for drawing a circle at a given position
function drawCircle(x, y) {
  // Draw arc at x, y
  g.beginPath(); // Create a new line
  g.arc(x, y, dS / 4, 0, 2 * Math.PI, true); // Line is arc at x, y

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
  g.lineWidth = 1;
  g.strokeStyle = circleColor;
  g.stroke();
}

function isPrime(num) {
  if (num == 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
}

// Initialize program before entering loop
// Set font for the text used
g.font = "20px Georgia";

// Draw starting screcXn
fillRect(bgRect, bgColor);

// Enter game loop
function main() {
  // Draw a point on new position if its prime
  if (isPrime(step)) {
    drawCircle(x, y);
  }

  // Draw a line from new position to previous one
  drawLine(x, y, px, py);

  // Set previous point to be this point after completing the drawing step
  px = x;
  py = y;

  // Calculate next position based on direction
  switch (dir) {
    case 0: // Move to the right
      x += dS;
      break;
    case 1: // Move up
      y -= dS;
      break;
    case 2: // Move to the left
      x -= dS;
      break;
    case 3: // Move down
      y += dS;
      break;
    default:
      break;
  }

  // If its time to turn, do:
  if (step % stepsInDir == 0) {
    // Update direction
    dir = (dir + 1) % 4;
    // Add one to the times we have turned
    timesTurned++;
    // If we have already turned twice,
    if (timesTurned % 2 == 0) {
      // Make the steps we have to take in the new direction one unit longer
      stepsInDir++;
    }
  }
  // Keep track of the current step on the screen.
  gen = "Step: " + step.toString();
  document.getElementById("genCount").innerHTML = gen;

  // Go to next step
  step++;

  // If we are at the end of the spiral stop the loop
  if (step > spiralLength) {
    stopLoopUS();
  }
}

// Stop loop on any state
function stopLoopUS() {
  clearInterval(loopInterval);
}

// Start loop if it hasn't been started yet
function startUS() {
  if (loopInterval != null) {
    clearInterval(loopInterval);
  }
  loopInterval = setInterval(main, loopDelay);
}

// Reset loop state
function resetUS() {
  // Draw the background
  fillRect(bgRect, bgColor);

  // Reset x and y values
  x = cX;
  y = cY;
  px = cX;
  py = cY;
  dir = 0;
  stepsInDir = 1;
  timesTurned = 0;

  // Reset the counter for steps
  step = 1;
  gen = "Step: " + step.toString();
  document.getElementById("genCount").innerHTML = gen;
}
