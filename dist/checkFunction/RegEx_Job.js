"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJobForm = void 0;
function checkJobForm(job) {
    let form = /^[A-z a-z]+$$/;
    return form.test(job);
}
exports.checkJobForm = checkJobForm;
