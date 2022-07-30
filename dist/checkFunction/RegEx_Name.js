"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNameForm = void 0;
function checkNameForm(name) {
    let form = /^[A-za-z -]+$/;
    return form.test(name);
}
exports.checkNameForm = checkNameForm;
