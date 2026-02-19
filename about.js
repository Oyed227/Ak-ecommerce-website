const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("addtocart")) || [];
  const countElements = document.querySelectorAll(".cart-count");
  countElements.forEach((el) => {
    el.textContent = cart.length;
  });

  console.log("Cart count updated to:", cart.length);
}

document.addEventListener("DOMContentLoaded", updateCartCount);