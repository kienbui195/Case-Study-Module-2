"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNumberOfMemberForm = void 0;
function checkNumberOfMemberForm(age) {
    let form = /^(?:[1-9]|1\d|20)$/;
    return form.test(age);
}
exports.checkNumberOfMemberForm = checkNumberOfMemberForm;
