document.addEventListener("DOMContentLoaded", function () {
  // Get filter elements
  const regionFilter = document.getElementById("regionFilter");
  const areaFilter = document.getElementById("areaFilter");
  const stateFilter = document.getElementById("stateFilter");

  // Get all partner items
  const partnerItems = document.querySelectorAll(".partner--item");

  // Populate filter dropdowns with unique values from partner items
  async function populateFilters() {
    // Call an API to get countries and their continents
    const apiUrl = "https://restcountries.com/v3.1/all"; // Example API endpoint

    // Create a set of all unique country names available in .partner--region elements
    const availableCountries = new Set();
    partnerItems.forEach((item) => {
      item.querySelectorAll(".partner--region").forEach((regionElement) => {
        regionElement.textContent
          .trim()
          .split(",")
          .map((r) => r.trim())
          .forEach((country) => availableCountries.add(country));
      });
    });

    try {
      const response = await fetch(apiUrl);
      const countries = await response.json();

      // Clear any existing options
      regionFilter.innerHTML = '<option value="">Region/Country</option>';

      // Filter the API results to only include countries that are present in the availableCountries set
      const continentCountryMap = countries.reduce((map, country) => {
        const continent = country.region;
        const countryName = country.name.common;
        // Only add the country if it is present in the availableCountries set
        if (continent && availableCountries.has(countryName)) {
          if (!map[continent]) {
            map[continent] = [];
          }
          map[continent].push(countryName);
        }
        return map;
      }, {});

      // Now, create the optgroups and options with the filtered country list
      const continents = Object.keys(continentCountryMap);
      continents.forEach((continent) => {
        // Add continent as a selectable option
        const continentOption = new Option(continent, continent);
        continentOption.disabled = true; // Disable it so it doesn't interfere with country selection
        continentOption.classList.add("continent-option");
        regionFilter.appendChild(continentOption);

        // Add countries within this continent as options
        continentCountryMap[continent].forEach((country) => {
          const option = new Option(country, country);
          regionFilter.appendChild(option);
        });
      });
    } catch (error) {
      console.error("There was an error fetching the country data:", error);
    }
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

  // Filter partner items by continent
  function filterItemsByContinent(continent) {
    partnerItems.forEach((item) => {
      const isItemInContinent = Array.from(
        item.querySelectorAll(".partner--region")
      ).some((regionElement) =>
        regionElement.textContent.trim().includes(continent)
      );

      item.style.display = isItemInContinent ? "" : "none";
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

  // Event listener for filter changes
  regionFilter.addEventListener("change", (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];

    if (selectedOption.classList.contains("continent-option")) {
      // Code to filter items by the selected continent
      filterItemsByContinent(selectedOption.text);
    } else {
      // Otherwise, filter by country as before
      filterItems();
    }
  });

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
