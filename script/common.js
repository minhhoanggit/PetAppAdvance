const navAcitive = () => {
  const navEl = document.getElementById("sidebar");
  navEl.addEventListener("click", () => {
    navEl.classList.toggle("active");
  });
};
