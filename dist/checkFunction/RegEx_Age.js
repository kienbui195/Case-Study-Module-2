"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAgeForm = void 0;
function checkAgeForm(age) {
    let form = /^(199\d|19[5-9]\d|200\d|20[1-2]\d)$/;
    return form.test(age);
}
exports.checkAgeForm = checkAgeForm;
