const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

let mycart = JSON.parse(localStorage.getItem("addtocart")) || [];

function renderCart() {
  const container = document.querySelector("#allCarts");
  if (!container) return; // Prevent errors if the element doesn't exist on the page

  container.innerHTML = "";

  if (mycart.length > 0) {
    container.innerHTML = mycart
      .map(
        (value, index) => `
            <div class="cart-item shadow-lg border rounded-xl max-w-80 space-y-3 p-4 font-bold text-center bg-white">
                <img src="${value.image}" alt="${value.title}" class="w-full h-40 object-contain mx-auto">
                <p class="text-gray-800 uppercase tracking-wide">${value.title}</p>
                <button onclick="removeItem(${index})" class="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition">
                    Remove Item
                </button>
            </div>
        `,
      )
      .join("");
  } else {
    container.innerHTML =
      "<p class='text-center text-xl text-gray-500 col-span-full'>Your cart is empty!</p>";
  }
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("addtocart")) || [];
  const countElements = document.querySelectorAll(".cart-count");
  countElements.forEach((el) => {
    el.textContent = cart.length;
  });

  console.log("Cart count updated to:", cart.length);
}

window.removeItem = function (index) {
  mycart.splice(index, 1);
  localStorage.setItem("addtocart", JSON.stringify(mycart));
  renderCart();
  updateCartCount();
};


document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});

window.clearAllCart = function () {
  if (confirm("Are you sure you want to clear your entire cart?")) {
  
    mycart = [];

    
    localStorage.setItem("addtocart", JSON.stringify(mycart));

    renderCart();
    updateCartCount();
  }
};
