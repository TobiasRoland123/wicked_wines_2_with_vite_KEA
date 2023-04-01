import "./style.css";

import { get, post } from "./modules/wines.js";
import { populateCountryDropDown, populateRegionDropDown } from "./modules/dropdown";

const form = document.querySelector("form");
const wineListContainer = document.querySelector(".wine_list");
const countryInput = document.querySelector('[name="wine_country"]');
const regionInput = document.querySelector('[name="wine_region"]');

window.addEventListener("DOMContentLoaded", start);

function start() {
  get(wineListContainer);
  populateCountryDropDown(countryInput, "Choose a country");

  countryInput.addEventListener("change", (e) => {
    populateRegionDropDown(regionInput, "Choose a region", e.target.value);
  });

  document.querySelector('[data-action="submit"]').addEventListener("click", post);
}

function addAllCountries() {
  allCountries.forEach((country) => {
    form.elements.country;
  });
}

// add submit eventListener
form.addEventListener("submit", (e) => {
  // prevent the default submit action
  e.preventDefault();

  // get properties from form for newWine
  const payLoad = {
    name: form.elements.wine_name.value,
    grapes: form.elements.wine_grapes.value.split("\n"),
    year: form.elements.wine_year.value,
    type: form.elements.wine_type.value,
    origin: {
      country: form.elements.wine_country.value,
      region: form.elements.wine_region.value,
    },
    isGood: form.elements.is_good.checked,
  };

  console.log(payLoad);
  post(payLoad);
});
