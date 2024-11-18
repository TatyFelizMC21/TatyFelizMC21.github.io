document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");

  // Ocultar la pantalla de carga después de 5 segundos
  setTimeout(() => {
    intro.style.display = "none";
    main.classList.remove("hidden");
  }, 5000);

  // Configuración del fondo animado
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const bubbles = [];

  // Crear burbujas
  function createBubble() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      radius: Math.random() * 20 + 10,
      velocityY: Math.random() * -1 - 0.5,
      color: `rgba(255, 255, 255, ${Math.random()})`,
    };
  }

  // Actualizar burbujas
  function updateBubbles() {
    if (bubbles.length < 50) {
      bubbles.push(createBubble());
    }

    for (let i = 0; i < bubbles.length; i++) {
      const bubble = bubbles[i];
      bubble.y += bubble.velocityY;

      if (bubble.y < -10) {
        bubbles.splice(i, 1);
        i--;
      }
    }
  }

  // Dibujar burbujas
  function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const bubble of bubbles) {
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = bubble.color;
      ctx.fill();
    }
  }

  // Animación
  function animate() {
    updateBubbles();
    drawBubbles();
    requestAnimationFrame(animate);
  }

  animate();

  // Cursor personalizado
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;

    const bubble = createBubble();
    bubble.x = e.pageX;
    bubble.y = e.pageY;
    bubble.radius = Math.random() * 10 + 5;
    bubbles.push(bubble);
  });
});
