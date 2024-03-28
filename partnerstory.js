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

    try {
      const response = await fetch(apiUrl);
      const countries = await response.json();

      // Assuming the API returns an array of countries with continent information
      const continentCountryMap = countries.reduce((map, country) => {
        const continent = country.region; // The API property that denotes the continent
        const countryName = country.name.common; // The API property for the country's common name

        if (continent) {
          if (!map[continent]) {
            map[continent] = [];
          }
          map[continent].push(countryName);
        }
        return map;
      }, {});

      // Now you have a map of continents to countries, you can create the optgroups and options as shown earlier
      const continents = Object.keys(continentCountryMap);
      continents.forEach((continent) => {
        const group = document.createElement("optgroup");
        group.label = continent;
        regionFilter.appendChild(group);

        continentCountryMap[continent].forEach((country) => {
          const option = new Option(country, country);
          group.appendChild(option);
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
