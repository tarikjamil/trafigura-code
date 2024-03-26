document.addEventListener("DOMContentLoaded", function () {
  const regionFilter = document.getElementById("regionFilter");
  const areaFilter = document.getElementById("areaFilter");
  const stateFilter = document.getElementById("stateFilter");
  const partnerItems = document.querySelectorAll(".partner--item");

  // Populate the filter dropdowns with unique values
  function populateFilters() {
    // ... Existing code for populating filters
  }

  // Function to apply custom styles
  function applyCustomStyles() {
    // Only proceed if the window is wider than 992px
    if (window.innerWidth >= 992) {
      // Remove the custom style from all items
      partnerItems.forEach((item) => {
        item.classList.remove("custom-style");
      });

      // Find the first item that is visible (display isn't 'none')
      const firstVisibleItem = Array.from(partnerItems).find(
        (item) => getComputedStyle(item).display !== "none"
      );

      // If a visible item is found, add the custom style to it
      if (firstVisibleItem) {
        firstVisibleItem.classList.add("custom-style");
      }
    }
  }

  // Function to filter items based on the selected filters
  function filterItems() {
    // Obtain the values of the selected filters
    const selectedRegion = regionFilter.value;
    const selectedArea = areaFilter.value;
    const selectedState = document.querySelector(
      'input[name="state"]:checked'
    )?.value;

    // Loop through each partner item and set its display based on the filters
    partnerItems.forEach((item) => {
      const itemRegion = item
        .querySelector(".partner--region")
        .textContent.trim();
      const itemArea = item.querySelector(".partner--area").textContent.trim();
      const itemState = item
        .querySelector(".partner--state")
        .textContent.trim();

      // Determine if the item matches all the selected filters
      const regionMatch = !selectedRegion || itemRegion === selectedRegion;
      const areaMatch = !selectedArea || itemArea === selectedArea;
      const stateMatch = !selectedState || itemState === selectedState;

      // Set the display of the item based on whether it matches the filters
      if (regionMatch && areaMatch && stateMatch) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });

    // After filtering, reapply the custom styles
    applyCustomStyles();
  }

  // Add event listeners for the filter dropdowns and radio buttons
  regionFilter.addEventListener("change", filterItems);
  areaFilter.addEventListener("change", filterItems);
  stateFilter.addEventListener("change", filterItems);

  // Reapply custom styles on window resize
  window.addEventListener("resize", applyCustomStyles);

  // Populate filter options and apply initial styles
  populateFilters();
  filterItems(); // Call filterItems to ensure we have an initial state set
});
