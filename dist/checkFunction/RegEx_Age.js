"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAgeForm = void 0;
function checkAgeForm(age) {
    let form = /^(199[0-9]|19[5-9][0-9]|200[0-9]|20[1-2][0-9])$/;
    return form.test(age);
}
exports.checkAgeForm = checkAgeForm;
