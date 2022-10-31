function gameoflife() {
  document.getElementById("game").innerHTML = "";
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "Js/gameOfLife.js";
  document.getElementById("game").appendChild(script);
  var mdiv = document.createElement("div");
  mdiv.innerHTML =
    '<div class="gameoflife"><h1><a href="https://es.wikipedia.org/wiki/Juego_de_la_vida"target="_blank">The Game of Life</a></h1><button class="homebtn" onclick="drawBtnGoL()">Draw</button><button class="homebtn" onclick="startGoL()">Start</button><button class="homebtn" onclick="stopGoL()">Stop</button><button class="homebtn" onclick="resetGoL()">Reset</button><p id="genCount">Generation: 0</p></div>';
  document.getElementById("game").appendChild(mdiv);
  console.log("gol");
}

function ulamspiral() {
  document.getElementById("game").innerHTML = "";
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "Js/UlamSpiral.js";
  document.getElementById("game").appendChild(script);
  var mdiv = document.createElement("div");
  mdiv.innerHTML =
    '<div class="ulamspiral"><button class="homebtn" onclick="startUS()">Start</button><button class="homebtn" onclick="stopLoopUS()">Stop</button><button class="homebtn" onclick="resetUS()">Reset</button><p id="genCount">Step: 1</p></div>';
  document.getElementById("game").appendChild(mdiv);
  console.log("us");
}
