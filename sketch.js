document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");

  // Mostrar el contenido principal después de 5 segundos
  setTimeout(() => {
    intro.style.display = "none";
    main.classList.remove("hidden");
  }, 5000);

  // Canvas para fondo animado
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const bubbles = [];

  function createBubble() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 20 + 10,
      velocityY: Math.random() * -2 - 1,
      color: `rgba(255, 255, 255, ${Math.random()})`,
    };
  }

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

  function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const bubble of bubbles) {
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = bubble.color;
      ctx.fill();
    }
  }

  function animate() {
    updateBubbles();
    drawBubbles();
    requestAnimationFrame(animate);
  }

  animate();

  // Cursor personalizado con burbujas
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
