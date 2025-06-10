// Search functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");
  const products = document.querySelectorAll(".product-card");

  // Function to perform search
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    products.forEach((product) => {
      const productName = product
        .querySelector(".product-name")
        .textContent.toLowerCase();
      const productDescription = product
        .querySelector(".product-description")
        .textContent.toLowerCase();
      const productCategory = product
        .querySelector(".product-category")
        .textContent.toLowerCase();

      const isVisible =
        productName.includes(searchTerm) ||
        productDescription.includes(searchTerm) ||
        productCategory.includes(searchTerm);

      // Add fade animation
      if (isVisible) {
        product.style.display = "flex";
        product.style.animation = "fadeIn 0.5s ease-in-out";
      } else {
        product.style.display = "none";
      }
    });

    // Show "no results" message if no products match
    const visibleProducts = document.querySelectorAll(
      '.product-card[style="display: flex;"]'
    );
    const noResultsMessage = document.querySelector(".no-results-message");

    if (visibleProducts.length === 0 && searchTerm !== "") {
      if (!noResultsMessage) {
        const message = document.createElement("div");
        message.className = "no-results-message";
        message.innerHTML = `
                    <i class="fas fa-search"></i>
                    <p>No perfumes found matching "${searchTerm}"</p>
                    <button class="clear-search">Clear Search</button>
                `;
        document.querySelector(".products-grid").appendChild(message);
      }
    } else if (noResultsMessage) {
      noResultsMessage.remove();
    }
  }

  // Search on input change with debounce
  let debounceTimer;
  searchInput.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, 300);
  });

  // Search on button click
  searchBtn.addEventListener("click", performSearch);

  // Search on Enter key
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  });

  // Clear search functionality
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("clear-search")) {
      searchInput.value = "";
      products.forEach((product) => {
        product.style.display = "flex";
        product.style.animation = "fadeIn 0.5s ease-in-out";
      });
      document.querySelector(".no-results-message")?.remove();
    }
  });

  // Add focus styles
  searchInput.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  searchInput.addEventListener("blur", function () {
    this.parentElement.classList.remove("focused");
  });
});
