let bubbles = [];
let waveOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textAlign(CENTER, CENTER);
  document.getElementById("title").onclick = showButtons;
}

function draw() {
  drawWaves();
  drawBubbles();
}

function drawWaves() {
  // Fondo de olas
  background(0, 50, 100);
  noFill();
  stroke(255, 255, 255, 100);
  strokeWeight(2);

  for (let y = height * 0.8; y < height; y += 20) {
    beginShape();
    for (let x = 0; x < width; x += 10) {
      let angle = (x + waveOffset) * 0.02;
      let waveHeight = sin(angle) * 20;
      vertex(x, y + waveHeight);
    }
    endShape();
  }

  waveOffset += 2; // Velocidad de las olas
}

function drawBubbles() {
  // Burbujas que siguen al cursor
  for (let i = bubbles.length - 1; i >= 0; i--) {
    let b = bubbles[i];
    fill(173, 216, 230, 150);
    ellipse(b.x, b.y, b.size);
    b.y -= b.speed;

    if (b.y < 0) bubbles.splice(i, 1);
  }
}

function mouseMoved() {
  bubbles.push({
    x: mouseX,
    y: mouseY,
    size: random(10, 30),
    speed: random(1, 3),
  });
}

function showButtons() {
  let buttons = document.getElementById("buttons");
  buttons.classList.remove("hidden");
}
