let cols = 20;
let rows = 12;
let margin = 80;
let lastMinute = -1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNER);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(10, 10, 20);

  let h = hour() % 12;
  if (h === 0) h = 12;
  let m = minute();
  let s = second();

  if (m !== lastMinute) {
    console.log(m);
    lastMinute = m;
  }

  let gridW = width - margin * 2;
  let gridH = height - margin * 2;
  if (gridW <= 0 || gridH <= 0) return;

  let cellW = gridW / cols;
  let cellH = gridH / rows;

  let totalCells = cols * rows;
  let litCells = floor(map(m, 0, 59, 0, totalCells));

  let hourRow = rows - h;

  let cellIndex = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = margin + c * cellW;
      let y = margin + r * cellH;

      let isLit = cellIndex < litCells;

      let baseBright = isLit ? 170 : 30;

      if (r === hourRow) {
        baseBright += 60;
      }

      let wave =
        sin((c + r) * 0.6 + frameCount * 0.05) * 25;

      let sparkCol = floor(map(s, 0, 59, 0, cols));
      if (c === sparkCol && r === hourRow) {
        baseBright = 255;
      }

      let brightness = constrain(baseBright + wave, 20, 255);

      fill(brightness, brightness * 0.85, brightness * 0.6);
      rect(x + 1, y + 1, cellW - 2, cellH - 2);

      cellIndex++;
    }
  }
}