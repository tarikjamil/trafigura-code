document.addEventListener("DOMContentLoaded", function () {
  const regionFilter = document.getElementById("regionFilter");
  const areaFilter = document.getElementById("areaFilter");
  const stateFilter = document.getElementById("stateFilter");
  const partnerItems = document.querySelectorAll(".partner--item");

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

  function applyCustomStyles() {
    partnerItems.forEach((item) => {
      item.style.gridColumn = "";
      const partnerItemInner = item.querySelector(".partner-item");
      if (partnerItemInner) {
        partnerItemInner.style.display = "";
        partnerItemInner.style.gridTemplateColumns = "";
        partnerItemInner.style.alignItems = "";
        partnerItemInner.style.maxWidth = "";
      }
    });

    if (window.innerWidth >= 992) {
      const firstVisibleItem = Array.from(partnerItems).find(
        (item) => item.style.display !== "none" && item.style.display !== ""
      );
      if (firstVisibleItem) {
        firstVisibleItem.style.gridColumn = "span 3";
        const firstVisibleItemInner =
          firstVisibleItem.querySelector(".partner-item");
        if (firstVisibleItemInner) {
          firstVisibleItemInner.style.display = "grid";
          firstVisibleItemInner.style.gridTemplateColumns = "2fr 1fr";
          firstVisibleItemInner.style.alignItems = "end";
          firstVisibleItemInner.style.maxWidth = "auto !important";
        }
      }
    }
  }

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

    applyCustomStyles();
  }

  regionFilter.addEventListener("change", filterItems);
  areaFilter.addEventListener("change", filterItems);
  stateFilter.addEventListener("change", filterItems);

  window.addEventListener("resize", applyCustomStyles);

  populateFilters();
  applyCustomStyles(); // To ensure styles are applied initially
});
