document.addEventListener('DOMContentLoaded', function() {
;const countryToContinent = {
  // North America
  Canada: 'North America',
  United States: 'North America',
  Mexico: 'North America',

  // Central America
  Belize: 'Central America',
  Costa Rica: 'Central America',
  El Salvador: 'Central America',
  Guatemala: 'Central America',
  Honduras: 'Central America',
  Nicaragua: 'Central America',
  Panama: 'Central America',

  // Caribbean
  Antigua and Barbuda: 'North America',
  Bahamas: 'North America',
  Barbados: 'North America',
  Cuba: 'North America',
  Dominica: 'North America',
  Dominican Republic: 'North America',
  Grenada: 'North America',
  Haiti: 'North America',
  Jamaica: 'North America',
  Saint Kitts and Nevis: 'North America',
  Saint Lucia: 'North America',
  Saint Vincent and the Grenadines: 'North America',
  Trinidad and Tobago: 'North America',

  // South America
  Argentina: 'South America',
  Bolivia: 'South America',
  Brazil: 'South America',
  Chile: 'South America',
  Colombia: 'South America',
  Ecuador: 'South America',
  Guyana: 'South America',
  Paraguay: 'South America',
  Peru: 'South America',
  Suriname: 'South America',
  Uruguay: 'South America',
  Venezuela: 'South America',

  // Europe
  Albania: 'Europe',
  Andorra: 'Europe',
  Austria: 'Europe',
  Belarus: 'Europe',
  Belgium: 'Europe',
  Bosnia and Herzegovina: 'Europe',
  Bulgaria: 'Europe',
  Croatia: 'Europe',
  Czech Republic: 'Europe',
  Denmark: 'Europe',
  Estonia: 'Europe',
  Finland: 'Europe',
  France: 'Europe',
  Germany: 'Europe',
  Greece: 'Europe',
  Hungary: 'Europe',
  Iceland: 'Europe',
  Ireland: 'Europe',
  Italy: 'Europe',
  Kosovo: 'Europe',
  Latvia: 'Europe',
  Liechtenstein: 'Europe',
  Lithuania: 'Europe',
  Luxembourg: 'Europe',
  Malta: 'Europe',
  Moldova: 'Europe',
  Monaco: 'Europe',
  Montenegro: 'Europe',
  Netherlands: 'Europe',
  North Macedonia: 'Europe',
  Norway: 'Europe',
  Poland: 'Europe',
  Portugal: 'Europe',
  Romania: 'Europe',
  San Marino: 'Europe',
  Serbia: 'Europe',
  Slovakia: 'Europe',
  Slovenia: 'Europe',
  Spain: 'Europe',
  Sweden: 'Europe',
  Switzerland: 'Europe',
  Ukraine: 'Europe',
  United Kingdom: 'Europe',
  Vatican City: 'Europe',

  // Adjusted to avoid duplication and place countries in their most associated region
  Cyprus: 'Europe', // Despite its geographical location, Cyprus is politically and culturally more aligned with Europe.
  Georgia: 'Europe', // Geopolitically considered part of Europe.
  Kazakhstan: 'Asia', // Predominantly in Central Asia.
  Russia: 'Europe', // European part is more populated and politically significant.
  Turkey: 'Asia', // Majority of its land mass is in Asia despite strong ties to Europe.

  // Asia
  Afghanistan: 'Asia',
  Armenia: 'Asia',
  Azerbaijan: 'Asia',
  Bahrain: 'Asia',
  Bangladesh: 'Asia',
  Bhutan: 'Asia',
  Brunei: 'Asia',
  Cambodia: 'Asia',
  China: 'Asia',
  India: 'Asia',
  Indonesia: 'Asia', // Primarily located in Asia, with some territories in Oceania.
  Iran: 'Middle East',
  Iraq: 'Middle East',
  Israel: 'Middle East',
  Japan: 'Asia',
  Jordan: 'Middle East',
  Kuwait: 'Middle East',
  Kyrgyzstan: 'Asia',
  Laos: 'Asia',
  Lebanon: 'Middle East',
  Malaysia: 'Asia',
  Maldives: 'Asia',
  Mongolia: 'Asia',
  Myanmar: 'Asia',
  Nepal: 'Asia',
  North Korea: 'Asia',
  Oman: 'Middle East',
  Pakistan: 'Asia',
  Palestine: 'Middle East',
  Philippines: 'Asia',
  Qatar: 'Middle East',
  Saudi Arabia: 'Middle East',
  Singapore: 'Asia',
  South Korea: 'Asia',
  Sri Lanka: 'Asia',
  Syria: 'Middle East',
  Taiwan: 'Asia',
  Tajikistan: 'Asia',
  Thailand: 'Asia',
  Timor-Leste: 'Asia',
  Turkmenistan: 'Asia',
  United Arab Emirates: 'Middle East',
  Uzbekistan: 'Asia',
  Vietnam: 'Asia',
  Yemen: 'Middle East',

  // Africa
  Algeria: 'Africa',
  Angola: 'Africa',
  Benin: 'Africa',
  Botswana: 'Africa',
  Burkina Faso: 'Africa',
  Burundi: 'Africa',
  Cabo Verde: 'Africa',
  Cameroon: 'Africa',
  Central African Republic: 'Africa',
  Chad: 'Africa',
  Comoros: 'Africa',
  Congo: 'Africa',
  Djibouti: 'Africa',
  Egypt: 'Africa',
  Equatorial Guinea: 'Africa',
  Eritrea: 'Africa',
  Eswatini: 'Africa',
  Ethiopia: 'Africa',
  Gabon: 'Africa',
  Gambia: 'Africa',
  Ghana: 'Africa',
  Guinea: 'Africa',
  Guinea-Bissau: 'Africa',
  Ivory Coast: 'Africa',
  Kenya: 'Africa',
  Lesotho: 'Africa',
  Liberia: 'Africa',
  Libya: 'Africa',
  Madagascar: 'Africa',
  Malawi: 'Africa',
  Mali: 'Africa',
  Mauritania: 'Africa',
  Mauritius: 'Africa',
  Morocco: 'Africa',
  Mozambique: 'Africa',
  Namibia: 'Africa',
  Niger: 'Africa',
  Nigeria: 'Africa',
  Rwanda: 'Africa',
  Sao Tome and Principe: 'Africa',
  Senegal: 'Africa',
  Seychelles: 'Africa',
  Sierra Leone: 'Africa',
  Somalia: 'Africa',
  South Africa: 'Africa',
  South Sudan: 'Africa',
  Sudan: 'Africa',
  Tanzania: 'Africa',
  Togo: 'Africa',
  Tunisia: 'Africa',
  Uganda: 'Africa',
  Zambia: 'Africa',
  Zimbabwe: 'Africa',

  // Oceania
  Australia: 'Oceania',
  Fiji: 'Oceania',
  Kiribati: 'Oceania',
  Marshall Islands: 'Oceania',
  Micronesia: 'Oceania',
  Nauru: 'Oceania',
  New Zealand: 'Oceania',
  Palau: 'Oceania',
  Papua New Guinea: 'Oceania',
  Samoa: 'Oceania',
  Solomon Islands: 'Oceania',
  Tonga: 'Oceania',
  Tuvalu: 'Oceania',
  Vanuatu: 'Oceania',
  // Territories with significant autonomy or unique status
  Guam: 'Oceania', // US territory
  New Caledonia: 'Oceania', // French territory
  French Polynesia: 'Oceania', // French territory
  American Samoa: 'Oceania', // US territory
  Northern Mariana Islands: 'Oceania', // US Commonwealth
  Cook Islands: 'Oceania', // In free association with New Zealand
  Niue: 'Oceania', // In free association with New Zealand
  Tokelau: 'Oceania', // Territory of New Zealand
  Pitcairn Islands: 'Oceania', // British Overseas Territory
  Wallis and Futuna: 'Oceania', // French territory
};



  // Function to map countries to continents
  const setPartnerContinents = () => {
    document.querySelectorAll('.partner--item').forEach(item => {
      const regionDiv = item.querySelector('.partner--region');
      const continentDiv = item.querySelector('.partner--continent');
      const regions = regionDiv.textContent.split(', ');
      const continents = regions.map(region => countryToContinent[region]).filter(Boolean);
      continentDiv.textContent = [...new Set(continents)].join(', ');
    });
  };

  // Populate regionFilter
  const populateRegionFilter = () => {
    const regionSelect = document.getElementById('regionFilter');
    const regions = new Set();
    const continents = new Set();

    document.querySelectorAll('.partner--item').forEach(item => {
      const regionDiv = item.querySelector('.partner--region').textContent.split(', ');
      regionDiv.forEach(region => {
        regions.add(region);
        continents.add(countryToContinent[region]);
      });
    });

    continents.forEach(continent => {
      if (continent) {
        const option = document.createElement('option');
        option.value = continent;
        option.textContent = continent;
        regionSelect.appendChild(option);
      }
    });

    regions.forEach(region => {
      const option = document.createElement('option');
      option.value = region;
      option.textContent = region;
      regionSelect.appendChild(option);
    });
  };

  // Function to populate area and state filters (simplified example)
  const populateOtherFilters = () => {
    // Implement similar logic for areaFilter and stateFilter based on your specific requirements
  };

  // Reset filters function
  const resetFilters = () => {
    document.getElementById('regionFilter').selectedIndex = 0;
    // Reset other filters similarly
  };

  document.getElementById('resetFilters').addEventListener('click', resetFilters);

  // Initial population of continents and filters
  setPartnerContinents();
  populateRegionFilter();
  populateOtherFilters();
});
