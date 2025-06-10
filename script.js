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
