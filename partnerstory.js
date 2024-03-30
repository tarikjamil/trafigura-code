document.addEventListener("DOMContentLoaded", function () {
  const countryToContinent = {
    // North America
    Canada: "North America",
    "United States": "North America",
    Mexico: "North America",

    // Central America
    Belize: "Central America",
    "Costa Rica": "Central America",
    "El Salvador": "Central America",
    Guatemala: "Central America",
    Honduras: "Central America",
    Nicaragua: "Central America",
    Panama: "Central America",

    // Caribbean
    "Antigua and Barbuda": "North America",
    Bahamas: "North America",
    Barbados: "North America",
    Cuba: "North America",
    Dominica: "North America",
    "Dominican Republic": "North America",
    Grenada: "North America",
    Haiti: "North America",
    Jamaica: "North America",
    "Saint Kitts and Nevis": "North America",
    "Saint Lucia": "North America",
    "Saint Vincent and the Grenadines": "North America",
    "Trinidad and Tobago": "North America",

    // South America
    Argentina: "South America",
    Bolivia: "South America",
    Brazil: "South America",
    Chile: "South America",
    Colombia: "South America",
    Ecuador: "South America",
    Guyana: "South America",
    Paraguay: "South America",
    Peru: "South America",
    Suriname: "South America",
    Uruguay: "South America",
    Venezuela: "South America",

    // Europe
    Albania: "Europe",
    Andorra: "Europe",
    Austria: "Europe",
    Belarus: "Europe",
    Belgium: "Europe",
    "Bosnia and Herzegovina": "Europe",
    Bulgaria: "Europe",
    Croatia: "Europe",
    "Czech Republic": "Europe",
    Denmark: "Europe",
    Estonia: "Europe",
    Finland: "Europe",
    France: "Europe",
    Germany: "Europe",
    Greece: "Europe",
    Hungary: "Europe",
    Iceland: "Europe",
    Ireland: "Europe",
    Italy: "Europe",
    Kosovo: "Europe",
    Latvia: "Europe",
    Liechtenstein: "Europe",
    Lithuania: "Europe",
    Luxembourg: "Europe",
    Malta: "Europe",
    Moldova: "Europe",
    Monaco: "Europe",
    Montenegro: "Europe",
    Netherlands: "Europe",
    "North Macedonia": "Europe",
    Norway: "Europe",
    Poland: "Europe",
    Portugal: "Europe",
    Romania: "Europe",
    "San Marino": "Europe",
    Serbia: "Europe",
    Slovakia: "Europe",
    Slovenia: "Europe",
    Spain: "Europe",
    Sweden: "Europe",
    Switzerland: "Europe",
    Ukraine: "Europe",
    "United Kingdom": "Europe",
    "Vatican City": "Europe",
    Cyprus: "Europe",
    Georgia: "Europe",

    // Asia
    Kazakhstan: "Asia",
    Russia: "Europe",
    Turkey: "Asia",
    Afghanistan: "Asia",
    Armenia: "Asia",
    Azerbaijan: "Asia",
    Bahrain: "Asia",
    Bangladesh: "Asia",
    Bhutan: "Asia",
    Brunei: "Asia",
    Cambodia: "Asia",
    China: "Asia",
    India: "Asia",
    Indonesia: "Asia",
    Iran: "Middle East",
    Iraq: "Middle East",
    Israel: "Middle East",
    Japan: "Asia",
    Jordan: "Middle East",
    Kuwait: "Middle East",
    Kyrgyzstan: "Asia",
    Laos: "Asia",
    Lebanon: "Middle East",
    Malaysia: "Asia",
    Maldives: "Asia",
    Mongolia: "Asia",
    Myanmar: "Asia",
    Nepal: "Asia",
    "North Korea": "Asia",
    Oman: "Middle East",
    Pakistan: "Asia",
    Palestine: "Middle East",
    Philippines: "Asia",
    Qatar: "Middle East",
    "Saudi Arabia": "Middle East",
    Singapore: "Asia",
    "South Korea": "Asia",
    "Sri Lanka": "Asia",
    Syria: "Middle East",
    Taiwan: "Asia",
    Tajikistan: "Asia",
    Thailand: "Asia",
    "Timor-Leste": "Asia",
    Turkmenistan: "Asia",
    "United Arab Emirates": "Middle East",
    Uzbekistan: "Asia",
    Vietnam: "Asia",
    Yemen: "Middle East",

    // Africa
    Algeria: "Africa",
    Angola: "Africa",
    Benin: "Africa",
    Botswana: "Africa",
    "Burkina Faso": "Africa",
    Burundi: "Africa",
    "Cabo Verde": "Africa",
    Cameroon: "Africa",
    "Central African Republic": "Africa",
    Chad: "Africa",
    Comoros: "Africa",
    Congo: "Africa",
    Djibouti: "Africa",
    Egypt: "Africa",
    "Equatorial Guinea": "Africa",
    Eritrea: "Africa",
    Eswatini: "Africa",
    Ethiopia: "Africa",
    Gabon: "Africa",
    Gambia: "Africa",
    Ghana: "Africa",
    Guinea: "Africa",
    "Guinea-Bissau": "Africa",
    "Ivory Coast": "Africa",
    Kenya: "Africa",
    Lesotho: "Africa",
    Liberia: "Africa",
    Libya: "Africa",
    Madagascar: "Africa",
    Malawi: "Africa",
    Mali: "Africa",
    Mauritania: "Africa",
    Mauritius: "Africa",
    Morocco: "Africa",
    Mozambique: "Africa",
    Namibia: "Africa",
    Niger: "Africa",
    Nigeria: "Africa",
    Rwanda: "Africa",
    "Sao Tome and Principe": "Africa",
    Senegal: "Africa",
    Seychelles: "Africa",
    "Sierra Leone": "Africa",
    Somalia: "Africa",
    "South Africa": "Africa",
    "South Sudan": "Africa",
    Sudan: "Africa",
    Tanzania: "Africa",
    Togo: "Africa",
    Tunisia: "Africa",
    Uganda: "Africa",
    Zambia: "Africa",
    Zimbabwe: "Africa",

    // Oceania
    Australia: "Oceania",
    Fiji: "Oceania",
    Kiribati: "Oceania",
    "Marshall Islands": "Oceania",
    Micronesia: "Oceania",
    Nauru: "Oceania",
    "New Zealand": "Oceania",
    Palau: "Oceania",
    "Papua New Guinea": "Oceania",
    Samoa: "Oceania",
    "Solomon Islands": "Oceania",
    Tonga: "Oceania",
    Tuvalu: "Oceania",
    Vanuatu: "Oceania",
    Guam: "Oceania",
    "New Caledonia": "Oceania",
    "French Polynesia": "Oceania",
    "American Samoa": "Oceania",
    "Northern Mariana Islands": "Oceania",
    "Cook Islands": "Oceania",
    Niue: "Oceania",
    Tokelau: "Oceania",
    "Pitcairn Islands": "Oceania",
    "Wallis and Futuna": "Oceania",
  };

  const continentCountries = organizeAndSortOptions(countryToContinent);

  populateFilterWithRadioButtons(
    "regionFilter",
    Object.keys(continentCountries),
    true
  );
  Object.keys(continentCountries).forEach((continent) => {
    populateFilterWithRadioButtons(
      "regionFilter",
      continentCountries[continent],
      false
    );
  });
  populateFilterWithRadioButtons(
    "areaFilter",
    ["Technology", "Healthcare", "Education"],
    true
  );
  populateFilterWithRadioButtons(
    "stateFilter",
    ["Active", "Inactive", "Pending"],
    true
  );

  function organizeAndSortOptions(map) {
    const organized = {};
    for (const [country, continent] of Object.entries(map)) {
      if (!organized[continent]) organized[continent] = [];
      organized[continent].push(country);
    }
    for (const continent of Object.keys(organized)) {
      organized[continent].sort();
    }
    return organized;
  }

  function populateFilterWithRadioButtons(filterId, items, prependAll) {
    const container = document.getElementById(filterId);
    if (prependAll) {
      container.appendChild(
        createRadioButton(`${filterId}-all`, filterId, "All", "All")
      );
    }
    items.forEach((item) => {
      container.appendChild(
        createRadioButton(`${filterId}-${item}`, filterId, item, item)
      );
    });
  }

  function createRadioButton(id, name, value, labelText) {
    const wrapper = document.createElement("div");
    wrapper.className = "radio-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.id = id;
    input.name = name;
    input.value = value;

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = labelText;

    wrapper.appendChild(input);
    wrapper.appendChild(label);

    return wrapper;
  }

  document
    .getElementById("resetFilters")
    .addEventListener("click", function () {
      document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        if (radio.value === "All") radio.checked = true;
      });
      filterItems();
    });

  document
    .getElementById("regionFilter")
    .addEventListener("change", filterItems);
  document.getElementById("areaFilter").addEventListener("change", filterItems);
  document
    .getElementById("stateFilter")
    .addEventListener("change", filterItems);

  function filterItems() {
    const region = document.querySelector(
      'input[name="regionFilter"]:checked'
    )?.value;
    const area = document.querySelector(
      'input[name="areaFilter"]:checked'
    )?.value;
    const state = document.querySelector(
      'input[name="stateFilter"]:checked'
    )?.value;

    document.querySelectorAll(".partner--item").forEach((item) => {
      const itemRegion = item.dataset.region; // Assuming data attributes for region, area, and state
      const itemArea = item.dataset.area;
      const itemState = item.dataset.state;

      const regionMatch = !region || region === "All" || itemRegion === region;
      const areaMatch = !area || area === "All" || itemArea === area;
      const stateMatch = !state || state === "All" || itemState === state;

      item.style.display = regionMatch && areaMatch && stateMatch ? "" : "none";
    });
  }
});
