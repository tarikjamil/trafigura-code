// Function to set up partner continents from region data
function setPartnerContinents() {
  document.querySelectorAll(".partner--item").forEach((item) => {
    const regions = item
      .querySelector(".partner--region")
      .textContent.split(", ")
      .map((r) => r.trim());
    const continents = regions
      .map((region) => countryToContinent[region])
      .filter(Boolean);
    item.querySelector(".partner--continent").textContent = [
      ...new Set(continents),
    ].join(", ");
  });
}

// Populate the region filter dynamically
function populateRegionFilter() {
  const continentCountries = {};
  document.querySelectorAll(".partner--item").forEach((item) => {
    const regions = item
      .querySelector(".partner--region")
      .textContent.split(", ")
      .map((r) => r.trim());
    regions.forEach((region) => {
      const continent = countryToContinent[region];
      if (continent) {
        if (!continentCountries[continent]) {
          continentCountries[continent] = new Set();
        }
        continentCountries[continent].add(region);
      }
    });
  });

  const filterContainer = document.getElementById("regionFilter");
  Object.keys(continentCountries)
    .sort()
    .forEach((continent) => {
      filterContainer.appendChild(
        createRadioButton("regionFilter", continent, continent, true)
      );
      [...continentCountries[continent]].sort().forEach((country) => {
        filterContainer.appendChild(
          createRadioButton("regionFilter", country, country)
        );
      });
    });
}

// Populate filters, manually control whether to auto-populate
function populateFilter(selector, attribute, autoPopulate = true) {
  const filterContainer = document.getElementById(selector);
  if (!autoPopulate) {
    return; // Skip auto-populating for manual addition
  }

  const items = document.querySelectorAll(".partner--item");
  const uniqueValues = new Set();
  items.forEach((item) => {
    const values = item.querySelector(attribute)?.textContent.split(",") || [];
    values.forEach((value) => uniqueValues.add(value.trim()));
  });
  [...uniqueValues].sort().forEach((value) => {
    filterContainer.appendChild(createRadioButton(selector, value, value));
  });
}

// Helper function to create radio buttons
function createRadioButton(name, value, labelText, isContinent = false) {
  const wrapper = document.createElement("div");
  const input = document.createElement("input");
  input.type = "radio";
  input.id = `${name}-${value}`;
  input.name = name;
  input.value = value;
  if (isContinent) {
    input.setAttribute("data-is-continent", "true");
  }
  const label = document.createElement("label");
  label.htmlFor = `${name}-${value}`;
  label.textContent = labelText;
  wrapper.appendChild(input);
  wrapper.appendChild(label);
  return wrapper;
}

// Setup and listener for resetting filters
document.getElementById("resetFilters").addEventListener("click", resetFilters);

// Setup filter listeners
document.getElementById("regionFilter").addEventListener("change", filterItems);
document.getElementById("areaFilter").addEventListener("change", filterItems);
document.getElementById("stateFilter").addEventListener("change", filterItems);

function filterItems() {
  const selectedRegion = document.querySelector(
    'input[name="regionFilter"]:checked'
  )?.value;
  const selectedArea = document.querySelector(
    'input[name="areaFilter"]:checked'
  )?.value;
  const selectedState = document.querySelector(
    'input[name="stateFilter"]:checked'
  )?.value;

  document.querySelectorAll(".partner--item").forEach((item) => {
    const regionOrContinentMatch =
      !selectedRegion ||
      item
        .querySelector(".partner--region")
        .textContent.includes(selectedRegion) ||
      item
        .querySelector(".partner--continent")
        .textContent.includes(selectedRegion);
    const areaMatch =
      !selectedArea ||
      item.querySelector(".partner--area").textContent.includes(selectedArea);
    const stateMatch =
      !selectedState ||
      item.querySelector(".partner--state").textContent.includes(selectedState);
    item.style.display =
      regionOrContinentMatch && areaMatch && stateMatch ? "" : "none";
  });
}

// Manual entries for area and state filters can be added using the function below
// Example: addManualFilterOption("areaFilter", "North");

function addManualFilterOption(filterId, value) {
  const filterContainer = document.getElementById(filterId);
  filterContainer.appendChild(createRadioButton(filterId, value, value));
}

// Initialize filters
populateRegionFilter();
populateFilter("areaFilter", ".partner--area", false); // No auto-population
populateFilter("stateFilter", ".partner--state", false); // No auto-population
