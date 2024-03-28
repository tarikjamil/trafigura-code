document.addEventListener("DOMContentLoaded", function () {
  // Get filter elements
  const regionFilter = document.getElementById("regionFilter");
  const areaFilter = document.getElementById("areaFilter");
  const stateFilter = document.getElementById("stateFilter");

  // Get all partner items
  const partnerItems = document.querySelectorAll(".partner--item");

  // Populate filter dropdowns with unique values from partner items
  function populateFilters() {
    const regions = new Set();
    const areas = new Set();
    const states = new Set();

    partnerItems.forEach((item) => {
      item.querySelectorAll(".partner--region").forEach((regionElement) => {
        regionElement.textContent
          .trim()
          .split(",")
          .map((r) => r.trim())
          .forEach((region) => regions.add(region));
      });

      item.querySelectorAll(".partner--area").forEach((areaElement) => {
        areaElement.textContent
          .trim()
          .split(",")
          .map((a) => a.trim())
          .forEach((area) => areas.add(area));
      });

      item.querySelectorAll(".partner--state").forEach((stateElement) => {
        stateElement.textContent
          .trim()
          .split(",")
          .map((s) => s.trim())
          .forEach((state) => states.add(state));
      });
    });

    regions.forEach((region) => regionFilter.add(new Option(region, region)));
    areas.forEach((area) => areaFilter.add(new Option(area, area)));
    states.forEach((state) => {
      const radioHtml = `<label class="radio-btn"><input type="radio" name="state" value="${state}" class="radio-btn-label"> <span class="radio-check"></span> ${state}</label>`;
      stateFilter.insertAdjacentHTML("beforeend", radioHtml);
    });
  }

  // Apply custom styles to the first visible partner item
  function applyCustomStyles() {
    if (window.innerWidth >= 992) {
      partnerItems.forEach((item) => {
        item.classList.remove("custom-style");
      });

      const firstVisibleItem = Array.from(partnerItems).find(
        (item) => getComputedStyle(item).display !== "none"
      );

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

    partnerItems.forEach((item) => {
      const regionMatch =
        !selectedRegion ||
        Array.from(item.querySelectorAll(".partner--region")).some(
          (regionElement) =>
            regionElement.textContent
              .trim()
              .split(",")
              .map((r) => r.trim())
              .includes(selectedRegion)
        );

      const areaMatch =
        !selectedArea ||
        Array.from(item.querySelectorAll(".partner--area")).some(
          (areaElement) =>
            areaElement.textContent
              .trim()
              .split(",")
              .map((a) => a.trim())
              .includes(selectedArea)
        );

      const stateMatch =
        !selectedState ||
        Array.from(item.querySelectorAll(".partner--state")).some(
          (stateElement) =>
            stateElement.textContent
              .trim()
              .split(",")
              .map((s) => s.trim())
              .includes(selectedState)
        );

      item.style.display = regionMatch && areaMatch && stateMatch ? "" : "none";
    });

    applyCustomStyles();
  }

  // Reset filters function
  function resetFilters() {
    regionFilter.selectedIndex = 0;
    areaFilter.selectedIndex = 0;
    document.querySelectorAll('input[name="state"]').forEach((radio) => {
      radio.checked = false;
    });
    filterItems();
  }

  // Event listeners for filter changes
  regionFilter.addEventListener("change", filterItems);
  areaFilter.addEventListener("change", filterItems);
  stateFilter.addEventListener("change", filterItems);

  // Event listener for window resize
  window.addEventListener("resize", applyCustomStyles);

  // Add event listener for the reset button
  document
    .getElementById("resetFilters")
    .addEventListener("click", resetFilters);

  // Initial population of filter dropdowns
  populateFilters();

  // Initial application of custom styles
  applyCustomStyles();
});
