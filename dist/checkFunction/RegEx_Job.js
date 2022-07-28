"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJobForm = void 0;
function checkJobForm(job) {
    let form = /^^[A-z a-z]+$$/;
    if (form.test(job) === true)
        return true;
    else
        return false;
}
exports.checkJobForm = checkJobForm;
