document.addEventListener("DOMContentLoaded", function () {
  const regionFilter = document.getElementById("regionFilter");
  const areaFilter = document.getElementById("areaFilter");
  const stateFilter = document.getElementById("stateFilter");
  const partnerItems = document.querySelectorAll(".partner--item");

  // Functions
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

  function filterItems(selectedRegion) {
    partnerItems.forEach((item) => {
      const regions = item.dataset.region.split(",").map((r) => r.trim());
      item.style.display = regions.includes(selectedRegion) ? "" : "none";
    });
    applyCustomStyles();
  }

  function resetFilters() {
    regionFilter.selectedIndex = 0;
    partnerItems.forEach((item) => {
      item.style.display = "";
    });
    applyCustomStyles();
  }

  document
    .getElementById("resetFilters")
    .addEventListener("click", resetFilters);

  // Populate filter dropdowns with unique values from partner items
  async function populateFilters() {
    const apiUrl = "https://restcountries.com/v3.1/all";
    try {
      const response = await fetch(apiUrl);
      const countries = await response.json();
      // Create a set of all unique country names available in .partner--region elements
      const availableCountries = new Set();
      partnerItems.forEach((item) => {
        item.querySelectorAll(".partner--region").forEach((regionElement) => {
          regionElement.textContent.split(",").forEach((country) => {
            availableCountries.add(country.trim());
          });
        });
      });

      // Filter and sort the country data
      const continentCountryMap = countries.reduce((map, country) => {
        const continent = country.region;
        const countryName = country.name.common;
        if (availableCountries.has(countryName)) {
          if (!map[continent]) {
            map[continent] = [];
          }
          map[continent].push(countryName);
        }
        return map;
      }, {});

      // Populate the region filter dropdown
      regionFilter.innerHTML = '<option value="">Region/Country</option>';
      Object.keys(continentCountryMap)
        .sort()
        .forEach((continent) => {
          const continentOption = new Option(continent, continent);
          continentOption.disabled = true;
          regionFilter.appendChild(continentOption);
          continentCountryMap[continent].sort().forEach((country) => {
            regionFilter.appendChild(new Option(country, country));
          });
        });
    } catch (error) {
      console.error("Error fetching the country data: ", error);
    }
  }

  // Function to filter partner items based on selected filter values
  function filterItems() {
    const selectedRegion = regionFilter.value;
    const selectedArea = areaFilter.value;
    const selectedState = stateFilter.querySelector(
      'input[name="state"]:checked'
    )?.value;

    partnerItems.forEach((item) => {
      // Ensure that dataset properties exist and are not undefined
      const regions = item.dataset.region
        ? item.dataset.region.split(",").map((r) => r.trim())
        : [];
      const areas = item.dataset.area
        ? item.dataset.area.split(",").map((a) => a.trim())
        : [];
      const states = item.dataset.state
        ? item.dataset.state.split(",").map((s) => s.trim())
        : [];

      const regionMatch = !selectedRegion || regions.includes(selectedRegion);
      const areaMatch = !selectedArea || areas.includes(selectedArea);
      const stateMatch = !selectedState || states.includes(selectedState);

      item.style.display = regionMatch && areaMatch && stateMatch ? "" : "none";
    });

    applyCustomStyles();
  }

  // Event listeners for filter changes
  regionFilter.addEventListener("change", filterItems);
  areaFilter.addEventListener("change", filterItems);
  stateFilter.addEventListener("change", filterItems);

  // Event listener for the reset button
  document.getElementById("resetFilters").addEventListener("click", () => {
    regionFilter.selectedIndex = 0;
    areaFilter.selectedIndex = 0;
    stateFilter
      .querySelectorAll('input[name="state"]')
      .forEach((radio) => (radio.checked = false));
    filterItems();
  });
  // Event listener for window resize
  window.addEventListener("resize", applyCustomStyles);

  // Add event listener for the reset button
  document
    .getElementById("resetFilters")
    .addEventListener("click", resetFilters);
  // Populate the filters on load
  populateFilters();
});
