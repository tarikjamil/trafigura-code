document.addEventListener("DOMContentLoaded", function () {
  // Get filter elements
  const regionFilter = document.getElementById("regionFilter");
  const areaFilter = document.getElementById("areaFilter");
  const stateFilter = document.getElementById("stateFilter");

  // Get all partner items
  const partnerItems = document.querySelectorAll(".partner--item");

  // Function to apply custom styles to the first visible partner item
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

  // Function to filter partner items based on selected filter values
  function filterItems() {
    const selectedRegion = regionFilter.value;
    const selectedArea = areaFilter.value;
    const selectedState = document.querySelector(
      'input[name="state"]:checked'
    )?.value;

    partnerItems.forEach((item) => {
      const regionMatch = !selectedRegion || item.dataset.region === selectedRegion;
      const areaMatch = !selectedArea || item.dataset.area === selectedArea;
      const stateMatch = !selectedState || item.dataset.state === selectedState;
      
      item.style.display = regionMatch && areaMatch && stateMatch ? "" : "none";
    });

    applyCustomStyles();
  }

  // Function to filter partner items by continent
  function filterItemsByContinent(continent) {
    partnerItems.forEach((item) => {
      const isItemInContinent = item.dataset.region.includes(continent);
      item.style.display = isItemInContinent ? "" : "none";
    });

    applyCustomStyles();
  }

  // Function to reset filters
  function resetFilters() {
    regionFilter.selectedIndex = 0;
    areaFilter.selectedIndex = 0;
    document.querySelectorAll('input[name="state"]').forEach((radio) => {
      radio.checked = false;
    });
    filterItems();
  }

  // Event listener for window resize
  window.addEventListener("resize", applyCustomStyles);

  // Event listener for the reset button
  document.getElementById("resetFilters").addEventListener("click", resetFilters);

  // Function to populate filter dropdowns with unique values from partner items
  async function populateFilters() {
    // Call an API to get countries and their continents
    const apiUrl = "https://restcountries.com/v3.1/all"; // Example API endpoint
    try {
      const response = await fetch(apiUrl);
      const countries = await response.json();

      // Create a set of all unique country names available in .partner--region elements
      const availableCountries = new Set();
      partnerItems.forEach((item) => {
        const regions = item.dataset.region.split(",").map((r) => r.trim());
        regions.forEach((region) => availableCountries.add(region));
      });

      // Filter the API results to only include countries that are present in the availableCountries set
      const continentCountryMap = countries.reduce((map, country) => {
        const continent = country.region;
        const countryName = country.name.common;
        if (continent && availableCountries.has(countryName)) {
          if (!map[continent]) {
            map[continent] = [];
          }
          map[continent].push(countryName);
        }
        return map;
      }, {});

      // Clear the dropdown
      regionFilter.innerHTML = '';

      // Add the 'Select Region/Country' default option
      regionFilter.add(new Option('Region/Country', ''));

      // Create the continent options and country options
      Object.keys(continentCountryMap).forEach((continent) => {
        // Add continent as a non-selectable option
        const continentOption = new Option(continent, continent);
        continentOption.disabled = true;
        regionFilter.add(continentOption);

        // Add countries within this continent as options
        continentCountryMap[continent].forEach((country) => {
          const countryOption = new Option(country, country);
          countryOption.classList.add("country-option");
          regionFilter.add(countryOption);
        });
      });
    } catch (error) {
      console.error("There was an error fetching the country data:", error);
    }
  }

  // Event listener for dropdown changes
  regionFilter.addEventListener("change", (event) => {
    const selected = regionFilter.options[regionFilter.selectedIndex];
    if (selected.classList.contains("country-option")) {
      // Filter by the selected country
      filterItems();
   
