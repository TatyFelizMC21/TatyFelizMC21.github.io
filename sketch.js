document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  // Simula el tiempo de carga
  setTimeout(() => {
    loadingScreen.style.display = "none";
    mainContent.classList.remove("hidden");
  }, 3000);

  // Fondo animado
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const jellyfish = [];

  function createJellyfish() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 40 + 20,
      velocityY: Math.random() * -0.5 - 0.5,
      color: `rgba(${Math.random() * 50}, ${Math.random() * 150}, 255, 0.7)`,
    };
  }

  function updateJellyfish() {
    while (jellyfish.length < 30) {
      jellyfish.push(createJellyfish());
    }

    for (const jelly of jellyfish) {
      jelly.y += jelly.velocityY;
      if (jelly.y < -50) jelly.y = canvas.height;
    }
  }

  function drawJellyfish() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const jelly of jellyfish) {
      ctx.beginPath();
      ctx.arc(jelly.x, jelly.y, jelly.radius, 0, Math.PI * 2);
      ctx.fillStyle = jelly.color;
      ctx.fill();
    }
  }

  function animate() {
    updateJellyfish();
    drawJellyfish();
    requestAnimationFrame(animate);
  }

  animate();

  // Cursor interactivo
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
  });
});
