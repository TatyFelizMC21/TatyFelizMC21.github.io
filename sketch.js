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
  // Cargar imagenes de fondo y elementos marinos
  backgroundImage = loadImage(
    "https://images.unsplash.com/photo-1501594907352-3477502b51a1"
  ); // Fondo marino

  // Cargar corales
  corals.push(
    loadImage("https://www.pngrepo.com/download/11592/coral-png-image")
  ); // Coral 1
  corals.push(
    loadImage("https://www.pngrepo.com/download/14975/coral-png-pic")
  ); // Coral 2

  // Cargar peces
  fish.push(loadImage("https://www.pngrepo.com/download/8770/fish-png-image")); // Pez 1
  fish.push(loadImage("https://www.pngrepo.com/download/11270/fish-png-image")); // Pez 2
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
      document.getElementById("content").style.display = "block"; // Muestra el contenido del portafolio
    }
  }

  // Dibuja las burbujas al mover el ratón
  drawBubbles();

  // Dibuja los corales y peces en el fondo
  drawMarineLife();
}

function drawWaves() {
  fill(0, 0, 255, 150); // Color azul del agua
  for (let x = 0; x < width; x++) {
    let y = noise(x * 0.05 + waveOffset) * waveAmplitude + height - waterLevel;
    ellipse(x, y, waveHeight, waveHeight); // Dibujar cada ola como un círculo
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

  // Dibujar burbujas
  for (let i = 0; i < bubbles.length; i++) {
    let b = bubbles[i];
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(b.x, b.y, b.size);
  }

  // Eliminar burbujas que han subido demasiado
  bubbles = bubbles.filter((b) => b.y > 0);

  // Actualizar posición de las burbujas
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].y -= 1; // Las burbujas suben
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
