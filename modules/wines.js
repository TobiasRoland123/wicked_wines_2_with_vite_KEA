import { API_KEY, ENDPOINT } from "./config.js";

export function get(el) {
  fetch(ENDPOINT, {
    method: "get",
    headers: {
      apikey: API_KEY,
    },
  })
    .then((e) => e.json())
    .then((data) => {
      const t = document.querySelector("template").content;
      el.innerHTML = "";
      data.forEach((wine) => {
        const copy = t.cloneNode(true);
        copy.querySelector("h2").textContent = wine.name;
        copy.querySelector("button.delete").addEventListener("click", () => {
          deleteWine(wine.id);
        });
        copy.querySelector("button.update").addEventListener("click", () => {
          patch(wine.id);
        });
        copy.querySelector("article").style = `--bg: ${wine.type}`;
        copy.querySelector(".wine_origin").textContent = `${wine.origin.country} - ${wine.origin.region}`;
        wine.grapes.forEach((grape) => {
          const el = document.createElement("li");
          el.textContent = grape;
          copy.querySelector("ul").appendChild(el);
        });
        el.appendChild(copy);
      });
    });
}

export function post(newWine) {
  fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: API_KEY,
    },
    body: JSON.stringify(newWine),
  })
    .then((e) => e.json())
    .then((e) => get(document.querySelector(".wine_list")));
}

// function setNewWine(Wine) {
//   const newWine = Object.create(Wine);
//   setWineName(newWine);
//   setWineYear(newWine);
//   setWineType(newWine);
//   setWineIsGood(newWine);
//   setWineGrapes(newWine);
//   setWineOrigin(newWine);

//   return newWine;
// }

// function setWineName(newWine) {
//   newWine.name = getWineName();

//   return newWine;
// }
// function getWineName() {
//   return document.querySelector("#wine_name").value;
// }

// function setWineYear(newWine) {
//   newWine.year = getWineYear();
// }
// function getWineYear() {
//   return document.querySelector("#wine_year").value;
// }

// function setWineType(newWine) {
//   newWine.type = getWineType();

//   return newWine;
// }

// function getWineType() {
//   const options = document.querySelectorAll('[name="wine_type"]');

//   for (const option of options) {
//     if (option.checked) {
//       return option.value;
//     }
//   }
// }

// function setWineIsGood(newWine) {
//   newWine.isGood = getWineIsGood();
// }

// function getWineIsGood() {
//   const options = document.querySelectorAll('[name="is_good"]');

//   for (const option of options) {
//     if (option.checked) {
//       return option.value;
//     }
//   }
// }

// function setWineGrapes(newWine) {
//   newWine.grapes = getWineGrapes();
// }

// function getWineGrapes() {
//   const grapeOptions = document.querySelectorAll('[name="wine_grapes"]');

//   const chosenGrapes = [];

//   grapeOptions.forEach((grape) => {
//     if (grape.checked) {
//       chosenGrapes.push(grape.value);
//     }
//   });

//   return chosenGrapes;
// }

// function setWineOrigin(newWine) {
//   newWine.origin = getWineOrigin();

//   return newWine;
// }

// function getWineOrigin() {
//   const origin = {
//     country: "",
//     region: "",
//   };

//   origin.country = document.querySelector("#country").value;
//   origin.region = document.querySelector("#region").value;

//   return origin;
// }

export function deleteWine(id) {
  console.log(id);
  fetch(ENDPOINT + "?id=eq." + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: API_KEY,
    },
  })
    .then((e) => e.json())
    .then(() => get(document.querySelector(".wine_list")));
}

export function patch(id) {
  const updates = {
    name: "Ullas Wine",
    isGood: true,
    type: "red",
  };

  fetch(ENDPOINT + "?id=eq." + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: API_KEY,
    },
    body: JSON.stringify(updates),
  })
    .then((e) => e.json())
    .then((e) => get(document.querySelector(".wine_list")));
}
