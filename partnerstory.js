document.addEventListener("DOMContentLoaded", function () {
  // Get filter elements
  const regionFilter = document.getElementById("regionFilter");
  const areaFilter = document.getElementById("areaFilter");
  const stateFilter = document.getElementById("stateFilter");

  // Get all partner items
  const partnerItems = document.querySelectorAll(".partner--item");

  // Populate filter dropdowns with unique values from partner items
  function populateFilters() {
    // Unique sets to store the different options
    const regions = new Set();
    const areas = new Set();
    const states = new Set();

    // Iterate over each partner item to gather the data
    partnerItems.forEach((item) => {
      const region = item.querySelector(".partner--region").textContent.trim();
      const area = item.querySelector(".partner--area").textContent.trim();
      const state = item.querySelector(".partner--state").textContent.trim();

      // Add the text content to the corresponding set if it's not empty
      if (region) regions.add(region);
      if (area) areas.add(area);
      if (state) states.add(state);
    });

    // Populate the region filter dropdown
    regions.forEach((region) => regionFilter.add(new Option(region, region)));

    // Populate the area filter dropdown
    areas.forEach((area) => areaFilter.add(new Option(area, area)));

    // Create radio buttons for state filter
    states.forEach((state) => {
      const radioHtml = `<label><input type="radio" name="state" class="radio-btn" value="${state}"> ${state}</label>`;
      stateFilter.insertAdjacentHTML("beforeend", radioHtml);
    });
  }

  // Apply custom styles to the first visible partner item
  function applyCustomStyles() {
    // Only apply if the window is wider than 992px
    if (window.innerWidth >= 992) {
      // Reset custom style from all items first
      partnerItems.forEach((item) => {
        item.classList.remove("custom-style");
      });

      // Find the first item that is visible (not display none)
      const firstVisibleItem = Array.from(partnerItems).find(
        (item) => getComputedStyle(item).display !== "none"
      );

      // Apply the custom style to the first visible item
      if (firstVisibleItem) {
        firstVisibleItem.classList.add("custom-style");
      }
    }
  }

  // Filter partner items based on selected filter values
  function filterItems() {
    const selectedRegion = regionFilter.value;
    const selectedArea = areaFilter.value;
    const selectedState = document.querySelector(
      'input[name="state"]:checked'
    )?.value;

    // Iterate over each partner item and set its display based on the filter values
    partnerItems.forEach((item) => {
      const itemRegion = item
        .querySelector(".partner--region")
        .textContent.trim();
      const itemArea = item.querySelector(".partner--area").textContent.trim();
      const itemState = item
        .querySelector(".partner--state")
        .textContent.trim();

      // Determine if the item matches the selected filters
      const regionMatch = !selectedRegion || itemRegion === selectedRegion;
      const areaMatch = !selectedArea || itemArea === selectedArea;
      const stateMatch = !selectedState || itemState === selectedState;

      // Show or hide the item based on whether it matches the filters
      item.style.display = regionMatch && areaMatch && stateMatch ? "" : "none";
    });

    // Reapply custom styles based on the filtered items
    applyCustomStyles();
  }

  // Event listeners for filter changes
  regionFilter.addEventListener("change", filterItems);
  areaFilter.addEventListener("change", filterItems);
  stateFilter.addEventListener("change", filterItems);

  // Event listener for window resize
  window.addEventListener("resize", applyCustomStyles);

  // Initial population of filter dropdowns
  populateFilters();

  // Initial application of custom styles
  applyCustomStyles();
});
