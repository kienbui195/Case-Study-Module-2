"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkYesOrNoForm = void 0;
function checkYesOrNoForm(anwser) {
    let form = /^(Y|N)?$/;
    return form.test(anwser);
}
exports.checkYesOrNoForm = checkYesOrNoForm;
