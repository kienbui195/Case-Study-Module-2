"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGenderForm = void 0;
function checkGenderForm(gender) {
    let form = /^(Male|Female)?$/;
    if (form.test(gender) === true)
        return true;
    else
        return false;
}
exports.checkGenderForm = checkGenderForm;
