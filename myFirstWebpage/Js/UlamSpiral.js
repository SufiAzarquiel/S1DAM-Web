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
const circleRad = 20;

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
dS = 30;

// Enter game loop
function main() {
  // Draw the background
  fillRect(bgRect, bgColor);

  // Update spiral
  if (step < length) {
    // Draw text arc at x, y
    g.beginPath();
    g.arc(x, y, circleRad, 2 * Math.PI, Math.PI / 2, true);
    g.lineWidth = 3;
    g.strokeStyle = "#FF0000";
    g.stroke();

    // Update x and y
    x += dS;
    y += dS;
    step++;
  } else {
    // Draw text arc at x, y
    g.beginPath();
    g.arc(x, y, circleRad, 2 * Math.PI, Math.PI / 2, true);
    g.lineWidth = 3;
    g.strokeStyle = "#FF0000";
    g.stroke();
  }

  // Keep track of the current step on the screen.
  timer++;
  gen = "Generation: " + timer.toString();
  document.getElementById("genCount").innerHTML = gen;
}

function stop() {
  clearInterval(loopInterval);
}

function start() {
  loopInterval = setInterval(main, loopDelay);
}

// Reset progress
function reset() {
  // Draw the background
  fillRect(bgRect, bgColor);

  // Reset x and y values
  x = cX;
  y = cY;

  // Reset the counter for generations
  timer = 0;
  gen = "Generation: " + timer.toString();
  document.getElementById("genCount").innerHTML = gen;
}
