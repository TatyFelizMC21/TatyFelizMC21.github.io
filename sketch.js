document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const main = document.getElementById("main");

  // Simular carga
  setTimeout(() => {
    loading.style.display = "none";
    main.classList.remove("hidden");
  }, 3000);

  // Fondo con burbujas
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const bubbles = [];

  function createBubble() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      radius: Math.random() * 20 + 10,
      velocityY: Math.random() * -2 - 1,
      color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.7)`,
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
});
