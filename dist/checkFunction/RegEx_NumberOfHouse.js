"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNumberOfHouse = void 0;
function checkNumberOfHouse(number) {
    let form = /(?:\d+|\d+[A-Za-z]{1,3})$/;
    return form.test(number);
}
exports.checkNumberOfHouse = checkNumberOfHouse;
