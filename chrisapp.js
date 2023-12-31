"use strict";
console.log("salmon cookies");

const container = document.getElementById("container");

const addStoreForm = document.getElementById("addStoreForm");

const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];

const stores = [];

console.log(hours.length);

function Store(storeName, minCustPerHour, maxCustPerHour, avgCookiesPerHour) {
  this.name = storeName;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerHour = avgCookiesPerHour;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookies = 0;
  // this.imageUrl = "images/" + imgFileName;
  this.render();
}

Store.prototype.calcCustomersEachHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.customersEachHour.push(
      randomNum(this.minCustPerHour, this.maxCustPerHour)
    );
  }
};

Store.prototype.calcCookiesEachHour = function () {
  for (let i = 0; i < hours.length; i++) {
    const oneHour = Math.ceil(
      this.customersEachHour[i] * this.avgCookiesPerHour
    );
    this.cookiesEachHour.push(oneHour);
    this.totalDailyCookies += oneHour;
  }
};

const article = document.createElement("article");
container.appendChild(article);

const table = document.createElement("table");
article.appendChild(table);

const headerRow = document.createElement("tr");
table.appendChild(headerRow);

const zeroPoint = document.createElement("th");
headerRow.appendChild(zeroPoint);

for (let i = 0; i < hours.length; i++) {
  const tableHeaderCellsText = document.createElement("th");
  tableHeaderCellsText.textContent = hours[i];
  headerRow.appendChild(tableHeaderCellsText);
}

Store.prototype.render = function () {
  this.calcCustomersEachHour();
  this.calcCookiesEachHour();

  const tableRow = document.createElement("tr");
  const nameCellTh = document.createElement("th");
  nameCellTh.textContent = this.name;
  tableRow.appendChild(nameCellTh);
  table.appendChild(tableRow);

  for (let i = 0; i < this.cookiesEachHour.length; i++) {
    const cookieData = document.createElement("td");
    cookieData.textContent = this.cookiesEachHour[i];
    tableRow.appendChild(cookieData);
  }

  stores.push(this);
};

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateTotal() {
  const tableRow = document.createElement("tr");
  const totalCell = document.createElement("th");
  totalCell.textContent = "Hourly Totals";
  tableRow.appendChild(totalCell);
  for (let i = 0; i < hours.length; i++) {
    let hourTotal = 0;
    for (let j = 0; j < stores.length; j++) {
      hourTotal = hourTotal + stores[j].cookiesEachHour[i];
      // console.log(stores[j].name, hours[i]);
    }
    const totalNumber = document.createElement("td");

    totalNumber.textContent = hourTotal;
    tableRow.appendChild(totalNumber);
  }
  table.appendChild(tableRow);
}

const seattle = new Store("Seattle", 23, 65, 6.3);
const tokyo = new Store("Tokyo", 3, 24, 1.2);
const dubia = new Store("Dubia", 11, 38, 3.7);
const paris = new Store("Paris", 20, 38, 2.3);
const lima = new Store("Lima", 2, 16, 4.6);

updateTotal();

addStoreForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // console.log(event);
  // remove total row from dom
  const name = event.target.storeName.value;
  const minCustomers = event.target.minCustomers.value;
  const maxCustomers = event.target.maxCustomers.value;
  const avgCookiesPerCustomer = event.target.avgCookiesPerCustomer.value;

  table.deleteRow(lastIndexOf(table));

  const newStore = new Store(
    name,
    minCustomers,
    maxCustomers,
    avgCookiesPerCustomer
  );

  addStoreForm.reset();
  updateTotal();
});
