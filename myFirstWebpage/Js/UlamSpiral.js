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

// Set starting position at center of canvas
const cX = canvas.width / 2;
const cY = canvas.height / 2;

// Spiral variables
var step = 0;
var dir = -1;
var stepsInDir = 1;
var timesTurned = 0;
var stepsToTake = 1;
// Step size
const dS = 30;
// Length of the spiral
const spiralLength = 24;

// Current position on the spiral
var x = cX;
var y = cY;

// Previous position on the spiral
var px = cX;
var py = cY;

// Circle constants
const circleRad = 10;
const circleColor = "#000000";

// Variables for a timer that keeps track of the current step in the loop
var gen = "";

// Delay between every step on the loop
const loopDelay = 100;
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

// Initialize program before entering loop
// Set font for the text used
g.font = "20px Georgia";

// Draw starting screcXn
fillRect(bgRect, bgColor);

// Enter game loop
function main() {
  // One step less left until we have to turn
  stepsInDir--;
  // Update direction
  if(stepsInDir == 0){
    dir++;
    dir %= 4;
  }

  // Calculate next position based on direction
  switch (dir) {
    case 0: // Move to the right
      x = x + dS;
      break;
    case 1: // Move up
      y = y - dS;
      break;
    case 2: // Move to the left
      x = x - dS;
      break;
    case 3: // Move down
      y = y + dS;
      break;
    default:
      break;
  }

  // Draw a point on new position
  drawCircle(x, y);
  // Draw a line from new position to previous one
  drawLine(x, y, px, py);

  // Set previous point to be this point after completing the drawing step
  px = x;
  py = y;

  // If its time to turn, do:
  if (stepsInDir == 0) {
    // Add one to the times we have turned
    timesTurned++;
    // Reset the steps we need to take in a direction before turning
    stepsInDir = stepsToTake;
    // If we have already turned twice, 
    if (timesTurned % 2 == 0) {
      // Make the steps we have to take in the new direction one unit longer
      stepsToTake++;
    }
  }
  // Log current direction and step
  console.log("dir: ", dir);

  // Go to next step
  step++;
  console.log("step: ", step);

  // Keep track of the current step on the screen.
  gen = "Step: " + (step+1).toString();
  document.getElementById("genCount").innerHTML = gen;

  // If we are at the end of the spiral stop the loop
  if (step >= spiralLength) {
    stopLoop();
  }
}

// Stop loop on any state
function stopLoop() {
  clearInterval(loopInterval);
}

// Start loop if it hasn't been started yet
function start() {
  // Draw circle at starting position
  drawCircle(cX, cY);
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
  dir = -1;
  stepsInDir = 1;
  timesTurned = 0;
  stepsToTake = 1;

  // Reset the counter for steps
  step = 0;
  gen = "Step: " + step.toString();
  document.getElementById("genCount").innerHTML = gen;
}
