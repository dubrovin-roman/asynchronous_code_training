"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
/*
function createCardCountry(nameCountry) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${nameCountry}`);
  request.send();

  request.onload = function () {
    const [data] = JSON.parse(request.responseText);
    const languages = (lang) => {
      const temp = [];
      for (let key in lang) {
        temp.push(lang[key]);
      }
      return temp.join(" ");
    };

    const currencies = (curr) => {
      const temp = [];
      for (let key in curr) {
        temp.push(`${curr[key].name}`);
      }
      return temp.join("; ");
    };

    const html = `<article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${data.population}</p>
      <p class="country__row"><span>🗣️</span>${languages(data.languages)}</p>
      <p class="country__row"><span>💰</span>${currencies(data.currencies)}</p>
    </div>
  </article>`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  };
}

createCardCountry("deutschland");
createCardCountry("russia");
createCardCountry("usa");
createCardCountry("portugal");
*/

function renderCard(data, className = "") {
  const languages = (lang) => {
    const temp = [];
    for (let key in lang) {
      temp.push(lang[key]);
    }
    return temp.join(" ");
  };

  const currencies = (curr) => {
    const temp = [];
    for (let key in curr) {
      temp.push(`${curr[key].name}`);
    }
    return temp.join("; ");
  };

  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${data.population}</p>
    <p class="country__row"><span>🗣️</span>${languages(data.languages)}</p>
    <p class="country__row"><span>💰</span>${currencies(data.currencies)}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
}

function createCardCountry(nameCountry) {
  fetch(`https://restcountries.com/v3.1/name/${nameCountry}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Страна не найдена [${response.status}]`);
      return response.json();
    })
    .then((dataFromRes) => {
      const [data] = dataFromRes;
      renderCard(data);
      if (data.borders && data.borders.length > 0) createCardNeighbours(data);
    })
    .catch((err) => {
      countriesContainer.insertAdjacentText(
        "beforeend",
        `Ошибка: ${err.message}. Попробуйте еще раз!`
      );
      countriesContainer.style.opacity = 1;
    });
}

function createCardNeighbours(data) {
  data.borders.forEach((code) => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Страна не найдена [${response.status}]`);
        return response.json();
      })
      .then((dataFromRes) => {
        const [data] = dataFromRes;
        renderCard(data, "neighbour");
      })
      .catch((err) => {
        countriesContainer.insertAdjacentText(
          "beforeend",
          `Ошибка: ${err.message}. Попробуйте еще раз!`
        );
        countriesContainer.style.opacity = 1;
      });
  });
}

btn.addEventListener("click", () => createCardCountry("usa"));
//createCardCountry("russia");
//createCardCountry("usa");
//createCardCountry("deutschland");
//createCardCountry("ukraine");
