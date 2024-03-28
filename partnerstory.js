document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const regionFilter = document.getElementById("regionFilter");
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

  // Populate filters
  async function populateFilters() {
    const apiUrl = "https://restcountries.com/v3.1/all";
    try {
      const response = await fetch(apiUrl);
      const countries = await response.json();
      let availableCountries = new Set();

      partnerItems.forEach((item) => {
        item.dataset.region.split(",").forEach((region) => {
          availableCountries.add(region.trim());
        });
      });

      const continentCountryMap = countries.reduce((map, country) => {
        const continent = country.region;
        const countryName = country.name.common;
        if (availableCountries.has(countryName)) {
          if (!map[continent]) map[continent] = [];
          map[continent].push(countryName);
        }
        return map;
      }, {});

      regionFilter.innerHTML = ""; // Clear current options
      regionFilter.add(new Option("Region/Country", "", true));

      Object.keys(continentCountryMap)
        .sort()
        .forEach((continent) => {
          const continentOption = new Option(continent, continent);
          continentOption.disabled = true;
          continentOption.classList.add("continent-option");
          regionFilter.add(continentOption);

          continentCountryMap[continent].sort().forEach((country) => {
            const countryOption = new Option(country, country);
            countryOption.dataset.continent = continent;
            regionFilter.add(countryOption);
          });
        });
    } catch (error) {
      console.error("There was an error fetching the country data:", error);
    }
  }

  // Event Listeners
  regionFilter.addEventListener("change", (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    if (!selectedOption.disabled) {
      filterItems(selectedOption.value);
    } else {
      // If a continent is selected, deselect it and reset
      regionFilter.selectedIndex = 0;
    }
  });

  // Initialize
  populateFilters();
  window.addEventListener("resize", applyCustomStyles);
});
