let waveHeight = 80;
let waveSpeed = 0.05;
let waveAmplitude = 80;
let waveOffset = 0;
let waveFrequency = 0.04;
let waterLevel = 0;
let totalHeight = 0;
let waveColor;
let backgroundImage;

let bubbles = [];
let showContent = false;

let corals = []; // Arreglo para corales
let fish = []; // Arreglo para peces

function preload() {
  // Carga de imágenes (ajusta las rutas según donde tengas las imágenes)
  backgroundImage = loadImage("ocean-background.jpg"); // Fondo marino
  for (let i = 0; i < 5; i++) {
    corals.push(loadImage("coral" + (i + 1) + ".png")); // Imágenes de corales
  }
  for (let i = 0; i < 5; i++) {
    fish.push(loadImage("fish" + (i + 1) + ".png")); // Imágenes de peces
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  waveColor = color(0, 0, 255, 150); // Color del agua (azul claro)
  noStroke();
}

function draw() {
  // Fondo marino con textura
  image(backgroundImage, 0, 0, width, height);

  // Agregar gradiente de luz en el fondo (simula el sol filtrándose por el agua)
  addSunlightEffect();

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

  // Dibuja los corales y peces
  drawMarineLife();
}

// Función para dibujar las olas
function drawWaves() {
  fill(waveColor);
  for (let x = 0; x < width; x++) {
    let y =
      noise(x * waveFrequency + waveOffset) * waveAmplitude +
      height -
      waterLevel;
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

// Función para agregar un efecto de luz del sol filtrándose
function addSunlightEffect() {
  let sunlightColor = color(255, 255, 255, 50);
  for (let i = 0; i < width; i++) {
    let alpha = map(i, 0, width, 0, 255);
    fill(
      sunlightColor.levels[0],
      sunlightColor.levels[1],
      sunlightColor.levels[2],
      alpha
    );
    rect(i, 0, 1, height);
  }
}

// Función para dibujar corales y peces (elementos del fondo marino)
function drawMarineLife() {
  // Dibujar corales
  for (let i = 0; i < corals.length; i++) {
    let coral = corals[i];
    image(coral, random(width), height - random(50, 150), 100, 100);
  }

  // Dibujar peces que se mueven lentamente
  for (let i = 0; i < fish.length; i++) {
    let fishImg = fish[i];
    let xPos = (frameCount * 0.5 + i * 100) % width;
    let yPos = height - random(100, 200);
    image(fishImg, xPos, yPos, 50, 30);
  }
}
