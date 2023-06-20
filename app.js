"use strict";

const container = document.getElementById("container");

const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "13pm",
  "14pm",
  "15pm",
  "16pm",
  "17pm",
  "18pm",
  "19pm",
];

console.log(hours.length);

const seattleShop = {
  storeName: "Seattle",
  minHourlyCust: 23,
  maxHourlyCust: 65,
  aveCookiePerCust: 6.3,
  custPerHour: [],
  cookiesPerHour: [],
  totalCookiesPerDay: 0,

  calcCustomersPerHour: function () {
    for (let i = 0; i < hours.length; i++) {
      this.custPerHour.push(randomNum(this.minHourlyCust, this.maxHourlyCust));
    }
  },

  calcCookiesPerHour: function () {
    for (let i = 0; i < hours.length; i++) {
      const oneHour = Math.ceil(this.custPerHour[i] * this.aveCookiePerCust);
      this.cookiesPerHour.push(oneHour);
      this.totalCookiesPerDay += oneHour;
    }
  },

  render: function () {
    this.calcCustomersPerHour();
    this.calcCookiesPerHour();

    const containerElement = document.getElementById("container");

    const article = document.createElement("article");
    container.appendChild(article);

    const h3 = document.createElement("h3");
    h3.textContent = this.storeName;
    article.appendChild(h3);

    const ul = document.createElement("ul");
    article.appendChild(ul);

    for (let i = 0; i < hours.length; i++) {
      const li = document.createElement("li");
      li.textContent = `${hours[i]}: ${this.cookiesPerHour[i]} cookies`;
      ul.appendChild(li);
    }
  },
};

seattleShop.render();

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
