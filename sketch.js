document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const main = document.getElementById("main");

  // Simular carga y mostrar contenido principal
  setTimeout(() => {
    loading.style.display = "none";
    main.classList.remove("hidden");
  }, 3000);

  // Fondo interactivo
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");

  let particles = [];
  const colors = ["#FF9A9E", "#FAD0C4", "#F6D365", "#FDA085"];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function createParticle(x, y) {
    return {
      x,
      y,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: (Math.random() - 0.5) * 2,
      life: 100,
    };
  }

  function updateParticles() {
    particles.forEach((p, index) => {
      p.x += p.velocityX;
      p.y += p.velocityY;
      p.life -= 1;

      if (p.life <= 0) particles.splice(index, 1);
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  canvas.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 5; i++) {
      particles.push(createParticle(e.clientX, e.clientY));
    }
  });

  function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
  }

  animate();
});
