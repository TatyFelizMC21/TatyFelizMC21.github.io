let waveHeight = 60;
let waveSpeed = 0.05;
let waveAmplitude = 50;
let waveOffset = 0;
let waterLevel = 0;
let showContent = false;
let backgroundImage;
let corals = []; // Arreglo para corales
let fish = []; // Arreglo para peces
let bubbles = [];

function preload() {
  // Carga de imágenes (ajusta las rutas según donde tengas las imágenes)
  backgroundImage = loadImage("assets/ocean-background.jpg"); // Fondo marino
  for (let i = 0; i < 5; i++) {
    corals.push(loadImage(`assets/coral${i + 1}.png`)); // Imágenes de corales
  }
  for (let i = 0; i < 5; i++) {
    fish.push(loadImage(`assets/fish${i + 1}.png`)); // Imágenes de peces
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  // Fondo marino
  image(backgroundImage, 0, 0, width, height);

  // Dibuja las olas
  drawWaves();

  // Animación de las olas subiendo
  if (waterLevel < height) {
    waterLevel += waveHeight / 10;
  } else {
    // Una vez que el agua llena la pantalla, muestra el contenido
    if (!showContent) {
      showContent = true;
      document.getElementById("content").style.display = "block"; // Muestra el contenido
    }
  }

  // Dibuja las burbujas
  drawBubbles();

  // Dibuja los corales y peces en el fondo
  drawMarineLife();
}

function drawWaves() {
  fill(0, 0, 255, 150); // Color azul del agua
  for (let x = 0; x < width; x++) {
    let y = noise(x * 0.05 + waveOffset) * waveAmplitude + height - waterLevel;
    ellipse(x, y, waveHeight, waveHeight);
  }
  waveOffset += waveSpeed;
}

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

function drawMarineLife() {
  // Dibujar corales
  for (let i = 0; i < corals.length; i++) {
    let coral = corals[i];
    image(coral, random(width), height - random(50, 150), 100, 100);
  }

  // Dibujar peces nadando lentamente
  for (let i = 0; i < fish.length; i++) {
    let fishImg = fish[i];
    let xPos = (frameCount * 0.5 + i * 100) % width;
    let yPos = height - random(100, 200);
    image(fishImg, xPos, yPos, 50, 30);
  }
}
