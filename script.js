// Shopping Cart Functionality
let cart = [];

// Add to Cart Function
function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  updateCartCount();
  showNotification(`${productName} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Show Notification
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add icon based on type
  const icon = document.createElement("i");
  icon.className =
    type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";
  notification.prepend(icon);

  document.body.appendChild(notification);

  // Add show class after a small delay for animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Initialize Add to Cart Buttons
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const productName = productCard.querySelector("h3").textContent;
      const price = productCard.querySelector(".price").textContent;
      addToCart(productName, price);
    });
  });

  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      if (email) {
        showNotification("Thank you for subscribing to our newsletter!");
        newsletterForm.reset();
      }
    });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add CSS for notifications
  const style = document.createElement("style");
  style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification.success {
            background-color: #2ecc71;
        }

        .notification.error {
            background-color: #e74c3c;
        }

        .notification i {
            font-size: 1.2rem;
        }
    `;
  document.head.appendChild(style);

  // Add cart count badge to cart icon
  const cartIcon = document.querySelector('a[href="#cart"]');
  if (cartIcon) {
    const cartCount = document.createElement("span");
    cartCount.className = "cart-count";
    cartCount.textContent = "0";
    cartIcon.style.position = "relative";
    cartIcon.appendChild(cartCount);
  }
});

// Product Search Functionality
const searchInput = document.querySelector('input[type="search"]');
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach((product) => {
      const productName = product.querySelector("h3").textContent.toLowerCase();
      if (productName.includes(searchTerm)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
}

// Image Lazy Loading
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Navbar Functionality
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");

  // Scroll event for navbar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Active link handling
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksItems.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        mobileMenuBtn.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
});

// Contact Form Handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Show loading state
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        // Simulate form submission (replace with actual API call)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success message
        showNotification(
          "Message sent successfully! We'll get back to you soon."
        );

        // Reset form
        contactForm.reset();
      } catch (error) {
        // Show error message
        showNotification("Failed to send message. Please try again.", "error");
      } finally {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector(".dark-mode-toggle");
const darkModeIcon = darkModeToggle ? darkModeToggle.querySelector("i") : null;

function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    if (darkModeIcon) {
      darkModeIcon.classList.remove("fa-moon");
      darkModeIcon.classList.add("fa-sun");
    }
  } else {
    document.body.classList.remove("dark-mode");
    if (darkModeIcon) {
      darkModeIcon.classList.remove("fa-sun");
      darkModeIcon.classList.add("fa-moon");
    }
  }
  localStorage.setItem("darkMode", enabled ? "true" : "false");
}

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    setDarkMode(!isDark);
  });
}

// On page load, set mode from localStorage
const darkModePref = localStorage.getItem("darkMode");
if (darkModePref === "true") {
  setDarkMode(true);
} else {
  setDarkMode(false);
}

// DOM Elements
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const filterBtns = document.querySelectorAll(".filter-btn");
const productGrid = document.querySelector(".product-grid");
const cartBtn = document.querySelector(".cart-btn");
const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const checkoutBtn = document.querySelector(".checkout-btn");
const closeCartBtn = document.querySelector(".close-cart");
const cartOverlay = document.querySelector(".cart-overlay");
const paymentForm = document.querySelector(".payment-form");
const paymentMethods = document.querySelectorAll(".payment-method");

// State
let selectedPaymentMethod = "credit-card";

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  themeToggle.innerHTML = isDarkMode
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem("darkMode", isDarkMode);
});

// Mobile Menu Toggle
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuBtn.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-links") && !e.target.closest(".menu-btn")) {
    navLinks.classList.remove("active");
    menuBtn.classList.remove("active");
  }
});

// Product Filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const category = btn.dataset.category;
    filterProducts(category);
  });
});

function filterProducts(category) {
  const products = document.querySelectorAll(".product-card");
  products.forEach((product) => {
    if (category === "all" || product.dataset.category === category) {
      product.style.display = "block";
      setTimeout(() => (product.style.opacity = "1"), 50);
    } else {
      product.style.opacity = "0";
      setTimeout(() => (product.style.display = "none"), 300);
    }
  });
}

// Cart Functionality
function updateCart() {
  cartCount.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  renderCartItems();
  updateCartTotal();
  saveCart();
}

function renderCartItems() {
  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </div>
            </div>
            <button class="remove-item"><i class="fas fa-times"></i></button>
        </div>
    `
    )
    .join("");

  // Add event listeners to quantity buttons
  document.querySelectorAll(".quantity-btn").forEach((btn) => {
    btn.addEventListener("click", handleQuantityChange);
  });

  // Add event listeners to remove buttons
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", handleRemoveItem);
  });
}

function handleQuantityChange(e) {
  const btn = e.target;
  const cartItem = btn.closest(".cart-item");
  const itemId = cartItem.dataset.id;
  const item = cart.find((item) => item.id === itemId);

  if (btn.classList.contains("plus")) {
    item.quantity++;
  } else if (btn.classList.contains("minus") && item.quantity > 1) {
    item.quantity--;
  }

  updateCart();
}

function handleRemoveItem(e) {
  const cartItem = e.target.closest(".cart-item");
  const itemId = cartItem.dataset.id;
  cart = cart.filter((item) => item.id !== itemId);
  updateCart();
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Add to Cart
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product-card");
    const product = {
      id: productCard.dataset.id,
      name: productCard.querySelector("h3").textContent,
      price: parseFloat(
        productCard.querySelector(".price").textContent.replace("$", "")
      ),
      image: productCard.querySelector("img").src,
      quantity: 1,
    };

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(product);
    }

    updateCart();
    showNotification("Item added to cart!");
  });
});

// Cart UI
cartBtn.addEventListener("click", () => {
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeCartBtn.addEventListener("click", () => {
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
});

// Checkout Process
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showNotification("Your cart is empty!", "error");
    return;
  }
  window.location.href = "#payment";
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
});

// Payment Method Selection
paymentMethods.forEach((method) => {
  method.addEventListener("click", () => {
    paymentMethods.forEach((m) => m.classList.remove("active"));
    method.classList.add("active");
    selectedPaymentMethod = method.dataset.method;
  });
});

// Payment Form Validation
paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Basic form validation
  const cardNumber = document.getElementById("card-number").value;
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;
  const cardName = document.getElementById("card-name").value;

  if (
    !validateCardNumber(cardNumber) ||
    !validateExpiry(expiry) ||
    !validateCVV(cvv) ||
    !cardName
  ) {
    showNotification("Please check your payment details!", "error");
    return;
  }

  // Simulate payment processing
  const submitBtn = paymentForm.querySelector(".submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Processing...";

  setTimeout(() => {
    showNotification("Payment successful!", "success");
    cart = [];
    updateCart();
    submitBtn.disabled = false;
    submitBtn.textContent = "Pay Now";
    paymentForm.reset();
  }, 2000);
});

// Validation Functions
function validateCardNumber(number) {
  return /^\d{16}$/.test(number.replace(/\s/g, ""));
}

function validateExpiry(expiry) {
  return /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry);
}

function validateCVV(cvv) {
  return /^\d{3,4}$/.test(cvv);
}

// Local Storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Load saved theme
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Load saved cart
  loadCart();

  // Initialize payment method selection
  document.querySelector(".payment-method").classList.add("active");
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
