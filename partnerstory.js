document.addEventListener("DOMContentLoaded", function () {
  const regionFilter = document.getElementById("regionFilter");
  const areaFilter = document.getElementById("areaFilter");
  const stateFilter = document.getElementById("stateFilter");
  const partnerItems = document.querySelectorAll(".partner--item");

  // Function to populate filters
  function populateFilters() {
    const regions = new Set();
    const areas = new Set();
    const states = new Set();

    partnerItems.forEach((item) => {
      const region = item.querySelector(".partner--region").textContent.trim();
      const area = item.querySelector(".partner--area").textContent.trim();
      const state = item.querySelector(".partner--state").textContent.trim();

      if (region) regions.add(region);
      if (area) areas.add(area);
      if (state) states.add(state);
    });

    regions.forEach((region) => regionFilter.add(new Option(region, region)));
    areas.forEach((area) => areaFilter.add(new Option(area, area)));
    states.forEach((state) => {
      const radioHtml = `<label><input type="radio" name="state" value="${state}"> ${state}</label>`;
      stateFilter.insertAdjacentHTML("beforeend", radioHtml);
    });
  }

  // Filter function
  function filterItems() {
    const selectedRegion = regionFilter.value;
    const selectedArea = areaFilter.value;
    const selectedState = document.querySelector(
      'input[name="state"]:checked'
    )?.value;

    partnerItems.forEach((item) => {
      const itemRegion = item
        .querySelector(".partner--region")
        .textContent.trim();
      const itemArea = item.querySelector(".partner--area").textContent.trim();
      const itemState = item
        .querySelector(".partner--state")
        .textContent.trim();

      const regionMatch = !selectedRegion || itemRegion === selectedRegion;
      const areaMatch = !selectedArea || itemArea === selectedArea;
      const stateMatch = !selectedState || itemState === selectedState;

      if (regionMatch && areaMatch && stateMatch) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Event listeners
  regionFilter.addEventListener("change", filterItems);
  areaFilter.addEventListener("change", filterItems);
  stateFilter.addEventListener("change", filterItems); // Listens to changes in the radio buttons container

  // Initialize
  populateFilters();
});
