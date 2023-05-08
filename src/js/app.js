import { createElement } from "./modules/functions.js";

const app = document.getElementById("app");

const Phone = function (modelPhone) {
  this.model = modelPhone;

  let isCharging = false;

  let currentBattery = 20;

  let maxBattery = 100;

  this.getCurrentBattery = function () {
    return currentBattery;
  };

  this.setCurrentBattery = function (value) {
    if (+value || (value === 0 && value <= maxBattery)) {
      currentBattery = value;
    }
  };

  // TODO 24.01: винести в приватну змінну інтервал і стопати його на stopCharge

  let charging;

  const bar = document.querySelector(".charge-bar");
  const button = document.querySelector(".toggle-charge");
  const span = document.querySelector("span");
  span.innerText = `${currentBattery}%`;

  this.charge = function () {
    if (currentBattery === 100) return;
    if (!isCharging) {
      isCharging = true;
      charging = setInterval(() => {
        currentBattery++;
        bar.style.height = `${currentBattery}%`;
        span.innerText = `${currentBattery}%`;
        if (currentBattery === maxBattery || !isCharging) {
          span.innerText = `Charged`;
          clearInterval(charging);
          isCharging = false;
        }
      }, 100);
    } else if (isCharging) {
      this.stopCharge();
    }
  };

  this.stopCharge = function () {
    clearInterval(charging);
    isCharging = false;
  };

  this.phoneCharge = function () {
    bar.style.height = `${currentBattery}%`;
    button.addEventListener("click", (e) => {
      e.preventDefault();
      this.charge();
    });
  };
};

const nokia = new Phone("Nokia");

nokia.phoneCharge();

// TODO 24.01: зробити щось типу батареї і вона наповнена на стільки відсотків скільки в нас заряду
// TODO 24.01: зробити цю батарею(або текст) динамічною
// TODO 24.01: зробити час динамічним
// TODO 24.01 optional: зробити циферблат
