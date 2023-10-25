let map = null;
let noiseScale = 1 / 150;
let ocean = "#008dc4";
let shore = "#00a9cc";
let sand = "#eecda3";
let grass = "#7ec850";
let stone = "#676767";
let snow = "#fffafa";
let currOverlay = 0;

function setup() {
  //
  createCanvas(895, 1280, document.getElementById("canvas-ar"));
  pixelDensity(1);

  noStroke();

  background(0);

  // Refresh the map every 3 seconds
  setInterval(function () {
    noiseSeed(Math.random() * 1000); // Reseed the noise function
    makeMap();
    drawMap();
    overlay();
  }, 3000);
}
function overlay() {
  switch (currOverlay) {
    case 0:
      push();
      fill("#db782f");
      rect(0, 114, 706, 208);
      rect(530, 0, 364, 116);
      rect(530, 0, 176, 1280);
      fill(255);
      rect(0, 0, 530, 113);
      fill(0);
      rect(706, 113, 192, 1167);
      pop();
      break;
    case 1:
      push();
      fill("#61d836");
      rect(0, 0, 895, 126);
      rect(720, 0, 175, 292);
      rect(807, 0, 88, 606);

      rect(0, 1018, 238, 262);
      rect(237, 1172, 658, 108);
      pop();
      break;
    case 2:
      push();
      fill("#00A2FF");
      rect(0, 0, 188, 1242);
      rect(0, 934, 238, 310);
      rect(238, 1082, 658, 198);

      fill(0);
      rect(764, 70, 90, 1210);

      fill(255);
      rect(70, 0, 40, 934);
      rect(0, 1244, 238, 36);
      pop();
      break;
    case 3:
      push();
      fill("#db782f");
      scale(1, -1);
      translate(0, -height);
      rect(0, 0, 188, 1242);
      rect(0, 934, 238, 310);
      rect(238, 1082, 658, 198);

      fill(0);
      rect(764, 70, 90, 1210);

      fill(255);
      rect(70, 0, 40, 934);
      rect(0, 1244, 238, 36);
      pop();
      break;
  }
  currOverlay++;
  currOverlay %= 4;
}

function makeMap() {
  map = [];
  for (let i = 0; i < width; i++) {
    map[i] = [];
    for (let j = 0; j < height; j++) {
      map[i][j] = pickColor(i, j);
    }
  }
}

function pickColor(i, j) {
  let h = noise(i * noiseScale, j * noiseScale);
  let c = "#facade";

  if (h < 0.2) {
    c = ocean;
  } else if (h < 0.3) {
    if (random() > pow(h - 0.2, 2) * 100) {
      c = ocean;
    } else {
      c = shore;
    }
  } else if (h < 0.4) {
    if (random() > pow(h - 0.3, 2) * 100) {
      c = shore;
    } else {
      c = sand;
    }
  } else if (h < 0.5) {
    if (random() > pow(h - 0.4, 2) * 100) {
      c = sand;
    } else {
      c = grass;
    }
  } else if (h < 0.6) {
    if (random() > pow(h - 0.5, 2) * 100) {
      c = grass;
    } else {
      c = stone;
    }
  } else if (h < 0.7) {
    if (random() > pow(h - 0.6, 2) * 100) {
      c = stone;
    } else {
      c = snow;
    }
  } else {
    c = snow;
  }

  return color(c);
}

function drawMap() {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      set(i, j, map[i][j]);
    }
  }
  updatePixels();
}
