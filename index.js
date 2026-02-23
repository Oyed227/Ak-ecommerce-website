const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

async function getProducts() {
  try {
    let url = "https://dummyjson.com/products?limit=8&sortBy=title&order=asc";
    let fetchData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let response = await fetch(url, fetchData);
    let data = await response.json();

    console.log(data);
    let products = data.products;
    console.log(products);

    let allProducts = document.getElementById("allProducts");
    let myProduct = products.map(function (value, index, array) {
      let newPrice = ((100 - value.discountPercentage) / 100) * value.price;
            return `
<div class="shadow-sm max-w-70 space-y-2 p-3 font-bold rounded-2xl border-2 border-gray-200">

    <div class="relative mb-7">
        <img  
          class="object-contain mx-auto transition duration-300 hover:scale-90 bg-gray-200 mt-5 rounded-md" 
          src="${value.images[0]}"
        >

        <h1 class="absolute top-2 left-2 border-2 rounded-xl px-3 py-1 text-white bg-blue-800 text-sm">
            For sale
        </h1>
    </div>
      <p class="border-2 border-gray-200"></p>
    <p class="text-md font-bold text-gray-800 mb-2 text-center">
        Name: ${value.title}
    </p>

    <p class="text-md font-bold text-gray-800 mb-2 text-center">
        <span class="newPrice">price: $${newPrice.toFixed(2)}</span>
    </p>

    <p class="text-md font-bold text-gray-800 mb-2 text-center">
       ${value.rating}  <i class="fa-solid fa-star text-yellow-500"></i> <i class="fa-solid fa-star text-yellow-500"></i> <i class="fa-solid fa-star text-yellow-500"></i><i class="fa-solid fa-star text-yellow-500"></i> <i class="fa-regular fa-star text-yellow-500"></i></p>
    </p>

    <div class="flex justify-center">
        <button 
          onclick="addtocart('${value.images[0]}', '${value.title}', '${value.rating}', '${newPrice}')"
          class="bg-blue-400 px-3 py-3 rounded-md text-lg hover:bg-blue-500 text-white">
            Add to cart
        </button>
    </div>

</div>
`;
    });
    allProducts.innerHTML = myProduct.join("");
  } catch (error) {
    alert("Error fetching product");
  }
}

getProducts();

function addtocart(image, title, rating, warrantyInformation, price) {
  let previousaddtocart = [];
  let localStorageaddtocart = JSON.parse(localStorage.getItem("addtocart"));

  if (localStorageaddtocart && localStorageaddtocart.length > 0) {
    previousaddtocart = localStorageaddtocart;
  }

    const isDuplicate = previousaddtocart.some((item) => item.title === title);

    if (isDuplicate) {
      alert(`"${title}" is already in your cart!`);
      return;
    }

  previousaddtocart.push({
    rating: rating,
    image: image,
    title: title,
    warrantyInformation: warrantyInformation,
    price: Number(price).toFixed(2),
  });

  localStorage.setItem("addtocart", JSON.stringify(previousaddtocart));
  updateCartCount();
  alert(`${title} has been added to cart`);
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
