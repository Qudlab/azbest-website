// Show/hide back to top button
const backToTopBtn = document.getElementById("backToTop");
window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Filter & Sort functionality (on pages with dropdowns)
const sortDropdown = document.getElementById("sort");
if (sortDropdown) {
  sortDropdown.addEventListener("change", function () {
    const sortValue = this.value;
    const productGrid = document.querySelector(".products-grid");
    const products = Array.from(productGrid.getElementsByClassName("product-box"));

    let sortedProducts = [...products];
    if (sortValue === "price-asc") {
      sortedProducts.sort((a, b) => {
        const priceA = parseInt(a.querySelector("p").textContent.replace(/[^0-9]/g, ""));
        const priceB = parseInt(b.querySelector("p").textContent.replace(/[^0-9]/g, ""));
        return priceA - priceB;
      });
    } else if (sortValue === "price-desc") {
      sortedProducts.sort((a, b) => {
        const priceA = parseInt(a.querySelector("p").textContent.replace(/[^0-9]/g, ""));
        const priceB = parseInt(b.querySelector("p").textContent.replace(/[^0-9]/g, ""));
        return priceB - priceA;
      });
    }

    productGrid.innerHTML = "";
    sortedProducts.forEach(product => productGrid.appendChild(product));
  });
}

// Cart: Add to cart from any product box
const cartButtons = document.querySelectorAll(".product-box button, .product-card button");
cartButtons.forEach(button => {
  button.addEventListener("click", function () {
    const parent = this.closest(".product-box") || this.closest(".product-card");
    const name = parent.querySelector("h3").textContent;
    const price = parent.querySelector("p").textContent;
    const imageSrc = parent.querySelector("img").src;

    const product = { name, price, imageSrc };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} has been added to your cart.`);
  });
});

// Cart page logic
if (window.location.href.includes("cart") || document.querySelector(".cart-items")) {
  const cartItemsContainer = document.querySelector(".cart-items");
  if (cartItemsContainer) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      let total = 0;
      cart.forEach((item, index) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ""));
        total += price;
        cartItemsContainer.innerHTML += `
          <div class="cart-item">
            <img src="${item.imageSrc}" alt="${item.name}">
            <div>
              <h4>${item.name}</h4>
              <p>${item.price}</p>
              <button onclick="removeFromCart(${index})">Remove</button>
            </div>
          </div>
        `;
      });
      const totalDiv = document.querySelector(".cart-total");
      if (totalDiv) totalDiv.innerHTML = "Total: ₦" + total.toLocaleString();
    }
  }
}

// Remove item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}
