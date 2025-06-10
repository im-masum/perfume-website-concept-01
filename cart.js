// Cart functionality
document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.querySelector(".cart-icon");
  const cartCount = document.querySelector(".cart-count");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart count
  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "flex" : "none";
  }

  // Add to cart animation
  function addToCartAnimation(button) {
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 1000);
  }

  // Add item to cart
  function addToCart(productId, name, price, image) {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: name,
        price: price,
        image: image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showNotification("Added to cart!");
  }

  // Show notification
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  // Handle add to cart clicks
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const productCard = this.closest(".product-card");
      const productId = productCard.dataset.id;
      const name = productCard.querySelector(".product-name").textContent;
      const price = productCard.querySelector(".product-price").textContent;
      const image = productCard.querySelector(".product-image").src;

      addToCart(productId, name, price, image);
      addToCartAnimation(this);
    });
  });

  // Cart icon click handler
  cartIcon.addEventListener("click", function (e) {
    e.preventDefault();
    if (cart.length > 0) {
      // Show cart dropdown or navigate to cart page
      showCartDropdown();
    }
  });

  // Show cart dropdown
  function showCartDropdown() {
    const dropdown = document.createElement("div");
    dropdown.className = "cart-dropdown";

    const items = cart
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `
      )
      .join("");

    const total = cart.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );

    dropdown.innerHTML = `
            <div class="cart-items">
                ${items}
            </div>
            <div class="cart-total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="cart-actions">
                <button class="view-cart">View Cart</button>
                <button class="checkout">Checkout</button>
            </div>
        `;

    // Remove existing dropdown if any
    document.querySelector(".cart-dropdown")?.remove();

    // Add new dropdown
    document.body.appendChild(dropdown);

    // Position dropdown
    const cartIconRect = cartIcon.getBoundingClientRect();
    dropdown.style.top = `${cartIconRect.bottom + window.scrollY + 10}px`;
    dropdown.style.right = `${window.innerWidth - cartIconRect.right}px`;

    // Add click outside listener
    setTimeout(() => {
      document.addEventListener("click", closeCartDropdown);
    }, 100);

    // Handle remove item
    dropdown.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = this.dataset.id;
        cart = cart.filter((item) => item.id !== itemId);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        showCartDropdown();
      });
    });
  }

  // Close cart dropdown
  function closeCartDropdown(e) {
    const dropdown = document.querySelector(".cart-dropdown");
    const cartIcon = document.querySelector(".cart-icon");

    if (
      dropdown &&
      !dropdown.contains(e.target) &&
      !cartIcon.contains(e.target)
    ) {
      dropdown.remove();
      document.removeEventListener("click", closeCartDropdown);
    }
  }

  // Initialize cart count
  updateCartCount();
});
