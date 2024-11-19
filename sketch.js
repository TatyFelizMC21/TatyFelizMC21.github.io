document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  // Simula el tiempo de carga
  setTimeout(() => {
    loadingScreen.style.display = "none";
    mainContent.classList.remove("hidden");
  }, 3000);
});
