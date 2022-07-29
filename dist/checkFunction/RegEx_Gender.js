"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGenderForm = void 0;
function checkGenderForm(gender) {
    let form = /^(Male|Female)?$/;
    return form.test(gender);
}
exports.checkGenderForm = checkGenderForm;
