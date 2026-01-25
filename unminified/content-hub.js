document.addEventListener("DOMContentLoaded", function () {
  // Get filter elements
  const searchInput = document.querySelector('input[type="text"]');
  const categoryFilter = document.querySelector(".filter--options");
  const resetButton = document.querySelector(".btn--reset");
  
  // Initialize filters
  filterItems();
  setupDropdown();

  // Add event listeners
  if (searchInput) {
    searchInput.addEventListener("input", filterItems);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", function (e) {
      if (e.target && e.target.matches('input[type="radio"]')) {
        filterItems();
      }
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", resetFilters);
  }

  // Filter function
  function filterItems() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedCategory = document.querySelector(
      '.filter--options input[type="radio"]:checked'
    )?.value;

    // Get all content items - try multiple possible selectors
    const items = document.querySelectorAll(".hub-grid .w-dyn-item, .hub-grid > div, .hub-grid > a, .hub-grid .collection-item");

    let isFirstVisible = true;

    items.forEach((item) => {
      // Get the heading text
      const headingElement = item.querySelector(".heading-28");
      const headingText = headingElement
        ? headingElement.textContent.toLowerCase()
        : "";

      // Get the category tag
      const categoryElement = item.querySelector(".tag-category");
      const categoryText = categoryElement
        ? categoryElement.textContent.trim()
        : "";

      // Check search match
      const searchMatch = !searchTerm || headingText.includes(searchTerm);

      // Check category match
      const categoryMatch =
        !selectedCategory || categoryText === selectedCategory;

      // Determine if item should be displayed
      const shouldDisplay = searchMatch && categoryMatch;

      // Show/hide item
      item.style.display = shouldDisplay ? "" : "none";

      // Remove first-visible class from all items
      item.classList.remove("first-visible");

      // Add first-visible class to first visible item
      if (shouldDisplay && isFirstVisible) {
        item.classList.add("first-visible");
        isFirstVisible = false;
      }
    });
  }

  // Reset filters function
  function resetFilters() {
    // Clear search input
    if (searchInput) {
      searchInput.value = "";
    }

    // Uncheck all radio buttons
    document
      .querySelectorAll('.filter--options input[type="radio"]')
      .forEach((rb) => (rb.checked = false));

    // Update dropdown text back to default
    const selectText = document.querySelector(".filter--select-text");
    if (selectText) {
      selectText.textContent = "Category";
    }

    // Re-filter items (show all)
    filterItems();
  }

  // Setup dropdown functionality
  function setupDropdown() {
    const selectWrapper = document.querySelector(".filter--select-wrapper");
    if (!selectWrapper) return;

    const select = selectWrapper.querySelector(".filter-select");
    const options = selectWrapper.querySelector(".filter--options");
    const selectText = selectWrapper.querySelector(".filter--select-text");

    if (!select || !options || !selectText) return;

    // Hide options initially
    options.style.display = "none";

    // Toggle dropdown on click
    select.addEventListener("click", function (e) {
      e.stopPropagation();
      options.style.display =
        options.style.display === "block" ? "none" : "block";
    });

    // Update text when option is selected
    options.addEventListener("change", function (e) {
      if (e.target && e.target.matches('input[type="radio"]')) {
        selectText.textContent = e.target.nextElementSibling.textContent;
        options.style.display = "none";
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener(
      "click",
      function (event) {
        if (!select.contains(event.target)) {
          options.style.display = "none";
        }
      },
      true
    );
  }
});
