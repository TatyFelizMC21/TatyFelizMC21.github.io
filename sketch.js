let waveHeight = 50;
let waveSpeed = 0.03;
let waveAmplitude = 40;
let waveOffset = 0;
let waveFrequency = 0.02;
let waterLevel = 0;
let totalHeight = 0;
let waveColor;

let bubbles = [];
let showContent = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  waveColor = color(0, 0, 255, 150); // Color del agua (azul claro)
}

function draw() {
  background(0, 191, 255); // Fondo marino (color del cielo azul)

  // Dibuja las olas
  drawWaves();

  // Animación de las olas subiendo
  if (waterLevel < height) {
    waterLevel += waveHeight / 10;
  } else {
    // Una vez llenado el "agua", muestra el contenido
    if (!showContent) {
      showContent = true;
      document.getElementById("content").style.display = "block"; // Muestra el contenido
    }
  }

  // Dibuja las burbujas que siguen al cursor
  drawBubbles();
}

// Función para dibujar las olas
function drawWaves() {
  noStroke();
  fill(waveColor);
  for (let x = 0; x < width; x++) {
    let y =
      sin(x * waveFrequency + waveOffset) * waveAmplitude + height - waterLevel;
    ellipse(x, y, waveHeight, waveHeight);
  }
  waveOffset += waveSpeed;
}

// Función para crear burbujas al mover el mouse
function drawBubbles() {
  if (mouseIsPressed) {
    let bubbleSize = random(10, 30);
    let bubble = {
      x: mouseX + random(-10, 10),
      y: mouseY + random(-10, 10),
      size: bubbleSize,
    };
    bubbles.push(bubble);
  }

  // Dibujamos cada burbuja
  for (let i = 0; i < bubbles.length; i++) {
    let b = bubbles[i];
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(b.x, b.y, b.size);
  }

  // Elimina las burbujas que ya se han ido
  bubbles = bubbles.filter((b) => b.y > 0);

  // Actualiza la posición de las burbujas
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].y -= 1;
  }
}

// Cambia el cursor cuando pasa sobre la página
function mouseMoved() {
  let bubble = {
    x: mouseX,
    y: mouseY,
    size: random(5, 20),
  };
  bubbles.push(bubble);
}
