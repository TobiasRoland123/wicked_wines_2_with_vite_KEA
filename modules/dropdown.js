import { allCountries } from "country-region-data";

// console.log(allCountries);

export function populateCountryDropDown(input, firstOption) {
  const fragment = document.createDocumentFragment();
  input.appendChild(addOption(firstOption));
  allCountries.forEach((arr) => {
    const option = document.createElement("option");
    option.textContent = arr[0];
    fragment.appendChild(option);
  });
  input.appendChild(fragment);
}

export function populateRegionDropDown(input, firstOption, value) {
  const regions = allCountries.find((country) => country[0] === value);
  const fragment = document.createDocumentFragment();
  input.innerHTML = "";
  input.appendChild(addOption(firstOption));
  if (regions) {
    regions[2].forEach((region) => {
      const option = document.createElement("option");
      option.textContent = region[0];
      fragment.appendChild(option);
    });
    input.appendChild(fragment);
  }
}

function addOption(text = "please choose a value") {
  const el = document.createElement("option");
  el.value = "";
  el.textContent = text;
  return el;
}
