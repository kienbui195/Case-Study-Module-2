"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNumberOfHouse = void 0;
function checkNumberOfHouse(number) {
    let form = /^[0-9A-Za-z]{1,4}$/;
    if (form.test(number) === true)
        return true;
    else
        return false;
}
exports.checkNumberOfHouse = checkNumberOfHouse;
