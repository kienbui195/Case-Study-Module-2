"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkYesOrNoForm = void 0;
function checkYesOrNoForm(answer) {
    let form = /^[Y|N]$/;
    return form.test(answer);
}
exports.checkYesOrNoForm = checkYesOrNoForm;
