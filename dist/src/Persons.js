"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonManager = void 0;
class PersonManager {
    constructor() {
        this.listManager = [];
    }
    getInfoPerson() {
        return this.listManager;
    }
    setInfoPerson(data) {
        this.listManager.push(data);
    }
}
exports.PersonManager = PersonManager;
