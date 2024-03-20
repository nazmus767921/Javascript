// Variables
let outputArea = document.getElementById("change-due");
let cash = document.getElementById("cash");
let purchaseBtn = document.getElementById("purchase-btn");

let price = 19.5;
let cid = [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 1],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];
let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
let initialChangeDue;
let changeDue;

let availableCID;

const statusMessages = {
  insufficient: "Status: INSUFFICIENT_FUNDS",
  closed: "Status: CLOSED",
  open: "Status: OPEN",
};
const messages = {
  insufficient: "Customer does not have enough money to purchase the item",
  noDue: "No change due - customer paid with exact cash",
};
let result = { status: "", changeReturn: [] };

const setStatus = (initialChangeDue, availableCID) => {
  if (
    Number(availableCID) < Number(initialChangeDue) ||
    result.changeReturn.length === 0
  ) {
    result.status = statusMessages.insufficient;
    return;
  }
  if (Number(availableCID) === Number(initialChangeDue)) {
    result.status = statusMessages.closed;
    return;
  }
  if (
    Number(availableCID) > Number(initialChangeDue) &&
    result.changeReturn.length !== 0
  ) {
    result.status = statusMessages.open;
    return;
  }
};

const calculate = (cid, denominations) => {
  let reversedCid = [...cid].reverse();

  for (let index = 0; index < reversedCid.length; index++) {
    if (changeDue > denominations[index] && changeDue > 0) {
      let count = 0;
      let total = reversedCid[index][1];

      while (total > 0 && changeDue >= denominations[index]) {
        total -= denominations[index];
        changeDue = parseFloat((changeDue -= denominations[index]).toFixed(2));
        count++;
      }
      if (count > 0) {
        result.changeReturn.push([
          reversedCid[index][0],
          count * denominations[index],
        ]);
      }
    }
  }
  if (changeDue > 0) {
    return (
      (result.status = statusMessages.insufficient), (result.changeReturn = [])
    );
  }
  setStatus(initialChangeDue, availableCID);
};

const checkCashRegister = (cashValue, price, cid) => {
  result.changeReturn = [];
  initialChangeDue = cashValue - price;
  changeDue = cashValue - price;
  availableCID = parseFloat(
    cid
      .map((total) => total[1])
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
  );
  debugger;
  // || Check Cash Provided
  if (cashValue < price) {
    result = { status: messages.insufficient, changeReturn: [] };
    alert(result.status);
    return;
  }
  // || Check Change Availability
  if (!(availableCID >= changeDue)) {
    result = { status: statusMessages.insufficient, changeReturn: [] };
    return;
  }
  // || Check Exact Change
  if (changeDue === 0) {
    result = { status: messages.noDue, changeReturn: [] };
    return;
  }
  // || Calculate Change
  calculate(cid, denominations);
};

const formatResult = () => {
  let status;
  let changeReturn = "";
  if (result.status) {
    status = `${result.status}`;
  }
  if (result.changeReturn && result.changeReturn.length !== 0) {
    result.changeReturn.forEach((item) => {
      const [currency, value] = item;
      changeReturn += `${currency}: $${value} `.toString();
    });
  }

  return {
    status: status?.trim(),
    changeReturn: changeReturn?.trim() || [],
  };
};

const displayResults = (cashValue, price) => {
  outputArea.innerHTML = "";

  if (cashValue < price) {
    return;
  }

  outputArea.innerHTML = `<p>${formatResult().status}${
    formatResult().changeReturn ? " " : ""
  }${formatResult().changeReturn}</p>`;

  return `<p>${formatResult().status}${formatResult().changeReturn ? " " : ""}${
    formatResult().changeReturn
  }</p>`;
};

purchaseBtn.onclick = () => {
  checkCashRegister(cash.value, price, cid);
  displayResults(cash.value, price);
};
